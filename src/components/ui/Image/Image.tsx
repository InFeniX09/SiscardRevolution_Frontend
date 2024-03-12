"use client";
import { Image } from "@nextui-org/react";

interface ImageProps {
  srcimg: string;
}

export default function ImageComponent({ srcimg }: ImageProps) {
  return (
    <Image src={srcimg} className={`absolute w-full	h-full rounded-none`} removeWrapper></Image>
  );
}
