"use client";
import { useGenerateText, useListFonts } from "@/lib/api-hooks";
import { useControlsStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { ColorPicker } from "../ui/color-picker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface ControlsProps extends React.ComponentProps<"div"> {
  onGenerate?: (data: {
    images: Record<string, string>;
    page_count: number;
  }) => void;
}

const Controls = ({ className, onGenerate, ...props }: ControlsProps) => {
  const store = useControlsStore();
  const { data: fonts, isLoading: loadingFonts } = useListFonts();
  const { mutate: generateText, isPending } = useGenerateText();

  const handleGenerate = () => {
    generateText(
      {
        text: store.text,
        params: {
          rate: store.rate,
          paper_x: store.paper_x,
          paper_y: store.paper_y,
          font_size: store.font_size,
          line_spacing: store.line_spacing,
          margins: store.margins,
          word_spacing: store.word_spacing,
          perturbation: store.perturbation,
          font: store.font,
          background_color: {
            ...store.background_color,
            a: Math.round(store.background_color.a * 255),
          },
          font_color: {
            ...store.font_color,
            a: Math.round(store.font_color.a * 255),
          },
        },
      },
      {
        onSuccess: (data) => {
          onGenerate?.(data);
        },
      }
    );
  };

  return (
    <div
      className={cn("h-screen overflow-y-auto flex flex-col gap-2", className)}
      {...props}
    >
      <div className="sticky top-0 bg-card px-8 py-4 shadow-2xl flex items-center justify-between">
        <span className="text-sm leading-none font-black">
          Bhooth <br /> Haath
        </span>
        <Button
          size="lg"
          onClick={handleGenerate}
          disabled={isPending || !store.text || !store.font}
        >
          {isPending ? "Generating..." : "Generate"}
        </Button>
      </div>
      <div className="px-8 py-4">
        <Accordion
          type="multiple"
          defaultValue={[
            "text",
            "dimensions",
            "margins",
            "text-settings",
            "colors",
            "perturbation",
            "rate",
          ]}
        >
          <AccordionItem value="text">
            <AccordionTrigger>
              <Label className="text-lg font-semibold">Text</Label>
            </AccordionTrigger>
            <AccordionContent>
              <Textarea
                name="text"
                className="m-0 min-h-[512px]"
                placeholder="Put your text here."
                value={store.text}
                onChange={(e) => store.setText(e.target.value)}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dimensions">
            <AccordionTrigger>
              <Label className="text-lg font-semibold">Page Dimensions</Label>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="page-width" className="text-sm font-semibold">
                    Page Width
                  </Label>
                  <Input
                    type="number"
                    id="paper_x"
                    name="paper_x"
                    value={store.paper_x}
                    onChange={(e) => store.setPaperX(Number(e.target.value))}
                    placeholder="Page Width"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="page-height"
                    className="text-sm font-semibold"
                  >
                    Page Height
                  </Label>
                  <Input
                    type="number"
                    id="paper_y"
                    name="paper_y"
                    value={store.paper_y}
                    onChange={(e) => store.setPaperY(Number(e.target.value))}
                    placeholder="Page Height"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="margins">
            <AccordionTrigger>
              <Label className="text-lg font-semibold">Margins</Label>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="margin-top" className="text-sm font-semibold">
                    Top Margin
                  </Label>
                  <Input
                    type="number"
                    id="margin-top"
                    name="margins.top"
                    value={store.margins.top}
                    onChange={(e) =>
                      store.setMargins({
                        ...store.margins,
                        top: Number(e.target.value),
                      })
                    }
                    placeholder="Top margin"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="margin-bottom"
                    className="text-sm font-semibold"
                  >
                    Bottom Margin
                  </Label>
                  <Input
                    type="number"
                    id="margin-bottom"
                    name="margins.bottom"
                    value={store.margins.bottom}
                    onChange={(e) =>
                      store.setMargins({
                        ...store.margins,
                        bottom: Number(e.target.value),
                      })
                    }
                    placeholder="Bottom margin"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="margin-left"
                    className="text-sm font-semibold"
                  >
                    Left Margin
                  </Label>
                  <Input
                    type="number"
                    id="margin-left"
                    name="margins.left"
                    value={store.margins.left}
                    onChange={(e) =>
                      store.setMargins({
                        ...store.margins,
                        left: Number(e.target.value),
                      })
                    }
                    placeholder="Left margin"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="margin-right"
                    className="text-sm font-semibold"
                  >
                    Right Margin
                  </Label>
                  <Input
                    type="number"
                    id="margin-right"
                    name="margins.right"
                    value={store.margins.right}
                    onChange={(e) =>
                      store.setMargins({
                        ...store.margins,
                        right: Number(e.target.value),
                      })
                    }
                    placeholder="Right margin"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="text-settings">
            <AccordionTrigger>
              <Label className="text-lg font-semibold">Text Settings</Label>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="font" className="text-sm font-semibold">
                    Font
                  </Label>
                  <Select
                    name="font"
                    value={store.font}
                    onValueChange={store.setFont}
                    required
                    disabled={loadingFonts}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          loadingFonts ? "Loading fonts..." : "Select Font"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts?.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="font-size" className="text-sm font-semibold">
                    Font Size
                  </Label>
                  <Input
                    type="number"
                    id="font-size"
                    name="font_size"
                    value={store.font_size}
                    onChange={(e) => store.setFontSize(Number(e.target.value))}
                    placeholder="Font size"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="line-spacing"
                    className="text-sm font-semibold"
                  >
                    Line Spacing
                  </Label>
                  <Input
                    type="number"
                    id="line-spacing"
                    name="line_spacing"
                    value={store.line_spacing}
                    onChange={(e) =>
                      store.setLineSpacing(Number(e.target.value))
                    }
                    placeholder="Line spacing"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="word-spacing"
                    className="text-sm font-semibold"
                  >
                    Word Spacing
                  </Label>
                  <Input
                    type="number"
                    id="word-spacing"
                    name="word_spacing"
                    value={store.word_spacing}
                    onChange={(e) =>
                      store.setWordSpacing(Number(e.target.value))
                    }
                    placeholder="Word spacing"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="colors">
            <AccordionTrigger>
              <Label className="text-lg font-semibold">Colors</Label>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="background-color"
                    className="text-sm font-semibold"
                  >
                    Background Color
                  </Label>
                  <ColorPicker
                    id="background-color"
                    name="background_color"
                    onChange={store.setBackgroundColor}
                    value={store.background_color}
                  />
                </div>
                <div>
                  <Label htmlFor="font-color" className="text-sm font-semibold">
                    Font Color
                  </Label>
                  <ColorPicker
                    id="font-color"
                    name="font_color"
                    onChange={store.setFontColor}
                    value={store.font_color}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="perturbation">
            <AccordionTrigger>
              <Label className="text-lg font-semibold">
                Perturbation Settings
              </Label>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="perturb-line-spacing"
                    className="text-sm font-semibold"
                  >
                    Line Spacing Variation
                  </Label>
                  <Input
                    type="number"
                    id="perturb-line-spacing"
                    name="perturbation.line_spacing"
                    value={store.perturbation.line_spacing}
                    onChange={(e) =>
                      store.setPerturbation({
                        ...store.perturbation,
                        line_spacing: Number(e.target.value),
                      })
                    }
                    placeholder="Line spacing variation"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="perturb-font-size"
                    className="text-sm font-semibold"
                  >
                    Font Size Variation
                  </Label>
                  <Input
                    type="number"
                    id="perturb-font-size"
                    name="perturbation.font_size"
                    value={store.perturbation.font_size}
                    onChange={(e) =>
                      store.setPerturbation({
                        ...store.perturbation,
                        font_size: Number(e.target.value),
                      })
                    }
                    placeholder="Font size variation"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="perturb-word-spacing"
                    className="text-sm font-semibold"
                  >
                    Word Spacing Variation
                  </Label>
                  <Input
                    type="number"
                    id="perturb-word-spacing"
                    name="perturbation.word_spacing"
                    value={store.perturbation.word_spacing}
                    onChange={(e) =>
                      store.setPerturbation({
                        ...store.perturbation,
                        word_spacing: Number(e.target.value),
                      })
                    }
                    placeholder="Word spacing variation"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="perturb-x-offset"
                    className="text-sm font-semibold"
                  >
                    X Offset
                  </Label>
                  <Input
                    type="number"
                    id="perturb-x-offset"
                    name="perturbation.x_offset"
                    value={store.perturbation.x_offset}
                    onChange={(e) =>
                      store.setPerturbation({
                        ...store.perturbation,
                        x_offset: Number(e.target.value),
                      })
                    }
                    placeholder="X offset"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="perturb-y-offset"
                    className="text-sm font-semibold"
                  >
                    Y Offset
                  </Label>
                  <Input
                    type="number"
                    id="perturb-y-offset"
                    name="perturbation.y_offset"
                    value={store.perturbation.y_offset}
                    onChange={(e) =>
                      store.setPerturbation({
                        ...store.perturbation,
                        y_offset: Number(e.target.value),
                      })
                    }
                    placeholder="Y offset"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="perturb-rotation"
                    className="text-sm font-semibold"
                  >
                    Rotation
                  </Label>
                  <Input
                    type="number"
                    id="perturb-rotation"
                    name="perturbation.rotation"
                    value={store.perturbation.rotation}
                    onChange={(e) =>
                      store.setPerturbation({
                        ...store.perturbation,
                        rotation: Number(e.target.value),
                      })
                    }
                    placeholder="Rotation variation"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rate">
            <AccordionTrigger>
              <Label className="text-lg font-semibold">Rate</Label>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <Label htmlFor="rate" className="text-sm font-semibold">
                  Rate
                </Label>
                <Input
                  type="number"
                  id="rate"
                  name="rate"
                  value={store.rate}
                  onChange={(e) => store.setRate(Number(e.target.value))}
                  placeholder="Rate"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="h-[40vh]"></div>
      </div>
    </div>
  );
};

export default Controls;
