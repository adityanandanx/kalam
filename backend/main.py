from base64 import b64encode
from pathlib import Path
from typing import Dict, List
import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, conint
from PIL import Image

from core import handwrite_generator
from tools import BasicTools

app = FastAPI(title="HandWrite Generator API")

# Initialize the generator
generator = handwrite_generator()


class RGBAColor(BaseModel):
    r: int = Field(ge=0, le=255)
    g: int = Field(ge=0, le=255)
    b: int = Field(ge=0, le=255)
    a: int = Field(ge=0, le=255)


class Margins(BaseModel):
    top: int = 10
    bottom: int = 10
    left: int = 10
    right: int = 10


class Perturbation(BaseModel):
    line_spacing: float = 1.0
    font_size: float = 1.0
    word_spacing: float = 1.0
    x_offset: float = 1.0
    y_offset: float = 1.0
    rotation: float = 0.05


class GenerateParams(BaseModel):
    rate: int = Field(ge=1, le=64, default=4)
    paper_x: int = 667
    paper_y: int = 945
    font_size: int = 30
    line_spacing: int = 70
    margins: Margins = Field(default_factory=Margins)
    word_spacing: int = 1
    perturbation: Perturbation = Field(default_factory=Perturbation)
    font: str | None = None
    background_color: RGBAColor = Field(
        default_factory=lambda: RGBAColor(r=0, g=0, b=0, a=0)
    )
    font_color: RGBAColor = Field(
        default_factory=lambda: RGBAColor(r=0, g=0, b=0, a=255)
    )


class GenerateRequest(BaseModel):
    text: str
    params: GenerateParams


class GenerateResponse(BaseModel):
    images: Dict[str, str]
    page_count: int


@app.get("/api/v1/fonts")
async def list_fonts() -> Dict[str, List[str]]:
    """List all available fonts in the ttf_library."""
    fonts, _ = BasicTools.get_ttf_file_path()
    return {"fonts": fonts}


@app.post("/api/v1/generate")
async def generate_text(request: GenerateRequest) -> GenerateResponse:
    """Generate handwritten text with the specified parameters."""
    # Ensure output directory exists
    os.makedirs("outputs", exist_ok=True)

    # Update generator parameters
    font_path = None
    if request.params.font:
        fonts, font_paths = BasicTools.get_ttf_file_path()
        try:
            font_index = fonts.index(request.params.font)
            font_path = font_paths[font_index]
        except ValueError:
            raise HTTPException(
                status_code=404, detail=f"Font '{request.params.font}' not found"
            )

    params = {
        "rate": request.params.rate,
        "default_paper_x": request.params.paper_x,
        "default_paper_y": request.params.paper_y,
        "default_font_size": request.params.font_size,
        "default_line_spacing": request.params.line_spacing,
        "default_top_margin": request.params.margins.top,
        "default_bottom_margin": request.params.margins.bottom,
        "default_left_margin": request.params.margins.left,
        "default_right_margin": request.params.margins.right,
        "default_word_spacing": request.params.word_spacing,
        "default_line_spacing_sigma": request.params.perturbation.line_spacing,
        "default_font_size_sigma": request.params.perturbation.font_size,
        "default_word_spacing_sigma": request.params.perturbation.word_spacing,
        "default_perturb_x_sigma": request.params.perturbation.x_offset,
        "default_perturb_y_sigma": request.params.perturbation.y_offset,
        "default_perturb_theta_sigma": request.params.perturbation.rotation,
        "default_background": (
            request.params.background_color.r,
            request.params.background_color.g,
            request.params.background_color.b,
            request.params.background_color.a,
        ),
        "default_fill": (
            request.params.font_color.r,
            request.params.font_color.g,
            request.params.font_color.b,
            request.params.font_color.a,
        ),
    }

    if font_path:
        params["default_font"] = font_path

    try:
        generator.modify_template_params(**params)
        file_paths = generator.generate_image(request.text)

        # Convert images to base64
        images = {}
        for page_num, file_path in file_paths.items():
            with open(file_path, "rb") as f:
                image_data = f.read()
                base64_data = b64encode(image_data).decode()
                images[str(page_num)] = base64_data

            # Clean up temporary files
            os.remove(file_path)

        return GenerateResponse(images=images, page_count=len(images))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
