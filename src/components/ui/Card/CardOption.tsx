import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { Image } from "@nextui-org/react";
import Link from "next/link";

interface Props {
  src: string;
  title: string;
  label: string;
  href:string;
}

export default function CardOptionComponent({ src, title, label,href }: Props) {
  return (
    <>
      <Link href={href}>
        <div className="bg-white bg-opacity-70 rounded-xl shadow-2xl	 flex justify-between items-center h-[8rem] w-full pr-6 cursor-pointer hover:bg-red-400/50">
          <div className="h-full flex">
            <Image
              className="h-full"
              alt="NextUI hero Image"
              src={src}
              removeWrapper
            />
            <div className="py-2 w-[30%]">
              <h1>{title}</h1>
              <span className="text-tiny">{label}</span>
            </div>
          </div>
          <ArrowLongRightIcon className="h-10 text-red-500"></ArrowLongRightIcon>
        </div>
      </Link>
    </>
  );
}
