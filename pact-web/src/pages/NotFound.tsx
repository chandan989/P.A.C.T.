import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  // The useEffect for console logging is removed as it's not part of the UI redesign.

  return (
    <div className="container mx-auto px-4 h-screen relative">
      <FallingPattern className="absolute inset-0 w-full h-full [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="relative z-10 h-full flex flex-col">
        <header>
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <img src={"logo.svg"} className="h-8 w-auto"/>
              </div>
            </Link>
          </div>
        </header>

        <main className="flex-grow flex">
          <section className="container m-auto">
            <div className="flex flex-col items-center text-center">
              <motion.h1
                initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative font-mono text-6xl font-bold sm:text-7xl md:text-8xl lg:text-9xl max-w-4xl mx-auto leading-tight"
              >
                404
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mx-auto mt-8 max-w-2xl text-xl text-foreground font-mono"
              >
                Oops! The page you're looking for doesn't exist.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Link to="/">
                  <Button
                    size="lg"
                    className="cursor-pointer rounded-none mt-12 bg-[#177BFE] hover:bg-[#177BFE]/90 font-mono"
                  >
                    RETURN HOME <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
