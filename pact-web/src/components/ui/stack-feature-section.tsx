"use client";

import { Button } from "@/components/ui/button";
import {
  FaReact, FaDocker, FaNodeJs, FaGithub, FaPython, FaRust, FaBitcoin
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript, SiSolidity
} from "react-icons/si";

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: SiTypescript, color: "#3178C6" },
  // { Icon: SiNextdotjs, color: "#000000" },
  { Icon: FaPython, color: "#3776AB" },
  { Icon: FaRust, color: "#000000" },
  { Icon: SiSolidity, color: "#363636" },
  { Icon: FaBitcoin, color: "#F79900" }, // Updated Bitcoin color for accuracy
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiVercel, color: "#000000" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: null, img: "/icp.svg", alt: "Internet Computer Protocol" },
  { Icon: null, img: "https://cdn.brandfetch.io/idrbpF9ws3/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1714121111650", alt: "Story Protocol" },
  { Icon: null, img: "/constellation.png", alt: "Constellation DAG" },
];

export default function FeatureSection() {
  const orbitCount = 3;
  const orbitGap = 8; // rem between orbits
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative max-w-6xl mx-auto my-32 pl-10 flex items-center justify-between h-[30rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden ">
      {/* Left side: Heading and Text */}
      <div className="w-1/2 z-10">
        <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900 dark:text-white">
          TECHNOLOGY
        </h1>
        <p className="mt-8 text-xl text-foreground font-mono mb-6 max-w-lg">
          P.A.C.T. combines AI for intelligent document generation and blockchain for unparalleled security, transparency, and automated legal agreements.
        </p>
        {/*<div className="flex items-center gap-3">*/}
        {/*  <Button variant="outline" className="font-mono">Learn More</Button>*/}
        {/*</div>*/}
      </div>

      {/* Right side: Orbit animation cropped to 1/4 */}
      <div className="relative w-1/2 h-full flex items-center justify-start overflow-hidden">
        <div className="relative w-[50rem] h-[50rem] translate-x-[50%] flex items-center justify-center">
          {/* Center Circle */}
          <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-800 shadow-lg flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="w-12 h-12" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`; // equal spacing
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-gray-300 dark:border-gray-600"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${12 + orbitIdx * 6}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {cfg.Icon ? (
                          <cfg.Icon className="w-8 h-8" style={{ color: cfg.color }} />
                        ) : (
                          <img
                            src={cfg.img}
                            alt={cfg.alt}
                            className="w-8 h-8 object-contain"
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
