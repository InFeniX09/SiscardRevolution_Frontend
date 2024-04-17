import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";

interface Props {
  label: string;
  href:string;
  src:string;
}
export default function CardBlurComponent({ label,href,src }: Props) {
  return (
    <Link href={href}>
      <Card isFooterBlurred radius="lg" className="border-none cursor-pointer h-full w-full">
        <Image
          alt="Woman listing to music"
          className="h-full w-full "
          src={src}
          removeWrapper
        />
        <CardFooter className=" flex justify-center items-center bg-red-500/30 before:bg-red-500/10 border-red-500/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className=" text-white/80 ">
            <strong>{label}</strong>{" "}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
