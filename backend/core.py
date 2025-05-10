from pathlib import Path

from PIL import Image, ImageFont
from handright import Template, handwrite
from tools import BasicTools


class handwrite_generator(object):
    def __init__(self):
        self.template_params = {
            "rate": 4,  # Image scaling ratio
            "default_paper_x": 667,  # Default paper width in px
            "default_paper_y": 945,  # Default paper height in px
            "default_font": BasicTools.get_ttf_file_path()[1][
                0
            ],  # Default font file path
            "default_img_output_path": "outputs",  # Default image output path
            "default_font_size": 30,  # Default font size
            "default_line_spacing": 70,  # Default line spacing in px
            "default_top_margin": 10,  # Default top margin in px
            "default_bottom_margin": 10,  # Default bottom margin in px
            "default_left_margin": 10,  # Default left margin in px
            "default_right_margin": 10,  # Default right margin in px
            "default_word_spacing": 1,  # Default word spacing in px
            "default_line_spacing_sigma": 1,  # Default random variation in line spacing in px
            "default_font_size_sigma": 1,  # Default random variation in font size in px
            "default_word_spacing_sigma": 1,  # Default random variation in word spacing in px
            "default_perturb_x_sigma": 1,  # Default random variation in horizontal stroke offset in px
            "default_perturb_y_sigma": 1,  # Default random variation in vertical stroke offset in px
            "default_perturb_theta_sigma": 0.05,  # Default random variation in stroke rotation offset in rad
            "default_start_chars": "“（[<",  # Specific characters to start a new line, prevents them from appearing at the end of a line
            "default_end_chars": "，。",  # Prevents specific characters from appearing at the beginning of a line due to auto line breaks
            "default_background": (
                0,
                0,
                0,
                0,
            ),  # Default background color (transparent)
            "default_fill": (0, 0, 0, 255),  # Default font fill color (black)
        }
        self.template = None  # Template

    def modify_template_params(self, **kwargs):
        for key, value in kwargs.items():
            self.template_params[key] = value
        self.generate_template()

    def generate_template(self):
        rate = self.template_params["rate"]
        self.template = Template(
            background=Image.new(
                mode="RGBA",
                size=(
                    self.template_params["default_paper_x"] * rate,
                    self.template_params["default_paper_y"] * rate,
                ),
                color=self.template_params["default_background"],
            ),
            font=ImageFont.truetype(
                self.template_params["default_font"],
                size=self.template_params["default_font_size"] * rate,
            ),
            line_spacing=self.template_params["default_line_spacing"] * rate,
            fill=self.template_params["default_fill"],
            left_margin=self.template_params["default_left_margin"] * rate,
            top_margin=self.template_params["default_top_margin"] * rate,
            right_margin=self.template_params["default_right_margin"] * rate,
            bottom_margin=self.template_params["default_bottom_margin"] * rate,
            word_spacing=self.template_params["default_word_spacing"] * rate,
            line_spacing_sigma=self.template_params["default_line_spacing_sigma"]
            * rate,
            font_size_sigma=self.template_params["default_font_size_sigma"] * rate,
            word_spacing_sigma=self.template_params["default_word_spacing_sigma"]
            * rate,
            start_chars=self.template_params["default_start_chars"],
            end_chars=self.template_params["default_end_chars"],
            perturb_x_sigma=self.template_params["default_perturb_x_sigma"],
            perturb_y_sigma=self.template_params["default_perturb_y_sigma"],
            perturb_theta_sigma=self.template_params["default_perturb_theta_sigma"],
        )

    def generate_image(self, text):
        temp_file_path_dict = {}
        if self.template is None:
            self.generate_template()
        images = handwrite(text, self.template, "outputs")
        for i, im in enumerate(images):
            assert isinstance(im, Image.Image)
            save_path = Path("outputs").joinpath(f"{i}.png")
            temp_file_path_dict[i] = save_path
            im.save(save_path)
        return temp_file_path_dict


if __name__ == "__main__":
    generator = handwrite_generator()
    generator.modify_template_params(rate=8)
    generator.generate_template()
    generator.generate_image("""Hello world this is a test""")
