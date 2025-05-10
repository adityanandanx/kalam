"use client";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForwardedRef } from "@/lib/use-forwarded-ref";
import { cn, hexToRgba, rgbaToHex } from "@/lib/utils";
import { forwardRef, useMemo, useState } from "react";
import { RgbaColor, RgbaColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: RgbaColor;
  onChange: (value: RgbaColor) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue: RgbaColor = useMemo(() => {
      return value || { r: 0, g: 0, b: 0, a: 1 };
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn("block", className)}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size="icon"
            style={{
              backgroundColor: `rgba(${parsedValue.r}, ${parsedValue.g}, ${parsedValue.b}, ${parsedValue.a})`,
            }}
            variant="outline"
          >
            <div />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <RgbaColorPicker color={value} onChange={onChange} />
          <Input
            maxLength={7}
            onChange={(e) => {
              onChange(hexToRgba(e.currentTarget.value));
            }}
            ref={ref}
            value={rgbaToHex(value)}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
