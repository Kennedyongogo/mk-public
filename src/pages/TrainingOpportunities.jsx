import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Link,
} from "@mui/material";
import {
  Search,
  ExpandMore,
  LocationOn,
  CalendarToday,
  Payment,
  Event as EventIcon,
} from "@mui/icons-material";

const PRIMARY = "#17cf54";
const BG_LIGHT = "#f6f8f6";
const BORDER_LIGHT = "#d0e7d7";
const TEXT_MUTED = "#4e9767";
const AMBER = "#f59e0b";

const workshops = [
  {
    id: 1,
    title: "Climate-Resilient Maize Farming",
    description:
      "Learn advanced techniques for sustainable yield in changing climates and pest management strategies.",
    date: "Oct 12, 2023",
    location: "Nakuru, Kenya",
    type: "Workshop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIzy7nIH1r-S6QWc10jHymZCd593ESXbyg5_70diF9sp33bK5s3ySLpaxjPqlHuBqh6Qvx8wPpQiMBW3m0K8xfdy9VOpyCXy9TyE25pE93EYLBAQ9ZTPpJCbkXK8lPEQbyObu86AfkeeUq90YaCLFSWGV6Tf-G2neBU32SN1izuiUclG7LU6bzZfOAZd4dNVWDmnqpgPIoNm390FFNhbor0JOjdOZd3SGSFCmoA0Bf6r4rMFVyBY5QjQoD6eYjfwvW407mLJjgI68k",
  },
  {
    id: 2,
    title: "Hydroponic Systems Setup",
    description:
      "A hands-on professional guide to building soil-less systems for urban commercial vegetable production.",
    date: "Oct 15, 2023",
    location: "Nairobi, Kenya",
    type: "Training",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBtbniDTZgcXbxKOxioHhMpoqYpIy-omFRbDE60b90w3ay4wt6IerY0LLdhsSUgpxUzYOYT0zs70deUKGvyIIEUoWengNbEenLniX3YNK6wxD4kPm8MjE3an_sCUWIx9b5Cbqe02H8OOndavmqqExUvVRdY2XQUp2FgoYFcmnSUozJSfRzH_qBOdVakgYEiRMFHW9SPD2N7z1Ib1QB-QYJrfQNmoniMpPCMo5ZGXmGpB06RS2hTqGGPMo13pKaCKTfsUvgs5paGrAx6",
  },
  {
    id: 3,
    title: "Post-Harvest Management",
    description:
      "Minimize losses and maximize profit margins by learning modern storage and cold-chain logistics.",
    date: "Oct 20, 2023",
    location: "Eldoret, Kenya",
    type: "Workshop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqqc7CRMlhFi1XFRb0O00nge-xu3_xPjjoVmbCDtGEMBYDuqqy_Z1Dfg-iDJuXkjPYLy2P2tuOmBjyfsPPnehZATo-aDI8U_IVjq0zqTl-cNDDn5RDpOBdPU-WBAipD6W-Ek72AtE8XtfY8niph9UM4cix47rVP3dzHeESDASCLGAdU9epYuenoYTGXWEE3YCGGfuEhKnO1ywc7u3rCC3E7f0vkMm7JouqpXu5Mn907NFGT1PL1_xmaoQsk1-aGsKSjHwrHlqIuDYy",
  },
];

const grants = [
  {
    id: 1,
    title: "Smallholder Innovation Grant",
    badge: "Funding",
    description:
      "Direct financial support for farmers implementing solar-powered irrigation or sustainable tech solutions.",
    amount: "Up to $10,000",
    deadline: "Deadline: Dec 1, 2023",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoOGKXdBSQZag3UTOCktlg8rpMF3Y5bP33GkqbQR416Dijr4CM0Nvmsak_uZ8AGCg6ioBoEijWAmd83TnsV1KqSktPZk28-lRHwOQj9OtdXV2jNq0kR9jQ9ZGfRdbLuDC7kAD-qN1tecw-BapCOB_ku1t0RUC8etato7tLgAxgG49mdiYnemyF6j2RizqEkpc5gB03mG9qyzNSg5F1PVrMy1Vig-Qpa94sSEPGRLUQEm4InH1xhoGLM4zF9YF4AGTkKaUmeYu4C04x",
  },
  {
    id: 2,
    title: "Women in Agribusiness Fund",
    badge: "Grant",
    description:
      "Equity-free funding for women-led agribusinesses focusing on value addition and regional exports.",
    amount: "Flexible Grants",
    deadline: "Open Rolling Basis",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsaNUDjMwQhoeQhQb1suShZgGVwOT83GJ8BQMQcMM9WFrk57qsNyYXdOv08Y1iOWosvPvFx8F3Uz7NLjIN8gsvyaHxOEdmQuympVzfSbqBJ1ZvhztX8OKhEu8qfQybH23_HhqqCMYScbDyj-ZHcPNqOYxqVamlmL5pwO_-57HiliUYsbGS9l1tJGkTiVzKbJe8nXSL6CT2V178rE_oGTcERxYbYw68UaxH8-4umW64EylXa8bapRmr3p6fHPfyULBZLsaNfcV5EaOh",
  },
];

const partners = [
  { initial: "K", name: "KALRO" },
  { initial: "I", name: "ILRI" },
  { initial: "F", name: "FAO" },
  { initial: "M", name: "MoALF" },
];

export default function TrainingOpportunities() {
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BG_LIGHT, color: "#0e1b12", py: 5, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        {/* Header */}
        <Box component="header" sx={{ mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: "-0.033em",
              color: "text.primary",
              fontSize: { xs: "2rem", md: "2.75rem" },
            }}
          >
            Training, Events & Opportunities
          </Typography>
          <Typography
            sx={{
              color: TEXT_MUTED,
              fontSize: "1.125rem",
              mt: 1.5,
              maxWidth: 672,
            }}
          >
            Stay informed about workshops, field days, funding, and agribusiness jobs to grow your agricultural enterprise.
          </Typography>
        </Box>

        {/* Search & Filters */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 6 }}>
          <TextField
            fullWidth
            placeholder="Search trainings, events, or opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: TEXT_MUTED }} />
                </InputAdornment>
              ),
              sx: {
                height: 56,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                "& fieldset": { border: "1px solid", borderColor: "divider" },
              },
            }}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                mr: 0.5,
              }}
            >
              Filter by:
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => setFilterActive("all")}
              sx={{
                borderRadius: "9999px",
                px: 2.5,
                py: 1.25,
                fontWeight: 500,
                bgcolor: filterActive === "all" ? PRIMARY : "transparent",
                color: filterActive === "all" ? "#fff" : "text.primary",
                boxShadow: filterActive === "all" ? 1 : 0,
                "&:hover": { bgcolor: filterActive === "all" ? PRIMARY : "action.hover" },
              }}
            >
              All Categories
            </Button>
            {["Training", "Workshop", "Funding"].map((label) => (
              <Button
                key={label}
                variant="outlined"
                size="small"
                endIcon={<ExpandMore sx={{ color: "grey.400" }} />}
                onClick={() => setFilterActive(label.toLowerCase())}
                sx={{
                  borderRadius: "9999px",
                  borderColor: "divider",
                  color: "text.primary",
                  textTransform: "none",
                  fontWeight: 500,
                  px: 2.5,
                  py: 1.25,
                  "&:hover": { borderColor: PRIMARY, bgcolor: "action.hover" },
                }}
              >
                {label}
              </Button>
            ))}
            <Button
              variant="outlined"
              size="small"
              startIcon={<LocationOn sx={{ color: "grey.400" }} />}
              sx={{
                borderRadius: "9999px",
                borderColor: "divider",
                color: "text.primary",
                textTransform: "none",
                fontWeight: 500,
                px: 2.5,
                py: 1.25,
                "&:hover": { borderColor: PRIMARY },
              }}
            >
              Location
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CalendarToday sx={{ color: "grey.400" }} />}
              sx={{
                borderRadius: "9999px",
                borderColor: "divider",
                color: "text.primary",
                textTransform: "none",
                fontWeight: 500,
                px: 2.5,
                py: 1.25,
                "&:hover": { borderColor: PRIMARY },
              }}
            >
              Date
            </Button>
          </Box>
        </Box>

        {/* Upcoming Workshops & Training */}
        <Box component="section" sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "divider",
              pb: 2,
              mb: 3,
            }}
          >
            <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: "-0.01em" }}>
              Upcoming Workshops & Training
            </Typography>
            <Link href="#" underline="hover" sx={{ color: PRIMARY, fontWeight: 600, fontSize: "0.875rem" }}>
              View all
            </Link>
          </Box>
          <Grid container spacing={3}>
            {workshops.map((item) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={item.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": { boxShadow: 4 },
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <Box sx={{ position: "relative", aspectRatio: "16/10" }}>
                    <CardMedia
                      component="div"
                      image={item.image}
                      sx={{ height: "100%", backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                    <Chip
                      label={item.type}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        bgcolor: PRIMARY,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.6875rem",
                        letterSpacing: "0.05em",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1, lineHeight: 1.3 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}
                    >
                      {item.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16, color: PRIMARY }} />
                        <span>{item.date}</span>
                      </Box>
                      <span>•</span>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 16, color: PRIMARY }} />
                        <span>{item.location}</span>
                      </Box>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      disableRipple
                      sx={{
                        mt: "auto",
                        py: 1.5,
                        fontWeight: 700,
                        bgcolor: PRIMARY,
                        "&:hover": { bgcolor: `${PRIMARY}E6` },
                        "&:focus": { outline: "none" },
                      }}
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Funding & Grants */}
        <Box component="section" sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "divider",
              pb: 2,
              mb: 3,
            }}
          >
            <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: "-0.01em" }}>
              Funding & Grants
            </Typography>
            <Link href="#" underline="hover" sx={{ color: PRIMARY, fontWeight: 600, fontSize: "0.875rem" }}>
              View all
            </Link>
          </Box>
          <Grid container spacing={3}>
            {grants.map((item) => (
              <Grid size={{ xs: 12, md: 6 }} key={item.id}>
                <Card
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": { boxShadow: 4 },
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "33.333%" },
                      minHeight: { xs: 160, sm: "auto" },
                      display: { xs: "block", sm: "block" },
                    }}
                  >
                    <CardMedia
                      component="div"
                      image={item.image}
                      sx={{
                        height: { xs: 160, sm: "100%" },
                        minHeight: { sm: 200 },
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                        {item.title}
                      </Typography>
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          bgcolor: AMBER,
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.625rem",
                          letterSpacing: "0.1em",
                          height: 22,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Payment sx={{ fontSize: 18, color: AMBER }} />
                        <span>{item.amount}</span>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <EventIcon sx={{ fontSize: 18, color: AMBER }} />
                        <span>{item.deadline}</span>
                      </Box>
                    </Box>
                    <Button
                      fullWidth
                      variant="outlined"
                      disableRipple
                      sx={{
                        mt: "auto",
                        py: 1.25,
                        fontWeight: 700,
                        borderWidth: 2,
                        borderColor: PRIMARY,
                        color: PRIMARY,
                        "&:hover": { borderWidth: 2, borderColor: PRIMARY, bgcolor: PRIMARY, color: "#fff" },
                        "&:focus": { outline: "none" },
                      }}
                    >
                      Apply for Funding
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Partners */}
        <Box
          component="section"
          sx={{
            py: 5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              mb: 4,
            }}
          >
            In Collaboration With
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              opacity: 0.7,
              "&:hover": { opacity: 1 },
              transition: "opacity 0.2s ease",
            }}
          >
            {partners.map((p) => (
              <Box
                key={p.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "grey.300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "grey.600",
                  }}
                >
                  {p.initial}
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "text.secondary" }}>
                  {p.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
