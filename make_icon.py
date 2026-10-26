from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parent
SCALE = 1024


def lerp(start: int, end: int, amount: float) -> int:
    return round(start + (end - start) * amount)


def make_icon() -> Image.Image:
    image = Image.new("RGBA", (SCALE, SCALE), (0, 0, 0, 0))

    gradient = Image.new("RGBA", (SCALE, SCALE))
    pixels = gradient.load()
    start = (23, 30, 73)
    end = (7, 12, 34)
    for y in range(SCALE):
        for x in range(SCALE):
            amount = (x * 0.32 + y * 0.68) / SCALE
            pixels[x, y] = (
                lerp(start[0], end[0], amount),
                lerp(start[1], end[1], amount),
                lerp(start[2], end[2], amount),
                255,
            )

    mask = Image.new("L", (SCALE, SCALE), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((66, 66, 958, 958), radius=232, fill=255)
    image.alpha_composite(Image.composite(gradient, Image.new("RGBA", image.size), mask))

    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse((560, -190, 1160, 410), fill=(185, 165, 255, 92))
    glow_draw.ellipse((-210, 575, 360, 1145), fill=(231, 255, 69, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(85))
    glow_mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(glow_mask).rounded_rectangle((66, 66, 958, 958), radius=232, fill=255)
    image.alpha_composite(Image.composite(glow, Image.new("RGBA", image.size), glow_mask))

    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle(
        (82, 82, 942, 942),
        radius=216,
        outline=(255, 255, 255, 26),
        width=4,
    )

    ring_box = (190, 190, 834, 834)
    draw.arc(ring_box, start=-90, end=270, fill=(45, 52, 102, 255), width=62)
    draw.arc(ring_box, start=-90, end=164, fill=(231, 255, 69, 255), width=62)

    # Rounded progress endpoints.
    draw.ellipse((481, 159, 543, 221), fill=(231, 255, 69, 255))
    endpoint_x = 512 + 322 * 0.438
    endpoint_y = 512 + 322 * 0.899
    radius = 31
    draw.ellipse(
        (
            endpoint_x - radius,
            endpoint_y - radius,
            endpoint_x + radius,
            endpoint_y + radius,
        ),
        fill=(231, 255, 69, 255),
    )

    draw.ellipse((320, 320, 704, 704), fill=(231, 255, 69, 255))
    draw.ellipse((350, 350, 674, 674), fill=(16, 23, 57, 255))
    draw.arc((350, 350, 674, 674), start=205, end=336, fill=(255, 255, 255, 28), width=9)

    # Central four-point spark, echoing the brand mark and energy gauge.
    sparkle = [
        (512, 391),
        (557, 467),
        (633, 512),
        (557, 557),
        (512, 633),
        (467, 557),
        (391, 512),
        (467, 467),
    ]
    draw.polygon(sparkle, fill=(231, 255, 69, 255))
    draw.ellipse((744, 716, 816, 788), fill=(255, 125, 72, 255))
    draw.ellipse((761, 733, 799, 771), fill=(255, 255, 255, 120))

    # Very subtle top-left sheen, kept simple enough for small Windows sizes.
    sheen = Image.new("RGBA", image.size, (0, 0, 0, 0))
    ImageDraw.Draw(sheen).ellipse((145, 80, 620, 430), fill=(255, 255, 255, 14))
    sheen = sheen.filter(ImageFilter.GaussianBlur(48))
    image.alpha_composite(Image.composite(sheen, Image.new("RGBA", image.size), mask))

    return image


if __name__ == "__main__":
    icon = make_icon()
    icon.save(ROOT / "fuelup-icon.png", optimize=True)
    icon.save(
        ROOT / "fuelup.ico",
        format="ICO",
        sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
