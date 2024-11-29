import type { FC } from "react";
import MaxWidthWrapper from "../max-width-wrapper";

const Footer: FC = ({}) => {
  return (
    <div className="w-full h-fit my-8">
      <div className="w-full h-[11px] bg-[#FFC767]"></div>
      <div className="w-full bg-[#F5F5F5] pt-4">
        <MaxWidthWrapper>
          <div className="bg-[#F5F5F5] text-[#757575] w-full min-h-[478px] h-fit grid gap-4  grid-cols-1 md:grid-cols-2">
            <div className="w-full h-full flex flex-col gap-y-4">
              <span className="text-[#757575] font-bold playfair-display text-5xl">
                Salpakirja Oy
              </span>

              <span className="mt-4">Salpakirja Oy © 2024</span>
              <span>
                Tietosuojaseloste 
                <br />
                Evästeet
              </span>
            </div>

            <div className="w-full h-full flex flex-col gap-y-4">
              <span className="text-[#757575]">Yhteystiedot:</span>
              <span className="text-[#757575]">
                Salpakirja Oy asiakaspalvelu
                <br />
                salpakirja@gmail.com tai puh. 050 339 5724
              </span>
              <span className="text-[#757575]">
                Kirjaspotti Hamina
                <br />
                Avoinna ma, ke-pe klo 9-17, ti klo 8-16
                <br />
                Raatihuoneentori 16, 49400 Hamina
                <br />
                salpakirja@gmail.com, puh. 050 339 5724
              </span>
              <span className="text-[#757575]">
                Kirjaspotti Kotka
                <br />
                Avoinna ma-pe klo 10.15-18, la klo 10.15-16, su suljettu.
                <br />
                Keskuskatu 10, 48100 Kotka, Kauppakeskus Pasaati katutaso
                <br />
                kirjaspotti.kotka@gmail.com, puh. 041 314 7501
              </span>{" "}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Footer;
