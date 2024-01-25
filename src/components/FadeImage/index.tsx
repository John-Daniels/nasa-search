import Image, { ImageProps } from "next/image";
import { twMerge } from "tw-merge";

interface IFadeImage extends ImageProps {}

/**
 * @description - Use this to create a smooth animation when the image loads
 */
const FadeImage = ({ src, className, alt = "", ...props }: IFadeImage) => {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      loading="lazy"
      className={twMerge(`transition-all opacity-0 duration-[1s] ${className}`)}
      onLoad={(image) => image.currentTarget.classList.remove("opacity-0")}
    />
  );
};

export default FadeImage;
