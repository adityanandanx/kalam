"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { ColorPicker } from "../ui/color-picker";

const Controls = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "h-screen overflow-y-auto flex flex-col gap-2 p-8",
        className
      )}
      {...props}
    >
      <div>
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
                    className=""
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
                    className=""
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
                  <Select name="font" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="f1">Font 1</SelectItem>
                      <SelectItem value="f2">Font 2</SelectItem>
                      <SelectItem value="f3">Font 3</SelectItem>
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
                    onChange={(val) => {
                      console.log(val);
                    }}
                    value={{ r: 255, g: 255, b: 255, a: 1 }}
                  />
                </div>
                <div>
                  <Label htmlFor="font-color" className="text-sm font-semibold">
                    Font Color
                  </Label>
                  <ColorPicker
                    id="font-color"
                    name="font_color"
                    onChange={(val) => {
                      console.log(val);
                    }}
                    value={{ r: 0, g: 0, b: 0, a: 1 }}
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
                <Input type="number" id="rate" name="rate" placeholder="Rate" />
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
