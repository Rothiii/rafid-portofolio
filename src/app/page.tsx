import Stats from "@/components/Stats";
import { FiDownload } from "react-icons/fi";

// components
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-4 xl:pb-20">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            {/* info */}
            <span className="text-xl">Software Engineer</span>
            <h1 className="h1 mb-6">
              Hello I'm
              <br />
              <span className="text-accent">Rafid Al Khairy</span>
            </h1>
            <p className="max-w-[480px] mb-9 text-white/80">
              I excel at crafting elegant digital experiences and I am
              proficient in various programming languages and technologies.
            </p>
            {/* button and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-8 h-8 border border-accent rounded-full flex items-center justify-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-12 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>

      <Stats />
    </section>
  );
};

export default HomePage;
