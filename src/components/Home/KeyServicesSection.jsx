import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Fade,
  Grid,
} from "@mui/material";
import {
  Architecture,
  Description,
  Assessment,
  BugReport,
  QueryStats,
  Agriculture,
} from "@mui/icons-material";

const services = [
  {
    icon: Architecture,
    title: "Agricultural Project Design",
    description:
      "Innovative technical designs for modern, high-yield farming systems tailored to your local environment.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop",
  },
  {
    icon: Description,
    title: "Project Proposal Development",
    description:
      "Expertly crafted business plans and technical proposals designed to secure critical project funding and grants.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
  },
  {
    icon: Assessment,
    title: "Project Management & Monitoring",
    description:
      "End-to-end oversight, implementation support, and impact evaluation to ensure your farm projects stay on track.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
  },
  {
    icon: BugReport,
    title: "Black Soldier Fly (BSF) Production",
    description:
      "Sustainable circular economy solutions for organic waste management and low-cost animal protein production.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
  },
  {
    icon: QueryStats,
    title: "Market Research & Training",
    description:
      "In-depth market intelligence and professional capacity building to sharpen your competitive edge in the market.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    icon: Agriculture,
    title: "Sustainable Farming Solutions",
    description:
      "Comprehensive agricultural consulting and sustainable farming practices to maximize productivity while preserving environmental integrity.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=600&fit=crop",
  },
];

export default function KeyServicesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box
      sx={{
        pt: 0,
        pb: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        fontFamily: '"Open Sans", sans-serif',
      }}
    >
      <Card
        sx={{
          mx: 0.75,
          mt: 0.75,
          mb: 0.75,
          borderRadius: 3,
          border: "1px solid #cfe7cf",
          backgroundColor: "#f6f8f6",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "visible",
          "& .MuiCardContent-root": {
            overflow: "visible",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 1.5, sm: 1.5, md: 1.5 },
            pt: { xs: 0, sm: 0, md: 0 },
          }}
        >
          <Box
            sx={{
              pt: { xs: 2, md: 3 },
              pb: { xs: 1, sm: 1.5, md: 2 },
              px: { xs: 1.5, sm: 1.5, md: 1.5 },
            }}
          >
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                textAlign: "center",
                gap: 2, 
                mb: 3,
              }}
            >
              <Fade in={isVisible} timeout={1000}>
                <Box 
                  sx={{ 
                    maxWidth: "800px", 
                    width: "100%",
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 1.5,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "#13ec13",
                      mb: 0,
                    }}
                  >
                    Key Services
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                      fontWeight: 900,
                      color: "#0d1b0d",
                      lineHeight: 1.2,
                      mb: 0,
                    }}
                  >
                    Our Expertise
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      color: "#4c664c",
                      lineHeight: 1.7,
                      maxWidth: "700px",
                    }}
                  >
                    We provide specialized, data-driven solutions for agricultural transformation and business excellence across the entire value chain.
                  </Typography>
                </Box>
              </Fade>
            </Box>
          </Box>
        </Container>

        {/* Three Cards Row */}
        <Container
          maxWidth="xl"
          disableGutters
          sx={{
            px: { xs: 0.5, sm: 0.5, md: 0.5 },
            pt: { xs: 0, sm: 0, md: 0 },
            pb: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          <Grid
            container
            spacing={{ xs: 0.8, sm: 0.8, md: 0.8 }}
            justifyContent="center"
          >
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}
                    key={index}
                  >
                    <Fade in={isVisible} timeout={1000 + index * 100}>
                      <Card
                        sx={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 3,
                          border: "1px solid #cfe7cf",
                          backgroundColor: "#f6f8f6",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "rgba(19, 236, 19, 0.5)",
                            boxShadow: "0 20px 25px -5px rgba(19, 236, 19, 0.1)",
                          },
                        }}
                      >
                        {/* Image */}
                        <Box
                          sx={{
                            width: "100%",
                            aspectRatio: "4/3",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            component="img"
                            src={service.image}
                            alt={service.title}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 2,
                              backgroundColor: "rgba(19, 236, 19, 0.2)",
                              color: "#13ec13",
                              mb: 2,
                            }}
                          >
                            <IconComponent sx={{ fontSize: 26 }} />
                          </Box>
                          <Typography
                            variant="h3"
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              mb: 1.5,
                              color: "#0d1b0d",
                            }}
                          >
                            {service.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "#4c664c",
                              lineHeight: 1.75,
                            }}
                          >
                            {service.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </Card>
    </Box>
  );
}
