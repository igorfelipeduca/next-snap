"use client";

import React, { useEffect, useState } from "react";
import ImageComposition from "../components/ImageComposition";
import { Button, Image as NextImage } from "@nextui-org/react";
import { LocateOff, LucideGithub, Share } from "lucide-react";
import { Toaster, toast } from "sonner";
import Sig from "./assets/sig.svg";
import Image from "next/image";

interface Image {
  type?: string;
  url: string;
}

const Home: React.FC = () => {
  const [imageList, setImageList] = useState<Image[]>([]);
  const [backupImageList, setBackupImageList] = useState<Image[]>([]);
  const [imagePng, setImagePng] = useState<string>("");

  const overlay = imageList.find((image) => image.type === "overlay")?.url;

  const background = imageList.find(
    (image) => image.type === "background"
  )?.url;

  const handleUploadImage = () => {
    const input = document.getElementById("dropzone-file") as HTMLInputElement;

    if (!input.files?.length) return;

    const files = Array.from(input.files);

    const images = files.map((file) => {
      const url = URL.createObjectURL(file);

      return {
        url,
        type: overlay ? "background" : "overlay",
      };
    });

    setImageList((prev) => [...prev, ...images]);

    const overlayExists = images.find((image) => image.type === "overlay");
    const backgroundExists = images.find(
      (image) => image.type === "background"
    );

    if (overlayExists) toast.success("📦 Overlay image uploaded!");
    if (backgroundExists) toast.success("📦 Background image uploaded!");

    if (backupImageList.length === 2) {
      setBackupImageList(images);

      console.log({ backupImageList });
    }

    setBackupImageList((prev) => [...prev, ...images]);
  };

  const shareOnTwitter = () => {
    const tweetText =
      "I just created a beautiful screenshot with next-snap 🎉 \n You should really check out \n https://next-snapper.vercel.app";

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&hashtags=nextjs,nextsnap,indiehackers`;

    window.open(url, "_blank");
  };

  useEffect(() => {
    if (overlay && background)
      toast.success("🎉 Snap ready! What do you think?", {
        action: {
          label: "Share!",
          onClick: shareOnTwitter,
        },
      });
  }, [overlay, background]);

  const handleReset = () => {
    setImageList([]);

    toast("🗑️ Snap reseted!", {
      action: {
        label: "Undo",
        onClick: undoReset,
      },
    });
  };

  const undoReset = () => {
    setImageList(backupImageList);

    toast.success("🤝 Snap restored! Let me get you back on track.");
  };

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div className="py-4 lg:px-16 px-8 border-b border-zinc-700 flex items-center justify-between">
        <h1 className="text-zinc-300 text-lg">next-snap</h1>

        <div className="gap-x-4 flex items-center">
          <a href="https://github.com/igorfelipeduca/next-snap">
            <LucideGithub className="text-zinc-300" />
          </a>

          <a href="https://biome.sigcoding.com">
            <Image className="h-7 w-7" alt="Sig" src={Sig} />
          </a>
        </div>
      </div>

      {overlay && background ? (
        <div className="py-8 flex justify-end px-16">
          <div className="flex items-center gap-x-2">
            <Button
              className="rounded-lg bg-zinc-950 text-zinc-400 border border-zinc-700 lg:text-lg"
              onClick={handleReset}
            >
              <LocateOff className="h-4 w-4" /> Reset snap
            </Button>

            <Button
              className="rounded-lg bg-zinc-950 text-zinc-400 border border-zinc-700 lg:text-lg"
              onClick={shareOnTwitter}
            >
              <Share className="h-4 w-4" /> Share snap
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col">
        <div className="flex justify-center pt-16">
          <h1 className="text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-zinc-300 to-zinc-500 font-bold">
            next-snap
          </h1>
        </div>

        <div className="flex justify-center mt-8 px-16">
          <h3 className="text-md text-zinc-400">
            beautiful screenshots with your own browser. you just need some
            image composing.
          </h3>
        </div>
      </div>

      {overlay && background ? (
        <div className="mt-16 px-8">
          <ImageComposition
            background={background ?? ""}
            overlay={overlay ?? ""}
            imagePng={imagePng}
            setImagePng={setImagePng}
          />

          <div className="mt-4 lg:px-48">
            <span className="text-zinc-600">Click to copy the image</span>
          </div>
        </div>
      ) : (
        <>
          {overlay ? (
            <div className="px-8 pt-16 lg:flex lg:justify-center">
              <NextImage
                src={overlay}
                alt="overlay"
                isBlurred
                className="lg:max-w-5xl"
              />
            </div>
          ) : (
            <div className="flex justify-center mt-16 px-8">
              <div className="flex items-center justify-center w-full lg:max-w-3xl">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-950 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm px-4 text-center">
                      Upload your <span className="font-semibold">overlay</span>{" "}
                      image.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                </label>
              </div>
            </div>
          )}

          {background ? (
            <div className="px-8 pt-16 lg:flex lg:justify-center">
              <NextImage
                src={background}
                alt="background"
                isBlurred
                className="lg:max-w-5xl"
              />
            </div>
          ) : (
            <div className="flex justify-center mt-16 px-8">
              <div className="flex items-center justify-center w-full lg:max-w-3xl">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-950 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm px-4 text-center">
                      Upload your{" "}
                      <span className="font-semibold">background</span> image.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                </label>
              </div>
            </div>
          )}
        </>
      )}

      <a
        href="https://twitter.com/ducaswtf"
        className="mt-16 border-t border-zinc-700 py-4 px-8 flex gap-x-2 items-center"
      >
        <NextImage
          src={"https://i.ibb.co/Bwzr3t2/duca.jpg"}
          alt="ducaswtf"
          isBlurred
          className="h-10 w-10 rounded-full"
        />

        <span className="text-zinc-400">
          made by{" "}
          <a
            href="https://twitter.com/ducaswtf"
            className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 to-zinc-400 font-medium"
          >
            Duca
          </a>
          .
        </span>
      </a>

      <Toaster className="z-50" />
    </main>
  );
};

export default Home;
