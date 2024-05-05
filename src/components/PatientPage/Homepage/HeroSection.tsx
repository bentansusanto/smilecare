import BgHeroSection from "@/assets/images/bg-herosection.svg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center space-x-0 md:space-x-10 lg:justify-between px-3 md:px-8 lg:px-20">
      <div className="space-y-3 mt-5 md:mt-0">
        <div className="flex items-center space-x-3 rounded-full bg-blue-50 pr-6 text-sm md:w-[100%] lg:w-[55%]">
          <div className="rounded-full bg-[#2AB49B] px-4 py-1.5 text-white">
            New
          </div>
          <p className="text-blue-900">Emergency call feature updated</p>
        </div>
        <h1 className="lg:text-5xl md:text-[28px] text-3xl font-semibold text-blue-900 md:w-[100%] lg:w-[95%] md:leading-relaxed lg:leading-snug leading-snug">
          Meet Your Doctor. Trusted & Professional.
        </h1>
      </div>
      <Image src={BgHeroSection} alt="bg-herosection" className="md:w-[48%] lg:w-auto"/>
    </div>
  );
};

export default HeroSection;
