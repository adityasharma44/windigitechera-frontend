"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer
        className="wow fadeInUp relative z-10 bg-white pt-10 md:pt-20 border-t lg:pt-12"
        data-wow-delay=".1s"
      >
        <div className="container">
            <div className="w-full px-4">
              <div className="flex flex-col justify-center items-center">
                <Link href="/" className="mb-2 font-semibold text-2xl uppercase inline-block">
                  WindigiTech Era
                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color">
                  Connecting skills and work through one smart platform.
                </p>
              </div>
            </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="py-5">
            <p className="text-center text-base text-body-color">
              WindigiTechEra{" "}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
