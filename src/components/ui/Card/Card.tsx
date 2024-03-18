"use client";
import { Image } from "@nextui-org/react";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
interface Props {
  title: string;
  text: string;
  link: string
}

export default function CardComponent({ title, text,link }: Props) {
  return (
    <>
      <Link href={link}>
        <div className="w-full h-full bg-white/50 p-4 flex justify-center items-center gap-[5rem] rounded-2xl">
          <div className="flex w-full h-full justify-center items-center gap-4">
            <Image
              src="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg"
              fallbackSrc="https://via.placeholder.com/300x200"
              alt="NextUI Image with fallback"
              className="w-[100px] h-[100px]"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-xl">{title}</h1>
              <span>{text}</span>
            </div>
          </div>
          <div>
            <ChevronRightIcon className="h-5" />
          </div>
        </div>
      </Link>
    </>
  );
}
