import * as React from "react";
import {
  Activity,
  ArrowRight,
  Bird,
  Menu,
  Plug,
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FallingPattern } from "@/components/ui/falling-pattern";
import {Link} from "react-router-dom";

const navigationItems = [
  { title: "WHAT IS P.A.C.T.", href: "#what-is-pact" },
  { title: "HOW IT WORKS", href: "#how-it-works" },
  { title: "TECHNOLOGY", href: "#technology" },
  { title: "IT'S IMPACT", href: "#its-impact" },
];

const labels = [
  { icon: Sparkles, label: "IP Registration" },
  { icon: Plug, label: "Programmable Licensing" },
  { icon: Activity, label: "Tamper-Proof Storage" },
];

export function MynaHero() {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible").then(r => console.log(r)).catch(e => console.error(e));
    }
  }, [controls, isInView]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const titleWords = [
    "THE",
    "AI",
    "REVOLUTION",
    "FOR",
    "LEGAL",
    "INTELLIGENCE",
  ];

  return (
    <div className="container mx-auto px-4 h-screen relative">
      <FallingPattern className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="relative z-10 h-full flex flex-col">
        <header>
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <img src={"logo.svg"} className="h-8 w-auto"/>
                {/*<span className="font-mono text-xl font-bold">P.A.C.T.</span>*/}
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="text-sm font-mono text-foreground hover:text-[#177BFE] transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            {/*<div className="flex items-center space-x-4">*/}
            {/*  <Button*/}
            {/*    variant="default"*/}
            {/*    className="rounded-none hidden md:inline-flex bg-[#177BFE] hover:bg-[#177BFE]/90 font-mono"*/}
            {/*  >*/}
            {/*    GET STARTED <ArrowRight className="ml-1 w-4 h-4" />*/}
            {/*  </Button>*/}
            {/*  <Sheet>*/}
            {/*    <SheetTrigger asChild>*/}
            {/*      <Button variant="ghost" size="icon" className="md:hidden">*/}
            {/*        <Menu className="h-5 w-5" />*/}
            {/*        <span className="sr-only">Toggle menu</span>*/}
            {/*      </Button>*/}
            {/*    </SheetTrigger>*/}
            {/*    <SheetContent>*/}
            {/*      <nav className="flex flex-col gap-6 mt-6">*/}
            {/*        {navigationItems.map((item) => (*/}
            {/*          <a*/}
            {/*            key={item.title}*/}
            {/*            href={item.href}*/}
            {/*            className="text-sm font-mono text-foreground hover:text-[#177BFE] transition-colors"*/}
            {/*          >*/}
            {/*            {item.title}*/}
            {/*          </a>*/}
            {/*        ))}*/}
            {/*        <Button className="cursor-pointer rounded-none bg-[#177BFE] hover:bg-[#177BFE]/90 font-mono">*/}
            {/*          GET STARTED <ArrowRight className="ml-1 w-4 h-4" />*/}
            {/*        </Button>*/}
            {/*      </nav>*/}
            {/*    </SheetContent>*/}
            {/*  </Sheet>*/}
            {/*</div>*/}
          </div>
        </header>

        <main className="flex-grow flex">
          <section className="container m-auto">
            <div className="flex flex-col items-center text-center">
              <motion.h1
                initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative font-mono text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight"
              >
                {titleWords.map((text, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.15, 
                      duration: 0.6 
                    }}
                    className="inline-block mx-2 md:mx-4"
                  >
                    {text}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mx-auto mt-8 max-w-2xl text-xl text-foreground font-mono"
              >
                We empower legal teams with multi-chain AI to transform
                documents into protected, programmable assets.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="mt-12 flex flex-wrap justify-center gap-6"
              >
                {labels.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 1.8 + (index * 0.15), 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }}
                    className="flex items-center gap-2 px-6"
                  >
                    <feature.icon className="h-5 w-5 text-[#177BFE]" />
                    <span className="text-sm font-mono">{feature.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 2.4, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                  <Link to="/dashboard">
                <Button
                  size="lg"
                  className="cursor-pointer rounded-none mt-12 bg-[#177BFE] hover:bg-[#177BFE]/90 font-mono"
                >
                  GET STARTED <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
                  </Link>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
