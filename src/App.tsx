import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CreatorHub from "./pages/CreatorHub";
import Feed from "./pages/Feed";
import Discover from "./pages/Discover";
import Network from "./pages/Network";
import Settings from "./pages/Settings";
import PortfolioStudio from "./pages/PortfolioStudio";
import AgencyMatch from "./pages/AgencyMatch";
import ModelProfile from "./pages/ModelProfile";
import AgencyProfile from "./pages/AgencyProfile";
import BrandProfile from "./pages/BrandProfile";
import Linda from "./pages/Linda";
import { QuickSettingsPanel } from "./components/QuickSettingsPanel";
import { PageTransition } from "./components/PageTransition";
import { FloatingCustomizationToolkit } from "./components/FloatingCustomizationToolkit";

function App() {
  const location = useLocation();

  return (
    <>
      <QuickSettingsPanel />
      <FloatingCustomizationToolkit />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Creator Hub - Main landing page */}
          <Route
            path="/"
            element={
              <PageTransition>
                <CreatorHub />
              </PageTransition>
            }
          />

          {/* Social/Networking */}
          <Route
            path="/feed"
            element={
              <PageTransition>
                <Feed />
              </PageTransition>
            }
          />
          <Route
            path="/discover"
            element={
              <PageTransition>
                <Discover />
              </PageTransition>
            }
          />
          <Route
            path="/network"
            element={
              <PageTransition>
                <Network />
              </PageTransition>
            }
          />

          {/* Settings & Studio */}
          <Route
            path="/settings"
            element={
              <PageTransition>
                <Settings />
              </PageTransition>
            }
          />
          <Route
            path="/portfolio-studio"
            element={
              <PageTransition>
                <PortfolioStudio />
              </PageTransition>
            }
          />
          <Route
            path="/agency-match"
            element={
              <PageTransition>
                <AgencyMatch />
              </PageTransition>
            }
          />
          <Route
            path="/linda"
            element={
              <PageTransition>
                <Linda />
              </PageTransition>
            }
          />

          {/* Client-facing profiles */}
          <Route
            path="/models/:slug"
            element={
              <PageTransition>
                <ModelProfile />
              </PageTransition>
            }
          />
          <Route
            path="/agencies/:slug"
            element={
              <PageTransition>
                <AgencyProfile />
              </PageTransition>
            }
          />
          <Route
            path="/brands/:slug"
            element={
              <PageTransition>
                <BrandProfile />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
