import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/Home/HeroSection";
import KeyServicesSection from "../components/Home/KeyServicesSection";
import CTASection from "../components/Home/CTASection";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeroSection />
      <KeyServicesSection />
      <CTASection />
      <Footer />
    </Box>
  );
}
