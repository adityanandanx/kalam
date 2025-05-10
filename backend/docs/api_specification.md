# HandWrite Generator API Specification

## Overview

The HandWrite Generator API provides endpoints to generate handwritten text images using various fonts and customization options.

## Base URL

`/api/v1`

## Endpoints

### Generate Handwritten Text

`POST /generate`

Generates handwritten text images with specified parameters.

#### Request Body

```json
{
  "text": "string",
  "params": {
    "rate": 4, // Image scaling ratio (1-64)
    "paper_x": 667, // Paper width in px
    "paper_y": 945, // Paper height in px
    "font_size": 30, // Font size in px
    "line_spacing": 70, // Line spacing in px
    "margins": {
      "top": 10,
      "bottom": 10,
      "left": 10,
      "right": 10
    },
    "word_spacing": 1, // Word spacing in px
    "perturbation": {
      "line_spacing": 1, // Line spacing variation
      "font_size": 1, // Font size variation
      "word_spacing": 1, // Word spacing variation
      "x_offset": 1, // Horizontal stroke variation
      "y_offset": 1, // Vertical stroke variation
      "rotation": 0.05 // Stroke rotation variation (rad)
    },
    "font": "string", // Font name from ttf_library
    "background_color": {
      // RGBA tuple (0-255)
      "r": 0,
      "g": 0,
      "b": 0,
      "a": 0
    },
    "font_color": {
      // RGBA tuple (0-255)
      "r": 0,
      "g": 0,
      "b": 0,
      "a": 255
    }
  }
}
```

#### Response

```json
{
  "images": {
    "0": "string", // Base64 encoded PNG for page 1
    "1": "string" // Base64 encoded PNG for page 2 (if exists)
  },
  "page_count": 1
}
```

### List Available Fonts

`GET /fonts`

Returns list of available TTF fonts.

#### Response

```json
{
  "fonts": ["上首鸿志手写体", "品如手写体"]
}
```

## Error Responses

```json
{
  "error": "string",
  "detail": "string"
}
```

Common error codes:

- 400: Invalid request parameters
- 404: Font not found
- 500: Internal server error
