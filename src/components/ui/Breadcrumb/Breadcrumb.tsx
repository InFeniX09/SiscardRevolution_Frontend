"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { environment } from '@/src/environments/environment'

export const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const currentPageName = paths[paths.length - 1];

  return (
    <div className="text-[0.8rem]">
      <Breadcrumbs>
        {paths.map((path, index) => {
          const href = `http://localhost:4000${paths.slice(0, index + 1).join("/")}`;
          const text = path === "" ? "Home" : path;

          return (
            <BreadcrumbItem key={index}>
              <Link href={href}>{text}</Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
      <h1 className="text-1xl uppercase ">
        <strong>{currentPageName}</strong>
      </h1>
    </div>
  );
};
