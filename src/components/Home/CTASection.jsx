import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button, Fade } from "@mui/material";

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 3, md: 5 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: "#0d1b0d",
            p: { xs: 5, md: 10 },
            "&::before": {
              content: '""',
              position: "absolute",
              right: 0,
              top: 0,
              width: "33.333333%",
              height: "100%",
              background: "linear-gradient(to left, rgba(19, 236, 19, 0.2), transparent)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 4,
            }}
          >
            <Fade in={isVisible} timeout={1000}>
              <Box sx={{ maxWidth: "672px", display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.875rem", md: "3rem" },
                    fontWeight: 900,
                    color: "white",
                  }}
                >
                  Ready to Transform Your Farm?
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    lineHeight: 1.6,
                  }}
                >
                  Connect with our specialists today to take your agribusiness to the next level of profitability and sustainability.
                </Typography>
              </Box>
            </Fade>
            <Fade in={isVisible} timeout={1200}>
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "200px",
                    py: 2,
                    px: 5,
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    borderRadius: 2,
                    backgroundColor: "#13ec13",
                    color: "#0d1b0d",
                    textTransform: "none",
                    boxShadow: "0 10px 15px -3px rgba(19, 236, 19, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 20px 25px -5px rgba(19, 236, 19, 0.3)",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                >
                  Contact Us Now
                </Button>
              </Box>
            </Fade>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
