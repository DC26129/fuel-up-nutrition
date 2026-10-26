from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parent
ANDROID_RES = ROOT / "android" / "app" / "src" / "main" / "res"
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


def write_android_assets(icon: Image.Image) -> None:
    if not ANDROID_RES.exists():
        return

    mipmaps = {
        "mdpi": (48, 108),
        "hdpi": (72, 162),
        "xhdpi": (96, 216),
        "xxhdpi": (144, 324),
        "xxxhdpi": (192, 432),
    }
    for density, (launcher_size, foreground_size) in mipmaps.items():
        folder = ANDROID_RES / f"mipmap-{density}"
        folder.mkdir(parents=True, exist_ok=True)
        launcher = icon.resize((launcher_size, launcher_size), Image.Resampling.LANCZOS)
        launcher.save(folder / "ic_launcher.png", optimize=True)
        launcher.save(folder / "ic_launcher_round.png", optimize=True)

        foreground = Image.new(
            "RGBA", (foreground_size, foreground_size), (0, 0, 0, 0)
        )
        inner_size = round(foreground_size * 0.68)
        inner = icon.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
        offset = (foreground_size - inner_size) // 2
        foreground.alpha_composite(inner, (offset, offset))
        foreground.save(folder / "ic_launcher_foreground.png", optimize=True)

    splash_sizes = {
        "drawable-port-mdpi": (320, 480),
        "drawable-port-hdpi": (480, 800),
        "drawable-port-xhdpi": (720, 1280),
        "drawable-port-xxhdpi": (960, 1600),
        "drawable-port-xxxhdpi": (1280, 1920),
        "drawable-land-mdpi": (480, 320),
        "drawable-land-hdpi": (800, 480),
        "drawable-land-xhdpi": (1280, 720),
        "drawable-land-xxhdpi": (1600, 960),
        "drawable-land-xxxhdpi": (1920, 1280),
        "drawable": (480, 320),
    }
    for folder_name, (width, height) in splash_sizes.items():
        folder = ANDROID_RES / folder_name
        folder.mkdir(parents=True, exist_ok=True)
        splash = Image.new("RGBA", (width, height), (238, 236, 251, 255))
        icon_size = min(width, height) * 0.42
        resized = icon.resize(
            (round(icon_size), round(icon_size)), Image.Resampling.LANCZOS
        )
        splash.alpha_composite(
            resized,
            ((width - resized.width) // 2, (height - resized.height) // 2),
        )
        splash.save(folder / "splash.png", optimize=True)


if __name__ == "__main__":
    icon = make_icon()
    icon.save(ROOT / "fuelup-icon.png", optimize=True)
    icon.resize((192, 192), Image.Resampling.LANCZOS).save(
        ROOT / "fuelup-pwa-192.png", optimize=True
    )
    icon.resize((512, 512), Image.Resampling.LANCZOS).save(
        ROOT / "fuelup-pwa-512.png", optimize=True
    )
    icon.resize((180, 180), Image.Resampling.LANCZOS).save(
        ROOT / "fuelup-apple-touch.png", optimize=True
    )
    maskable = Image.new("RGBA", (512, 512), (18, 24, 63, 255))
    scaled = icon.resize((430, 430), Image.Resampling.LANCZOS)
    maskable.alpha_composite(scaled, ((512 - 430) // 2, (512 - 430) // 2))
    maskable.save(ROOT / "fuelup-maskable-512.png", optimize=True)
    icon.save(
        ROOT / "fuelup.ico",
        format="ICO",
        sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
    write_android_assets(icon)
