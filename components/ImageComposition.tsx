import React, { useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Image } from "@nextui-org/react";
import { copyImageToClipboard } from "copy-image-clipboard";

interface ImageCompositionProps {
  background: string;
  overlay: string;
  imagePng: string;
  setImagePng: React.Dispatch<React.SetStateAction<string>>;
}

const ImageComposition: React.FC<ImageCompositionProps> = ({
  background,
  overlay,
  imagePng,
  setImagePng,
}) => {
  const compositeRef = useRef(null);

  useEffect(() => {
    if (background && overlay) {
      if (!compositeRef.current) return;

      toPng(compositeRef.current).then((result) => {
        setImagePng(result);
      });
    }
  }, [background, overlay]);

  const copyToClipboard = async () => {
    if (!compositeRef.current) return;

    try {
      const resultPng = await toPng(compositeRef.current);

      setImagePng(resultPng);

      if (resultPng) {
        copyImageToClipboard(resultPng).then(() => {
          console.log("Image Copied");
        });
      }

      console.error("Erro: Não foi possível gerar a imagem PNG.");
    } catch (error) {
      console.error("Erro ao criar imagem PNG:", error);
    }
  };

  return (
    <div className="lg:flex lg:justify-center">
      <button onClick={copyToClipboard}>
        <div
          ref={compositeRef}
          className="w-full h-full lg:max-w-5xl lg:h-auto aspect-auto relative flex items-center justify-center"
        >
          <Image alt="background" src={background} width={1920} height={1080} />

          <div className="absolute inset-0 flex items-center justify-center z-10 rounded-xl">
            <Image
              alt="overlay"
              src={overlay}
              width={1920}
              height={1080}
              className="rounded-xl mx-auto my-auto p-4"
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default ImageComposition;
