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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Slider } from "../ui/slider";

// Add validation schema

const formSchema = z
  .object({
    text: z.string().min(1, "Text is required"),
    paper_x: z.number().min(100).max(5000),
    paper_y: z.number().min(100).max(5000),
    font_size: z.number().min(1).max(200),
    line_spacing: z.number().min(1).max(200),
    word_spacing: z.number().min(0).max(100),
    margins: z.object({
      top: z.number().min(0),
      bottom: z.number().min(0),
      left: z.number().min(0),
      right: z.number().min(0),
    }),
    font: z.string().min(1, "Font is required"),
    rate: z.number().min(1).max(64),
    perturbation: z.object({
      line_spacing: z.number().min(0).max(10),
      font_size: z.number().min(0).max(10),
      word_spacing: z.number().min(0).max(10),
      x_offset: z.number().min(0).max(10),
      y_offset: z.number().min(0).max(10),
      rotation: z.number().min(0).max(1),
    }),
  })
  .refine(
    (data) =>
      data.margins.left + data.margins.right < data.paper_x &&
      data.margins.top + data.margins.bottom < data.paper_y,
    {
      message: "Margins exceed or match paper dimensions",
      path: ["margins"],
    }
  );

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: store.text,
      paper_x: store.paper_x,
      paper_y: store.paper_y,
      font_size: store.font_size,
      line_spacing: store.line_spacing,
      word_spacing: store.word_spacing,
      margins: store.margins,
      font: store.font,
      rate: store.rate,
      perturbation: store.perturbation,
    },
  });

  const handleGenerate = (values: z.infer<typeof formSchema>) => {
    generateText(
      {
        text: values.text,
        params: {
          rate: values.rate,
          paper_x: values.paper_x,
          paper_y: values.paper_y,
          font_size: values.font_size,
          line_spacing: values.line_spacing,
          margins: values.margins,
          word_spacing: values.word_spacing,
          perturbation: values.perturbation,
          font: values.font,
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
          toast.success("Text generated successfully!");
        },
        onError: (error) => {
          toast.error("Failed to generate text: " + error.message);
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
          onClick={form.handleSubmit(handleGenerate)}
          disabled={isPending}
        >
          {isPending ? "Generating..." : "Generate"}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleGenerate)}
          className="px-8 py-4"
        >
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
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="m-0 min-h-[512px]"
                          placeholder="Put your text here."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dimensions">
              <AccordionTrigger>
                <Label className="text-lg font-semibold">Page Dimensions</Label>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="paper_x"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Page Width</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={100}
                              max={5000}
                              step={10}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paper_y"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Page Height</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={100}
                              max={5000}
                              step={10}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="margins">
              <AccordionTrigger>
                <Label className="text-lg font-semibold">Margins</Label>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="margins.top"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Top Margin</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={500}
                              step={1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="margins.bottom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bottom Margin</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={500}
                              step={1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="margins.left"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Left Margin</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={500}
                              step={1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="margins.right"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Right Margin</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={500}
                              step={1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
              <FormField
                control={form.control}
                name="margins"
                render={() => (
                  <FormItem>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </AccordionItem>

            <AccordionItem value="text-settings">
              <AccordionTrigger>
                <Label className="text-lg font-semibold">Text Settings</Label>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="font"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={loadingFonts}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  loadingFonts
                                    ? "Loading fonts..."
                                    : "Select Font"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fonts?.map((font) => (
                              <SelectItem key={font} value={font}>
                                {font}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="font_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Size</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={1}
                              max={200}
                              step={1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="line_spacing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Line Spacing</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={1}
                              max={200}
                              step={1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="word_spacing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Word Spacing</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                      onChange={store.setBackgroundColor}
                      value={store.background_color}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="font-color"
                      className="text-sm font-semibold"
                    >
                      Font Color
                    </Label>
                    <ColorPicker
                      id="font-color"
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
                  <FormField
                    control={form.control}
                    name="perturbation.line_spacing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Line Spacing Variation</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={0.1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="perturbation.font_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Size Variation</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={0.1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="perturbation.word_spacing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Word Spacing Variation</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={0.1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="perturbation.x_offset"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>X Offset</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={0.1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="perturbation.y_offset"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Y Offset</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={0.1}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="perturbation.rotation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rotation</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Slider
                              min={0}
                              max={1}
                              step={0.01}
                              value={[field.value]}
                              onValueChange={([value]) => field.onChange(value)}
                            />
                          </FormControl>
                          <Input
                            type="number"
                            className="w-20"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rate">
              <AccordionTrigger>
                <Label className="text-lg font-semibold">Rate</Label>
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Generation Rate</FormLabel>
                      <div className="flex gap-4 items-center">
                        <FormControl>
                          <Slider
                            min={1}
                            max={64}
                            step={1}
                            value={[field.value]}
                            onValueChange={([value]) => field.onChange(value)}
                          />
                        </FormControl>
                        <Input
                          type="number"
                          className="w-20"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="h-[40vh]"></div>
        </form>
      </Form>
    </div>
  );
};

export default Controls;
