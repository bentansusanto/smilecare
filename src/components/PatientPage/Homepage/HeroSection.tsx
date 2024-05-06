import BgHeroSection from "@/assets/images/bg-herosection.svg";
import { heroData } from "@/libs/PatientData/HomeData";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse items-center space-x-0 px-3 md:flex-row md:space-x-10 md:px-8 lg:justify-between lg:px-20">
      <div className="mt-5 space-y-3 md:mt-0">
        {/* Information */}
        <div className="flex items-center space-x-3 rounded-full bg-blue-50 pr-6 text-sm md:w-[100%] lg:w-[55%]">
          <div className="rounded-full bg-[#2AB49B] px-4 py-1.5 text-white">
            New
          </div>
          <p className="text-blue-900">Emergency call feature updated</p>
        </div>
        {/* Heading */}
        <h1 className="text-3xl font-semibold leading-snug text-blue-900 md:w-[100%] md:text-[28px] md:leading-relaxed lg:w-[95%] lg:text-5xl lg:leading-snug">
          {heroData.heading}
        </h1>
        {/* Services */}
        <div className=" flex flex-col md:items-center space-x-0 space-y-5 py-5 md:pt-10 md:pb-5 md:flex-row md:space-x-14 md:space-y-0">
          {heroData.services.map((list, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <Image
                src={require(`@/assets/icons/${list.icon}`)}
                alt={list.icon}
              />
              <div className="space-y-1">
                <h2 className="text-[16px] font-medium">{list.title}</h2>
                <p className="text-sm text-gray-400">{list.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Search Category Consutation */}
        <div className="bg-gray-100 rounded-md flex justify-between w-full md:w-[80%]">
          <input type="text" placeholder="Categories Consutation" className="bg-transparent p-4 text-sm outline-none w-[60%]"/>
          <button className="bg-[#007EFF] py-3 px-6 rounded-md text-white text-sm">Search Doctor</button>
        </div>
      </div>
      <Image
        src={BgHeroSection}
        alt="bg-herosection"
        className="md:w-[48%] lg:w-auto"
      />
    </div>
  );
};

export default HeroSection;
