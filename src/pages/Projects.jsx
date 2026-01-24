import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Paper,
  Stack,
} from "@mui/material";
import {
  TrendingUp,
  Groups,
  KeyboardDoubleArrowUp,
  LocationOn,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const stats = [
  { label: "Total Projects", value: "45+", change: "+15% this year", icon: <TrendingUp fontSize="small" /> },
  { label: "Farmers Trained", value: "1,200+", change: "+20% impact", icon: <Groups fontSize="small" /> },
  { label: "Average ROI Increase", value: "35%", change: "High Efficiency", icon: <KeyboardDoubleArrowUp fontSize="small" /> },
];

const categories = [
  "All Projects",
  "Waste Management",
  "Dairy Value Chain",
  "Ag-Tech",
  "Irrigation",
];

const projects = [
  {
    id: 1,
    title: "BSF Unit Design - Kiambu",
    location: "Kiambu County, Kenya",
    description: "Implementation of Black Soldier Fly units for sustainable protein production from organic waste.",
    tags: ["5-ton production", "Zero Waste"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoP_IBYmdTueJfsPjFhMH8NtB0Uh1aRNyRoVAHyLrukWfjNkKin2uDT0mhQW4mLhxEaZlZxj4ZYucHFwdd5-IpynArcuAci9QVQTdLFtxqQHjR27qHhf0jM0cxQVtxZeR5WJ5pFvk2mu866HaQ9nd1DGwL-iTfDvCHWcVteossiYgtGgc4AlyD_rSPpkM_CyMxAL693XA_Wk9xU5VzcS3y77sVTeKZk2pi89zumfUEcdhgV_N7NGf29WI3F3x0MDx7u2jIhzTk7mJo",
  },
  {
    id: 2,
    title: "Dairy Value Chain Study",
    location: "Central Province",
    description: "Comprehensive market efficiency study and hands-on training for cooperatives to optimize milk collection.",
    tags: ["120+ Farmers Trained", "+25% Milk Yield"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6gAVHpOl8XLRI1NdAlCmbNte0t9u2SS3j0mlBW1dgw4NbcN73loDpllImFLjy_XITqqQA_o-OFzGf7dwkES8QN9X8XE47t1toXBZAfHLfZHHdqDgXzlkRQ9ocvHBNPEJ1Ec-3jtIHuNuaJepAxdaO5APCih6XkjGGj1kPxh_PZJ2oWH3gRj7a-I-OOi8ZIOAQXjH4zwo_DP4OX4gHALGuD0BPZUK9kBOdK057Oisopht-OxEgPUliCBee-UieeEuZs-QqlWD933Rc",
  },
  {
    id: 3,
    title: "Irrigation Expansion",
    location: "Rift Valley Region",
    description: "Infrastructure development using smart solar irrigation resulting in significant year-round crop stability.",
    tags: ["40% Yield Increase", "Water Savvy"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1noHdkuUXFID-OwkBvMiBstb1pnqgcu6uS4BwKRqVMV8F6BQlFOtJdje0HxTVuISn0Gz-a8lGAgYA5hv52TNzatKWlw5ol-j22ortyTSqlRd3eG5sBzzjEAhk5F3lqzSMl7jlumMHeyotxLfO9HC2vVQp3MDMtHQwyWCs3-Qgp58jrJROoVoCoQqvR0XjeKV5dgaLVJp5UsRuuqo-a8hLMFK77vWJvtcMf1akSQDLyuOiZEPGcsTfmtsEj88oyZ1MFQVzEMCGWMPS",
  },
  {
    id: 4,
    title: "Hydroponic Prototype",
    location: "Nairobi Innovation Hub",
    description: "Developing low-cost vertical farming prototypes for urban centers to tackle food insecurity.",
    tags: ["Low Capital", "High Density"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD37_pHJ7e_TCaZV8BZ5ImkiJtiROuFisWxmRaH_G2y6DHmvXet0hT0K8BGOsoOfL_p75YQnqX7uswUZA4_09uLysAYwUYnepNLSVgdKhU9gDUqS3_JyrVr_UiPcy0aHt95Bp4xq0eYc2RLldShmiDUqynfYGXC5qq7lIO2-f-uGd_x98C0q7pxvhU_M4v7ra3hk2YqzkedotTKtk1hJFfZ36Hppe-JySNr2IdXk-5q_4fuNC-Ym-TZimYEaDq6YfWEdzz9Uwty4rCZ",
  },
  {
    id: 5,
    title: "Cold Chain Logistics",
    location: "Mombasa Port Zone",
    description: "Optimizing post-harvest handling for avocado exports to European markets reducing transit loss.",
    tags: ["30% Waste Reduction", "Export Ready"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByrB-V25kF4rJhL5VBZP2fGreKr382xkGAagF9oz3CLiiyx_HqYBqhcTrLF5eGxpkkkh-kJeeKzbSYAjZx97jBt4cs71JUl_xcBJfUeOJmZeonDj35CQ5c9XlmimyApeVNoFMUgVBmJVzlAWCKYcMnT3qn6i6SNowqqnbHHHGFlSVU_h6KmMQMwd_uIRUSTM5_2hrgQhNpZ7FufJXjRgwH_zBlPS73_rsZDIBawDplB7FCkLvSS5izTY_u5IKOUjpfr9gEdPZP-t2b",
  },
  {
    id: 6,
    title: "Soil Health Program",
    location: "Mount Kenya Region",
    description: "Systematic soil analysis and customized organic fertilization plans for 500+ smallholder farmers.",
    tags: ["Eco-Certified", "Long-term Health"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDITJhGx6vRA0BOEc0racv1g6RqqK2OFXmR0oDYUZloShdWhvHV41DTlfUKw4fxz-hIXevdUeaqYNctgPCbgDFDKCCPC5fsUD_D7aHDPj85lhnjETe_hw-70BixyYzO4gnzNsg-gfjTe5vgZ9ANLaRRZBMdkX8YmHGW-I4_i7lDwLPCJJL0TSggOSA15qzBwrLIOhekbDNqdwPL4ecGRNJmfeg8pJwgNIfda9fq1jspfaJKqIqAXYza0Y17Cjvye4ItKRB8CTfk6Lfa",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  return (
    <Box sx={{ bgcolor: "#f6f8f6", minHeight: "100vh", pt: { xs: 4, md: 8 }, pb: 10 }}>
      <Container maxWidth="xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <Box sx={{ mb: 8 }}>
            <Chip
              label="Our Portfolio"
              sx={{
                bgcolor: "rgba(15, 189, 15, 0.1)",
                color: "#0fbd0f",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                mb: 3,
                fontSize: "0.75rem",
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: 900,
                color: "#0d1b0d",
                mb: 3,
                lineHeight: 1.1,
              }}
            >
              Our Impact
            </Typography>
            <Typography
              sx={{
                fontSize: "1.125rem",
                color: "rgba(0,0,0,0.6)",
                maxWidth: "800px",
                lineHeight: 1.6,
              }}
            >
              Transforming agricultural challenges into sustainable, profitable realities across East Africa through expert consulting and innovation. Discover how we help farmers and investors scale.
            </Typography>

            {/* Stats */}
            <Grid container spacing={3} sx={{ mt: 6 }}>
              {stats.map((stat, idx) => (
                <Grid item xs={12} sm={4} key={idx}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: "1px solid rgba(15, 189, 15, 0.1)",
                      background: "#FFFFFF",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 12px 40px rgba(0,0,0,0.04)",
                        borderColor: "rgba(15, 189, 15, 0.3)",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "rgba(0,0,0,0.5)", fontWeight: 700, mb: 1 }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 900, color: "#0d1b0d", mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#0fbd0f" }}>
                      {stat.icon}
                      <Typography variant="caption" sx={{ fontWeight: 800 }}>
                        {stat.change}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Filters */}
          <Box sx={{ mb: 6, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                sx={{
                  bgcolor: activeCategory === category ? "#0fbd0f" : "white",
                  color: activeCategory === category ? "white" : "rgba(0,0,0,0.6)",
                  px: 3,
                  py: 1,
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  textTransform: "none",
                  border: activeCategory === category ? "none" : "1px solid rgba(0,0,0,0.1)",
                  boxShadow: activeCategory === category ? "0 4px 12px rgba(15, 189, 15, 0.2)" : "none",
                  "&:hover": {
                    bgcolor: activeCategory === category ? "#0da50d" : "rgba(15, 189, 15, 0.05)",
                    borderColor: "#0fbd0f",
                  },
                  "&:focus": { outline: "none" },
                }}
              >
                {category}
              </Button>
            ))}
          </Box>

          {/* Grid */}
          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    border: "1px solid rgba(15, 189, 15, 0.1)",
                    boxShadow: "none",
                    overflow: "hidden",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                      "& .MuiCardMedia-root": { transform: "scale(1.1)" },
                    },
                  }}
                >
                  <Box sx={{ overflow: "hidden", aspectRatio: "16/10" }}>
                    <CardMedia
                      component="img"
                      image={project.image}
                      sx={{ transition: "transform 0.6s ease" }}
                    />
                  </Box>
                  <CardContent sx={{ p: 4, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#0fbd0f", mb: 2 }}>
                      <LocationOn sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 800, textTransform: "uppercase" }}>
                        {project.location}
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#0d1b0d" }}>
                      {project.title}
                    </Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.6)", mb: 4, fontSize: "0.95rem", lineHeight: 1.6, flex: 1 }}>
                      {project.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ pt: 3, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: "rgba(15, 189, 15, 0.05)",
                            color: "#0fbd0f",
                            fontWeight: 700,
                            borderRadius: 2,
                            fontSize: "0.7rem",
                          }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          mt: 12,
          bgcolor: "#0d1b0d",
          py: { xs: 8, md: 12 },
          textAlign: "center",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
            Have a project in mind?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 6, fontSize: "1.125rem" }}>
            Let's discuss how we can partner to bring innovation, sustainability, and increased profitability to your agricultural venture.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0fbd0f",
                color: "white",
                px: 6,
                py: 2,
                borderRadius: 3,
                fontWeight: 800,
                fontSize: "1.1rem",
                textTransform: "none",
                "&:hover": { bgcolor: "#0da50d" },
                "&:focus": { outline: "none" },
              }}
            >
              Get in Touch
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "white",
                px: 6,
                py: 2,
                borderRadius: 3,
                fontWeight: 800,
                fontSize: "1.1rem",
                textTransform: "none",
                backdropFilter: "blur(10px)",
                "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                "&:focus": { outline: "none" },
              }}
            >
              Download Brochure
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
