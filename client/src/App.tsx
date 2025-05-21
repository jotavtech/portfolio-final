import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Universo from "@/pages/Universo";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import { AnimatePresence, motion } from "framer-motion";

// Use hash routing for GitHub Pages
const useHashLocation = () => {
  const [loc, setLoc] = React.useState(window.location.hash.slice(1) || "/");

  React.useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.slice(1) || "/";
      setLoc(hash);
    };

    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [loc, navigate] as const;
};

// Animated page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(10px)"
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MusicPlayerProvider>
          <Router hook={useHashLocation}>
            <Layout>
              <Toaster />
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  className="w-full"
                >
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/universo" component={Universo} />
                    <Route path="/jotaverso" component={Universo} />
                  </Switch>
                </motion.div>
              </AnimatePresence>
            </Layout>
          </Router>
        </MusicPlayerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;