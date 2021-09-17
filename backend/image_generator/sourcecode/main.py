from PIL import Image, ImageDraw, ImageFilter
import os


def mask_circle_transparent(pil_img, blur_radius, offset=0):
    offset = blur_radius * 2 + offset
    mask = Image.new("L", pil_img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((offset, offset, pil_img.size[0] - offset, pil_img.size[1] - offset), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(blur_radius))

    result = pil_img.copy()
    result.putalpha(mask)

    return result


def main():
    print(f"Processing {len(os.listdir('coins'))} images...")
    filenames = open("filenames.txt", "w")
    numberOfErrors = 0

    for filename in os.listdir("coins"):
        if filename.endswith(".meta"):
            os.remove(f"coins/{filename}")
        else:
            try:
                img = Image.open(f"coins/{filename}")

                # Crop at left circle
                img_res = img.crop((9, 521, 503, 1015))

                # Make it a circle
                img_res = mask_circle_transparent(img_res, 0)

                img_res.save(f"final_images/{filename}")
                os.remove(f"coins/{filename}")
                filenames.write(f"{filename}\n")
                print(f"Successfully processed {filename}")
            except:
                print(f"Error while processing {filename}")
                numberOfErrors += 1

    print(f"Finished with {numberOfErrors} errors !")
    filenames.close()
    return


if __name__ == '__main__':
    main()
