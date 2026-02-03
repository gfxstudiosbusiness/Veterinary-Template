import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { GraduatesCarousel } from "@/components/sections/graduates-carousel";
import { MissionVision } from "@/components/sections/mission-vision";
import { Veterinarians } from "@/components/sections/veterinarians";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <Veterinarians />
      <GraduatesCarousel />
      <Testimonials />
      <MissionVision />
    </>
  );
}
