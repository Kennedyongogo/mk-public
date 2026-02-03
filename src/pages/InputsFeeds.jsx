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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Search, ExpandMore, Verified, Chat, Send, SupportAgent } from "@mui/icons-material";

const PRIMARY = "#17cf54";
const BG_LIGHT = "#f6f8f6";
const BORDER_LIGHT = "#d0e7d7";
const INPUT_BG = "#e7f3eb";
const TEXT_MUTED = "#4e9767";
const PANEL_BG = "#eef8f1";
const WHATSAPP = "#25D366";

const suppliers = [
  {
    id: 1,
    name: "GreenGrowth Seeds",
    subtitle: "Organic, Seeds • Nairobi",
    tags: ["Tomato", "Maize", "Hybrid"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZiqgRDPyVs_rgIkSJdUKFhkCeN0jm1YT50jkZZ4aHXW6WF3qkl9IMVMe7MDWWuuxDxeFh-VTQnEh6OwvyKA7j0hac0MxwJh6k5e5b-4tpEQf94G_3ueyKz028B_BjT4ykhln-PABNaf2KeuQIyad2uJaTCY4BqlEYzDC6FXw8UGJRacuZgfb5VW1cTdL5qQ7OF9PxTCHfdT3b6vjVStr8_u0fHzyIc5hjCtEMNWgF9YzqjihY3ggxo09fDTqT8n5LraOdWBFOKo3G",
    verified: true,
  },
  {
    id: 2,
    name: "NutriFeed Solutions",
    subtitle: "Poultry, Supplements • Kumasi",
    tags: ["Broiler", "Layers"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKVRVbZ_G0mo-mrsBvki93pFOqYtgoS5i7dgvwkEpnqN8wjrlP682PQDBRY9Tz5iOMXVLmiZrdPjV1lKav95lgw3T8CuVXIVHZ-_WTkV7dLo0HYM1dDjHUDJ1b3OG_MuHvxEn7XQh710WeMM9qk1LdBnlznnfPa5MiQcHfuj4mEBWQj19hzVqdX4IEWji_IGV9TQMPfUFCkjlbeJDcht85Y3KpsRwBpFHYVP3oHo4RDPEK1b9cRNeSn25d6gnSdXCFMjU9txi06n81",
    verified: true,
  },
  {
    id: 3,
    name: "BioAg Fertilisers",
    subtitle: "Bio-fertilizer • Lagos",
    tags: ["Compost", "NPK"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5hC3lC7rR9mOqKO2XYkhs0UILxJpFb30LX12_WJg4V2QPWgwZtgya0tK8HIrBaRBJi_MVDpWct13p5aWIpLfM09brhD5_KZwo22BnR7CaHfwYtMZcYDJcBZpptGJN71CiHShNdeg3dZNbJZk13DAVYo-La7ElFfhQCo-pzqORlYLarm8I53juE5m31LoH3DBQKKLaxPidklCO-b-L8EC-3x0E0QbP-57ROmRSC_yGqpts7FH8-XSzYVQo-S1sDLFpA_3WhaXDCPyp",
    verified: true,
  },
  {
    id: 4,
    name: "PoultryPro Inputs",
    subtitle: "Additives • Kampala",
    tags: ["Vitamins", "Lysine"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCltkPLzygTm7MzqpuJLfYHZAyntoS_MdOyJRMf-jtLKDyamodlj6Opy4XshqZ6svr70R0ZyZJ424iCTtYD_ZtwZAv5BH_cZrXov7_wbESQ0SLKe0CEpmW_2frMHN3SUsEMI-HwRTmSEl7t3w-rRk-hmYby6-JRo1jgVnHnyoLIQ530WhCh4CgPtEoAhhhHzIG2rXkPJa8rIik9aBccqLqHxkYtOF1bTToHZ9hCgpO7-0Z43rkXsVFTHDF_sY7CkewtsegYE_CX4yPF",
    verified: true,
  },
];

export default function InputsFeeds() {
  const [search, setSearch] = useState("");
  const [animalType, setAnimalType] = useState("poultry");
  const [productionStage, setProductionStage] = useState("starter");
  const [budget, setBudget] = useState("");
  const [ingredients, setIngredients] = useState("");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BG_LIGHT, color: "#0e1b12", py: 4, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto", width: "100%" }}>
        {/* Page Heading */}
        <Box component="header" sx={{ mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: "-0.033em",
              color: "text.primary",
              fontSize: { xs: "2rem", md: "2.25rem" },
            }}
          >
            Inputs & Feeds
          </Typography>
          <Typography
            sx={{
              color: TEXT_MUTED,
              fontSize: "1.125rem",
              mt: 1.5,
              maxWidth: 672,
            }}
          >
            Find quality agricultural inputs and request expert feed formulations from verified partners.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left: Suppliers */}
          <Grid size={{ xs: 12, lg: 8 }}>
            {/* Search & Filters */}
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
                placeholder="Search feeds, seeds, fertilizers..."
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
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {["Category", "Target Animals", "Location"].map((label) => (
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
                      "&:hover": { borderColor: `${PRIMARY}33`, bgcolor: `${PRIMARY}33` },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Paper>

            {/* Verified Suppliers Grid */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.375rem",
                  letterSpacing: "-0.015em",
                  mb: 2,
                }}
              >
                Verified Suppliers
              </Typography>
              <Grid container spacing={2}>
                {suppliers.map((supplier) => (
                  <Grid size={{ xs: 12, md: 6 }} key={supplier.id}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: BORDER_LIGHT,
                        "&:hover": { boxShadow: 4 },
                        transition: "box-shadow 0.2s ease",
                      }}
                    >
                      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Box
                            sx={{
                              width: 96,
                              height: 96,
                              borderRadius: 2,
                              bgcolor: "grey.200",
                              overflow: "hidden",
                              flexShrink: 0,
                            }}
                          >
                            <CardMedia
                              component="div"
                              image={supplier.image}
                              sx={{ width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center" }}
                            />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0, py: 0.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
                              <Typography variant="subtitle1" fontWeight={700}>
                                {supplier.name}
                              </Typography>
                              {supplier.verified && (
                                <Chip
                                  size="small"
                                  icon={<Verified sx={{ fontSize: 14 }} />}
                                  label="MK Verified"
                                  sx={{
                                    height: 22,
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    bgcolor: `${PRIMARY}1A`,
                                    color: PRIMARY,
                                    "& .MuiChip-icon": { color: "inherit" },
                                  }}
                                />
                              )}
                            </Box>
                            <Typography variant="body2" sx={{ color: TEXT_MUTED, fontWeight: 500, mb: 1 }}>
                              {supplier.subtitle}
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {supplier.tags.map((tag) => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: "0.6875rem",
                                    bgcolor: BG_LIGHT,
                                    color: TEXT_MUTED,
                                    border: "none",
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<Chat />}
                          disableRipple
                          sx={{
                            py: 1.25,
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            bgcolor: WHATSAPP,
                            "&:hover": { bgcolor: "#1da851" },
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
          </Grid>

          {/* Right: Custom Feed Formulation Panel */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ position: { lg: "sticky" }, top: { lg: 32 }, display: "flex", flexDirection: "column", gap: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: `${PRIMARY}33`,
                  bgcolor: PANEL_BG,
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -48,
                    right: -48,
                    width: 128,
                    height: 128,
                    borderRadius: "50%",
                    bgcolor: `${PRIMARY}1A`,
                    filter: "blur(40px)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Custom Feed Formulation
                  </Typography>
                  <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 3 }}>
                    Can't find what you need? Request a tailored formulation from our certified animal nutritionists.
                  </Typography>
                  <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Animal Type
                      </InputLabel>
                      <Select
                        value={animalType}
                        label="Animal Type"
                        onChange={(e) => setAnimalType(e.target.value)}
                        sx={{
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          "& fieldset": { border: "none" },
                        }}
                      >
                        <MenuItem value="poultry">Poultry (Broilers/Layers)</MenuItem>
                        <MenuItem value="cattle">Cattle (Dairy/Beef)</MenuItem>
                        <MenuItem value="pig">Pig (Swine)</MenuItem>
                        <MenuItem value="aqua">Aqua (Fish Feed)</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" fullWidth>
                      <InputLabel sx={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Production Stage
                      </InputLabel>
                      <Select
                        value={productionStage}
                        label="Production Stage"
                        onChange={(e) => setProductionStage(e.target.value)}
                        sx={{
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          "& fieldset": { border: "none" },
                        }}
                      >
                        <MenuItem value="starter">Starter</MenuItem>
                        <MenuItem value="grower">Grower</MenuItem>
                        <MenuItem value="finisher">Finisher</MenuItem>
                        <MenuItem value="breeder">Breeder</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      size="small"
                      fullWidth
                      label="Estimated Budget (USD)"
                      placeholder="e.g. 500"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          "& fieldset": { border: "none" },
                        },
                      }}
                      InputLabelProps={{
                        sx: { fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
                      }}
                    />
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      label="Preferred Ingredients"
                      placeholder="e.g. Soya meal, Maize bran, Fish meal..."
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          "& fieldset": { border: "none" },
                        },
                      }}
                      InputLabelProps={{
                        sx: { fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Send />}
                      disableRipple
                      sx={{
                        mt: 1,
                        py: 1.5,
                        fontWeight: 700,
                        bgcolor: PRIMARY,
                        color: "#0e1b12",
                        boxShadow: `0 4px 14px ${PRIMARY}33`,
                        "&:hover": { bgcolor: `${PRIMARY}E6` },
                        "&:focus": { outline: "none" },
                      }}
                    >
                      Request Expert Formulation
                    </Button>
                  </Box>
                </Box>
              </Paper>

              {/* Trust Badge */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: BORDER_LIGHT,
                  bgcolor: "rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "50%",
                    bgcolor: `${PRIMARY}1A`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SupportAgent sx={{ color: PRIMARY, fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Expert Consultation
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                    All requests are reviewed within 24 hours.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
