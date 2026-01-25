import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const faqs = [
  {
    question: "How much do your services cost?",
    answer: "Pricing depends on the project size, scope, and complexity. We provide customized quotations after a brief consultation.",
  },
  {
    question: "Do you help in writing donor or bank proposals?",
    answer: "Yes, we prepare complete, fundable proposals and support clients through the submission process.",
  },
  {
    question: "Can you visit my farm physically?",
    answer: "Absolutely. We conduct on-site farm assessments to ensure accurate recommendations.",
  },
  {
    question: "Do you help with sourcing farm inputs and markets?",
    answer: "Yes, we link farmers to verified suppliers and market outlets.",
  },
];

export default function AccreditationsSection() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        pt: 0,
        pb: 0,
        position: "relative",
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        fontFamily: '"Open Sans", sans-serif',
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, sm: 0.75, md: 0.75 },
          mt: 0.75,
          mb: 0.75,
          borderRadius: { xs: 3, md: 4 },
          background: "#FFFFFF",
          border: "1px solid rgba(15, 189, 15, 0.15)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth={false} disableGutters sx={{ px: 0, width: "100%" }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{
              py: { xs: 3, md: 4 },
              px: 0,
              width: "100%",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, px: 2 }}>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#13ec13",
                  mb: 1.5,
                }}
              >
                Got Questions?
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  color: "#0d1b0d",
                  fontSize: { xs: "2.25rem", md: "3rem" },
                }}
              >
                Frequently Asked <span style={{ color: "#13ec13" }}>Questions</span>
              </Typography>
              <Box
                sx={{
                  width: 60,
                  height: 4,
                  bgcolor: "#13ec13",
                  mx: "auto",
                  borderRadius: 2,
                }}
              />
            </Box>

            {/* FAQ List */}
            <Box sx={{ width: "100%" }}>
                {faqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    elevation={0}
                    sx={{
                      mb: 2,
                      mx: 0.75,
                      width: "calc(100% - 12px)", // Accounts for mx: 0.75 (6px + 6px)
                      background: "#f8f9f8", // Subtle off-white background for distinction
                      border: "1px solid rgba(15, 189, 15, 0.2)", // More visible border
                      borderRadius: "16px !important",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)", // Subtle shadow for depth
                      "&::before": { display: "none" },
                      "&:hover": {
                        borderColor: "rgba(19, 236, 19, 0.4)",
                        bgcolor: "rgba(19, 236, 19, 0.05)",
                        boxShadow: "0 4px 12px rgba(19, 236, 19, 0.15)",
                        transform: "translateY(-2px)", // Slight lift on hover
                      },
                      ...(expanded === `panel${index}` && {
                        borderColor: "#13ec13",
                        bgcolor: "rgba(19, 236, 19, 0.08)",
                        boxShadow: "0 8px 25px rgba(19, 236, 19, 0.2)",
                      }),
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            color: expanded === `panel${index}` ? "#13ec13" : "#4c664c",
                          }}
                        />
                      }
                      sx={{
                        px: { xs: 2, md: 3 },
                        py: 1,
                        "& .MuiAccordionSummary-content": {
                          alignItems: "center",
                          gap: 2,
                        },
                      }}
                    >
                      <HelpOutlineIcon
                        sx={{
                          color: expanded === `panel${index}` ? "#13ec13" : "#13ec13",
                          fontSize: "1.5rem",
                          opacity: 0.8,
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1rem", md: "1.125rem" },
                          color: expanded === `panel${index}` ? "#0d1b0d" : "#4c664c",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        px: { xs: 2, md: 3 },
                        pb: 3,
                        pt: 0,
                        ml: { md: 5 }, // Align with text after icon
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#4c664c",
                          fontSize: "1.05rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
          </MotionBox>
        </Container>
      </Card>
    </Box>
  );
}
