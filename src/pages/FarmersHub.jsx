import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  InputAdornment,
  TextField,
  Chip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Search,
  ExpandMore,
  Verified,
  LocationOn,
  Chat,
} from "@mui/icons-material";

const PRIMARY = "#17cf54";
const BG_LIGHT = "#f6f8f6";
const BORDER_LIGHT = "#d0e7d7";
const INPUT_BG = "#e7f3eb";
const TEXT_MUTED = "#4e9767";

const farmers = [
  {
    id: 1,
    name: "Green Valley Organics",
    location: "Nairobi, Kenya",
    farmType: "Organic",
    availability: "AVAILABLE",
    availabilityColor: "success",
    tags: ["Maize", "Poultry", "Vegetables"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLeFgfyrPtUg71FmUtIL3JKVOluJiEKSdnKQRMHflqSOE68GMGmMU5u9rChj1Lyt3Vwk76kBEHoxSOwv2LGGJx5x0N-8WFoRz--_wlpLAjcBKnfgYb2HhgGlHngPEMPQsCeja1U7a1tSrOQacxK2krJ0DKfLA5LAO_-oPTwOXENKjVbzvz00PlkBB-yR-A5XJ8F8taTldD6CaKpZKlvB1P8mgb3-kLcKxO-gYvNhDIDguPKoljVHRxqdqE8T7P4F_HrAGprxLP-zn1",
    verified: true,
  },
  {
    id: 2,
    name: "Sunlight Dairy Farm",
    location: "Kiambu, Kenya",
    farmType: "Commercial",
    availability: "AVAILABLE",
    availabilityColor: "success",
    tags: ["Milk", "Eggs", "Cheese"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPL_sne6Xac79gMRr42ncyEmUo0gKpDtHRVc7kMm3H1VuXQnTDU2O2CbOht6kfjQHKVcX2apA5nEEl-RYlztLkWebKM7dGh2dRqr1EVvM4Pl4OQsuaLPPBmliHPW5R-Rvt7caWS4txNrbS0JXjkAYSMwInZKSi_rXbWE3HQazx13A02a3TN0oDKVxxXBG7so6Ffjsrk1cCg7LiCG3cYWGhSMfvYSN_aitHkn9-psnranfj5NxulPNCRS5egsRKqQkpCif13VZ3T3E8",
    verified: true,
  },
  {
    id: 3,
    name: "Highland Poultry",
    location: "Nakuru, Kenya",
    farmType: "Small Scale",
    availability: "PRE-ORDER ONLY",
    availabilityColor: "warning",
    tags: ["Poultry", "Feeds"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkAhYAZnZ_cDbqLbN6k13u8C8tgautzxqfxx7MYC3q38ALpRQzQYwPCgzX28q8QwUWF7XskZSL3xudYMXgKbOs_sldUV1IixwkpawMZRR7HTH3qfdqmw-Y1HC0C2ZVt-myrYAIExqnFQQph2zTDLEAwfBpVuu84Kw-vTehbiIdkPC5MkhEU4G0xX9igsC4x1gHjqj9odCYn409OgIg6bqgDtyNBpD4R-Ztb3ak-LkguL3p0y0gcd6fKpZBCv6Z6xGZoHJIx6pk9U9R",
    verified: false,
  },
  {
    id: 4,
    name: "Rooted Harvest",
    location: "Machakos, Kenya",
    farmType: "Organic",
    availability: "AVAILABLE",
    availabilityColor: "success",
    tags: ["Fruits", "Herbs"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPE6W2MnH9f67E0_1zgx-YkAGWSDgfIabiJRPe_for_RkBEYlSyVgjjoGD8FmQWgt2hQ3hpigUA9oN9QFrfxayp2YcYAgbxj3U__EUZQuOzkcita7ZViEBDEEdpAmeik47VfCWtvpguZQB1aU_HtB0-Wv5wfK_fG88C3nUFgMDIcgfjQ8hAsBy3k5LN7YXvIy3oiaxUn-1M6gvyx4P-Nyo5gdDAPILA5N7ZQqcVzzfsqSe3Mnih7JLrcoWZfbQjsQCMf18QRfLEzso",
    verified: true,
  },
  {
    id: 5,
    name: "Misty Mountains Farm",
    location: "Eldoret, Kenya",
    farmType: "Commercial",
    availability: "AVAILABLE",
    availabilityColor: "success",
    tags: ["Wheat", "Barley"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARuFy3Iab3PrrPeDBFmW5x6K3OEk0ydf1vbjjFlXU_S0bcn_sdzoUxbjgJ35Up3W9t8lBuDw36y_YtsddmttQJDhYgCwra2jFeTwvas-Y2v14vE7uwoKm1GPYhjHhViVuVY8UPVOS_dkoQ-xYjg2Sr1a1cyINuKiNDOo9inhsF_WMEBdEiupl5qgKehb-1CFI3Ed-I5r9csP74zNuxYFttbcWvd7wplhQuLM_r3Sm91gFsaEum1xWfidmtn5epwFpXPUZ-1VsT1L6P",
    verified: true,
  },
  {
    id: 6,
    name: "Riverbed Tilapia",
    location: "Kisumu, Kenya",
    farmType: "Aquaculture",
    availability: "AVAILABLE",
    availabilityColor: "success",
    tags: ["Fresh Fish", "Fingerlings"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiDI8ymtMHNfuGKWQk2KLl2tTzLvCKgnP034TX0UnofMJP6C7JZI97s7gWhcG6AckCs8EQG7z16LSCdez5FfSWj3Qa6yOKiifJGnZG4fqUAdIq_BbA-oTalCUNCDoJrPWVgndsfmKaJ3l8jmQCzsi9t2TXGhpOPkiPeFSLzYZvFrseg_NwGoYvGF0t2if85sKW-Wl5C_bSHyUvJC22ms6ZVLO2UQ_7sYYEp4IK2rsc9AwtGZSJDc-lr6T0om2RLNjsv_RZU42IUqOt",
    verified: false,
  },
];

export default function FarmersHub() {
  const [search, setSearch] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BG_LIGHT, color: "#0e1b12", py: 5, px: 1, width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
      <Box sx={{ width: "100%" }}>
        {/* Page Heading */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "text.primary",
              fontSize: { xs: "2rem", md: "2.75rem" },
            }}
          >
            Farmers & Producers Hub
          </Typography>
          <Typography sx={{ color: TEXT_MUTED, fontSize: "1.125rem", mt: 0.5 }}>
            Discover verified farmers by product and location
          </Typography>
        </Box>

        {/* Search and Filter Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: BORDER_LIGHT,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search farmers by product or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: TEXT_MUTED }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: INPUT_BG,
                borderRadius: 2,
                "& fieldset": { border: "none" },
                height: 48,
              },
            }}
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {["Product Type", "Location", "Farm Type", "Availability"].map((label) => (
                <Button
                  key={label}
                  variant="outlined"
                  size="small"
                  endIcon={<ExpandMore />}
                  sx={{
                    bgcolor: INPUT_BG,
                    borderColor: "transparent",
                    color: "text.primary",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { borderColor: `${PRIMARY}4D`, bgcolor: INPUT_BG },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1,
                px: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: BORDER_LIGHT,
                bgcolor: "#f8fcf9",
              }}
            >
              <Typography variant="body2" fontWeight={700}>
                Verified Farmers
              </Typography>
              <Switch
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: PRIMARY },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: PRIMARY },
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Farmer Cards Grid */}
        <Grid container spacing={3} sx={{ pb: 4 }}>
          {farmers.map((farmer) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={farmer.id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: BORDER_LIGHT,
                  "&:hover": { boxShadow: 4 },
                  transition: "box-shadow 0.2s ease",
                }}
              >
                <Box sx={{ position: "relative", aspectRatio: "16/10" }}>
                  <CardMedia
                    component="div"
                    image={farmer.image}
                    sx={{
                      height: "100%",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {farmer.verified && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor: PRIMARY,
                        color: "#fff",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        boxShadow: 2,
                      }}
                    >
                      <Verified sx={{ fontSize: 16 }} /> MK-VERIFIED
                    </Box>
                  )}
                </Box>
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                      {farmer.name}
                    </Typography>
                    <Chip
                      label={farmer.availability}
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        height: 22,
                        bgcolor: farmer.availabilityColor === "warning" ? "#fef3c7" : INPUT_BG,
                        color: farmer.availabilityColor === "warning" ? "#d97706" : PRIMARY,
                        border: "1px solid",
                        borderColor: farmer.availabilityColor === "warning" ? "rgba(217,119,6,0.2)" : `${PRIMARY}33`,
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: TEXT_MUTED, fontSize: "0.875rem", mb: 1.5 }}>
                    <LocationOn sx={{ fontSize: 18 }} />
                    <span>{farmer.location}</span>
                  </Box>
                  <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 1.5 }}>
                    Farm Type: <Typography component="span" fontWeight={600} color="text.primary">{farmer.farmType}</Typography>
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {farmer.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          fontSize: "0.75rem",
                          height: 24,
                          bgcolor: "#f8fcf9",
                          border: "1px solid",
                          borderColor: BORDER_LIGHT,
                        }}
                      />
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Chat />}
                    disableRipple
                    sx={{
                      mt: "auto",
                      py: 1.5,
                      fontWeight: 700,
                      bgcolor: PRIMARY,
                      "&:hover": { bgcolor: "#14b348" },
                      "&:focus": { outline: "none" },
                    }}
                  >
                    Contact on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
