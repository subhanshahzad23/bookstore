import type { FC } from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import Link from "next/link";
import { ShoppingCard } from "../shopping-cart";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import MobileNav from "./mobile-nav";
import getVendor from "@/lib/getVendor";

const Header: FC = async ({}) => {
  const vendor = await getVendor();

  return (
    <>
      <div
        className={`w-full h-[160px] fixed  top-0 z-[10]`}
        style={{ backgroundColor: vendor?.colors[0].hex }}
      >
        <MaxWidthWrapper className="">
          <div className="w-full h-[100px]  flex items-center justify-between ">
            <div
              className="w-[137px] h-[90px]"
              style={{
                backgroundImage: `url('${vendor?.logo}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <p className="text-xl">Ostoskori</p>
          </div>
        </MaxWidthWrapper>
        <div className="w-full min-h-[60px] h-fit bg-white shadow ">
          <MaxWidthWrapper className="h-[70px]  flex w-full items-center justify-between gap-2">
            <div className="h-full hidden xl:flex flex-grow  flex-wrap items-center justify-start gap-4">
              {vendor?.pages.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={"/"}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "font-extrabold  hidden md:block"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div>
              <MobileNav pages={vendor?.pages} />
            </div>
            <ShoppingCard />
          </MaxWidthWrapper>
        </div>
      </div>
    </>
  );
};

export default Header;
