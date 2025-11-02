import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Shield,
  FileCheck,
  Bitcoin,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { MynaHero } from "@/components/ui/myna-hero";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FeatureCarousel } from "@/components/ui/animated-feature-carousel";
import { FallingPattern } from "@/components/ui/falling-pattern";
import FeatureSection from "@/components/ui/stack-feature-section";

const Landing = () => {
  const pillarsRef = useRef(null);
  const whatIsPactRef = useRef(null);
  const technologyRef = useRef(null);
  const impactRef = useRef(null);

  const pillarsInView = useInView(pillarsRef, { once: true, amount: 0.2 });
  const whatIsPactInView = useInView(whatIsPactRef, { once: true, amount: 0.2 });
  const technologyInView = useInView(technologyRef, { once: true, amount: 0.2 });
  const impactInView = useInView(impactRef, { once: true, amount: 0.2 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const pillarVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  const images = {
    alt: "Feature screenshot",
    step1img1:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1740&auto=format&fit=crop",
    step1img2:
      "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=1740&auto=format&fit=crop",
    step2img1:
      "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1661&auto=format&fit=crop",
    step2img2:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1674&auto=format&fit=crop",
    step3img:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1740&auto=format&fit=crop",
    step4img:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1742&auto=format&fit=crop",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <MynaHero />

      {/* WHAT IS P.A.C.T. Section */}
      <motion.section
        id="what-is-pact"
        ref={whatIsPactRef}
        initial="hidden"
        animate={whatIsPactInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="min-h-screen w-full flex items-center justify-center py-24 px-6 relative"
      >
        <FallingPattern className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="container max-w-7xl mx-auto relative z-10 text-center">
          <motion.h2
            className="text-4xl font-mono font-bold mb-8 uppercase tracking-wide"
          >
            WHAT IS P.A.C.T.
          </motion.h2>
          <motion.p
            className="text-xl text-foreground max-w-3xl mx-auto"
          >
            P.A.C.T. (Programmable Assets & Contractual Trust) is a revolutionary platform that leverages AI and blockchain technology to transform legal documents into secure, programmable, and verifiable digital assets. We empower legal professionals with tools to automate contract lifecycle management, ensure tamper-proof record-keeping, and facilitate global, transparent transactions.
          </motion.p>
        </div>
      </motion.section>

      {/* Four Pillars Section */}
      <section
        id="how-it-works"
        ref={pillarsRef}
        className="min-h-screen w-full flex items-center justify-center py-24 px-6 relative"
      >
        <FallingPattern className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="text-center text-4xl font-mono font-bold mb-16 uppercase tracking-wide"
          >
            How it Works
          </motion.h2>
          <FeatureCarousel image={images} />
        </div>
      </section>

      {/* TECHNOLOGY Section */}
      <motion.section
        id="technology"
        ref={technologyRef}
        initial="hidden"
        animate={technologyInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="min-h-screen w-full flex items-center justify-center py-24 px-6 relative"
      >
        <FallingPattern className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="container max-w-7xl mx-auto relative z-10 text-center">
          {/*<motion.h2*/}
          {/*  className="text-4xl font-mono font-bold mb-8 uppercase tracking-wide"*/}
          {/*>*/}
          {/*  TECHNOLOGY*/}
          {/*</motion.h2>*/}
          {/*<motion.p*/}
          {/*  className="text-xl text-foreground max-w-3xl mx-auto"*/}
          {/*>*/}
          {/*  P.A.C.T. is built on a robust stack of cutting-edge technologies. We utilize advanced AI for intelligent document analysis and generation, ensuring accuracy and efficiency. Our blockchain integration provides unparalleled security, transparency, and immutability for all legal assets. Smart contracts enable automated execution of agreements, reducing manual intervention and potential for disputes.*/}
          {/*</motion.p>*/}
          <FeatureSection />
        </div>
      </motion.section>

      {/* IT'S IMPACT Section (Combined) */}
      <motion.section
        id="its-impact"
        ref={impactRef}
        initial="hidden"
        animate={impactInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 relative"
      >
        <FallingPattern className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="container max-w-7xl mx-auto relative z-10 text-center mb-16">
          <motion.h2
            className="text-4xl font-mono font-bold mb-8 uppercase tracking-wide"
          >
            IT'S IMPACT
          </motion.h2>
          <motion.p
            className="text-xl text-foreground max-w-3xl mx-auto"
          >
            The impact of P.A.C.T. is transformative for the legal industry. We are streamlining legal operations, significantly reducing costs, and enhancing the security and trustworthiness of legal agreements. By enabling programmable legal assets, P.A.C.T. opens new avenues for innovation in legal tech, making legal services more accessible, efficient, and equitable globally.
          </motion.p>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="py-4 px-6 text-left font-bold uppercase text-sm tracking-wide">
                    Feature
                  </th>
                  <th className="py-4 px-6 text-center font-bold uppercase text-sm tracking-wide">
                    Traditional
                  </th>
                  <th className="py-4 px-6 text-center font-bold uppercase text-sm tracking-wide bg-bitcoin/5">
                    P.A.C.T.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 font-medium">Cost per Document</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">
                    $500 - $5,000
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-bitcoin bg-bitcoin/5">
                    $0.001
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 font-medium">Generation Time</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">
                    Days - Weeks
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-bitcoin bg-bitcoin/5">
                    30 Seconds
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 font-medium">IP Protection</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-destructive mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-bitcoin/5">
                    <Check className="h-5 w-5 text-constellation mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 font-medium">
                    Evidence Validation
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-destructive mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-bitcoin/5">
                    <Check className="h-5 w-5 text-constellation mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 font-medium">Global Payments</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-destructive mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center bg-bitcoin/5">
                    <Check className="h-5 w-5 text-constellation mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* CTA Footer */}
      <section className="py-24 px-6 text-black relative">
        <FallingPattern className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-5xl font-display font-bold mb-6 uppercase tracking-wide">
            Start Building the Future
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join the revolution in legal technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bitcoin"
            />
            <Button variant="bitcoin" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
