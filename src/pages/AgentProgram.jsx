import React, { useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  Link,
} from "@mui/material";
import {
  Architecture,
  Description,
  BugReport,
  SmartToy,
  QueryStats,
  LocalShipping,
  School,
  Nature,
  Payments,
  FactCheck,
  ArrowForward,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const services = [
  {
    icon: Architecture,
    title: "Project Design & Management",
    description: "Expert planning and end-to-end execution for large-scale agricultural projects and rural development.",
    badge: null,
  },
  {
    icon: Description,
    title: "Proposal Development",
    description: "Professional grant proposals and business plans tailored to secure funding and drive enterprise growth.",
    badge: null,
  },
  {
    icon: BugReport,
    title: "BSF Production",
    description: "Sustainable protein production through innovative Black Soldier Fly technology for animal feed systems.",
    badge: { label: "Specialized", color: "primary" },
  },
  {
    icon: SmartToy,
    title: "Digital Farm Solutions",
    description: "Cutting-edge digital tools and IoT for precision farming, real-time monitoring, and data management.",
    badge: { label: "Innovative", color: "info" },
  },
  {
    icon: QueryStats,
    title: "Market Research",
    description: "Comprehensive analysis of local and global agricultural markets to identify opportunities and risks.",
    badge: null,
  },
  {
    icon: LocalShipping,
    title: "Supply Chain Optimization",
    description: "Streamlining logistics from the farm gate to the consumer, reducing waste and increasing profitability.",
    badge: null,
  },
  {
    icon: School,
    title: "Agricultural Training",
    description: "Building human capacity through hands-on technical training sessions and workshops for farmers.",
    badge: null,
  },
  {
    icon: Nature,
    title: "Sustainability Consulting",
    description: "Implementing regenerative and eco-friendly practices to ensure long-term environmental viability.",
    badge: null,
  },
  {
    icon: Payments,
    title: "Investment Advisory",
    description: "Strategic financial advice and due diligence for agribusiness investors looking to enter emerging markets.",
    badge: null,
  },
  {
    icon: FactCheck,
    title: "Feasibility Studies",
    description: "Detailed analysis of technical and economic viability to de-risk your agricultural ventures.",
    badge: null,
  },
];

export default function AgentProgram() {
  // Detect when hero section is visible and notify header (similar to HeroSection)
  useEffect(() => {
    const heroSection = document.getElementById("services-hero-section");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.2;
          const scrollY = window.scrollY;
          const isAtTop = scrollY <= 20;
          
          // Dispatch custom event to notify header
          const event = new CustomEvent('heroVisibilityChange', {
            detail: {
              isVisible: isVisible && isAtTop,
              intersectionRatio: entry.intersectionRatio,
              scrollY: scrollY
            }
          });
          window.dispatchEvent(event);
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0],
        rootMargin: '0px'
      }
    );

    observer.observe(heroSection);

    // Check initial state
    setTimeout(() => {
      const rect = heroSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      const isAtTop = window.scrollY <= 20;
      const event = new CustomEvent('heroVisibilityChange', {
        detail: {
          isVisible: isInView && isAtTop,
          intersectionRatio: isInView ? 1 : 0,
          scrollY: window.scrollY
        }
      });
      window.dispatchEvent(event);
    }, 200);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      sx={{
        pb: 1.5,
        px: 0,
        bgcolor: "#f6f8f6",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <Box
        id="services-hero-section"
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: { xs: 400, md: 500 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: { xs: "-80px", md: "-80px" }, // Pull up behind header like HeroSection
          backgroundImage: `linear-gradient(rgba(13, 27, 13, 0.7), rgba(13, 27, 13, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYeftyIrBBJultBqFUAcIUBu4NeTHkOSFZ4beq50-nmWPotlFGovBAkZIEPfo2kXRnxSEqGQXlEl1duIKl4PmnQ4XbdF-Ho6VSJsDsBSmjUyYPEKklFFbPlKPl9vmjiHnOREyhGm1-QC3h3mYB2OzEQizTK_lit0-oA4DRytV7FXoRSAqQ8OU0nCXNVxkWbxlNIJSLGdwqA6UuYxbX5nLV1EiMaKPludPiJfRRenB0t3h5ob3sTxl_3Cyt5JQwKWI_CZZqCNBM0Y7l")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 900,
              mb: 2,
              maxWidth: "900px",
              mx: "auto",
              lineHeight: 1.2,
            }}
          >
            MK Agribusiness Consultants Services Overview
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: "700px",
              mx: "auto",
              mb: 4,
            }}
          >
            Empowering agricultural enterprises with expert design, innovation, and sustainable solutions for a thriving future.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0fbd0f",
              color: "white",
              fontSize: "1rem",
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: 4,
              "&:hover": {
                bgcolor: "#0da50d",
                boxShadow: 6,
              },
              "&:focus": {
                outline: "none",
                boxShadow: 4,
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: 4,
              },
            }}
          >
            Explore Offerings
          </Button>
        </Container>
      </Box>

      {/* Section Header */}
      <Box sx={{ px: { xs: 1.5, md: 5 }, pb: 2 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              fontWeight: 700,
              color: "#0d1b0d",
              mb: 1,
            }}
          >
            Our Core Offerings
          </Typography>
          <Box
            sx={{
              height: 4,
              width: 80,
              bgcolor: "#0fbd0f",
              borderRadius: "9999px",
            }}
          />
        </Container>
      </Box>

      {/* Services Grid */}
      <Box sx={{ px: { xs: 1.5, md: 5 }, pb: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Grid item xs={12} sm={6} lg={3} xl={3} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      p: 3,
                      borderRadius: 3,
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      boxShadow: 1,
                      transition: "all 0.3s ease",
                      position: "relative",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    {service.badge && (
                      <Chip
                        label={service.badge.label}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          height: 20,
                          bgcolor: service.badge.color === "info" ? "#1976d2" : "#0fbd0f",
                          color: "white",
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "rgba(15, 189, 15, 0.1)",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0fbd0f",
                        mb: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#0fbd0f",
                          color: "white",
                        },
                      }}
                    >
                      <IconComponent sx={{ fontSize: 30 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        color: "#0d1b0d",
                        fontSize: { xs: "1rem", md: "1.125rem" },
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(0, 0, 0, 0.6)",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        mb: 2,
                        flex: 1,
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Link
                      href="#"
                      sx={{
                        color: "#0fbd0f",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Learn More <ArrowForward sx={{ fontSize: 16 }} />
                    </Link>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          px: { xs: 1.5, md: 5 },
          py: 4,
          bgcolor: "white",
        }}
      >
        <Container maxWidth="lg">
          <Paper
            sx={{
              bgcolor: "rgba(15, 189, 15, 0.05)",
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              border: "1px solid rgba(15, 189, 15, 0.2)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                fontWeight: 900,
                color: "#0d1b0d",
                mb: 3,
              }}
            >
              Ready to transform your agribusiness?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                color: "rgba(0, 0, 0, 0.6)",
                maxWidth: "700px",
                mx: "auto",
                mb: 4,
              }}
            >
              Partner with MK Agribusiness Consultants to drive innovation, efficiency, and sustainability in your operations. Our team is ready to scale your impact.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#0fbd0f",
                  color: "white",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: 4,
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    bgcolor: "#0da50d",
                    boxShadow: 6,
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#0fbd0f",
                  borderWidth: 2,
                  color: "#0fbd0f",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    borderColor: "#0fbd0f",
                    borderWidth: 2,
                    bgcolor: "#0fbd0f",
                    color: "white",
                  },
                }}
              >
                Contact Sales
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

    </Box>
  );
}

