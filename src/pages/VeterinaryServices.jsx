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
  Switch,
} from "@mui/material";
import {
  Search,
  ExpandMore,
  Verified,
  LocationOn,
  Chat,
  WaterDrop,
  LocalFlorist,
  SetMeal,
  Agriculture,
  MedicalServices,
  Pets,
} from "@mui/icons-material";

const PRIMARY = "#17cf54";
const BG_LIGHT = "#f6f8f6";
const BORDER_LIGHT = "#d0e7d7";
const TEXT_MUTED = "#4e9767";

const specializationIcons = {
  dairy: WaterDrop,
  poultry: Pets,
  swine: LocalFlorist,
  aquaculture: SetMeal,
  livestock: Agriculture,
  general: MedicalServices,
};

const veterinarians = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialization: "Dairy Specialist",
    specializationKey: "dairy",
    location: "Nairobi, Kenya",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPzi_RauC6Bp06banKQ0cj0ZBMfyiuCTxtJDNyZhTmltkFoCp5Omu9RIQbDUkQbj6hZZ0kTAG8n7wiYO_iAq95xKhyricYw8Q9oPq5QTPUmGYcPmYnmvn52D7jIxTbT3MWHHgS1qHBvMKT57AhRfksSFdGHRJnbwvP8q2aVcy_bwgRDIubPa-p2GUAJrMoPs6p2Nl_2Rf4IKwZ4hggUhGS_UyA6nPKc6-p5hKYshYS4Jz1_1dmlJuTeauXA3kFAI__NTp08x87tj7O",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. John Mutua",
    specialization: "Poultry Expert",
    specializationKey: "poultry",
    location: "Kiambu County",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6CsvAn_Ny7JBtXFma0kgJFVut-VugQ9tSXQBPzA-If2cb5EOVABuCjBGFMLQ4BqoX20Yy2EOHO5LxH0hCqi_0HT_r366GKUnyk8vc6CLknPZcBruBn6M5ZFTuyTK9Lc6MpaGjqGQ8XLt2_JjFVNtg9my_at-Leacs98G6XDIhrwLoOiKfsh4oCpbKtj8Ez12ltLugGlFGzC3ty5wvVQjrnZEi6Wv5rzA53tNobrhzNH5bEibpTnqDiMYXpkk0Ja4_7xq-wusofGRN",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    specialization: "Swine Specialist",
    specializationKey: "swine",
    location: "Nakuru, Rift Valley",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtbxAP7FitRI6YaMxV8oVbZl0j-9o0wRmqAQmhEJLcQMDjDmlwTj8b24gBzA8j8L-SyR0gTBZnMNvwvLLo8WmgXYI7j-YdPNNkqWmJwDUnfp0SH--GQxxFWe6rlGyG4Acj6e5f3j8rMs6aA-qgmFi3QkA9Fo0N_Jrtg61qfLI3A62udSxCzU7APcnfY2MLA6dwvcSWbIZb4QxDmjAzwEAZbQI_wpYgEY2_B0MS6MhTEOo9ZzCeTewdFN8H6lMpHT87ykUuWcTecRUy",
    verified: true,
  },
  {
    id: 4,
    name: "Dr. Samuel Okoro",
    specialization: "Aquaculture Vet",
    specializationKey: "aquaculture",
    location: "Kisumu, Lake Region",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhLvSu4TnqiZWzSQGE-fZApegIt4QEkq6lNXNIGdF_yxJT9O_kCjRKotA5rdY37BxtEAAuy8YVIFJAbLMDjXaBUsz5ke6W8A5qlzRhsxBY62zzM6f2njjbTRtxKi3dx6kVytZXFJyUc96lrB0VTxhI7617M8RDtA7uYU3ECmgj9vfsIcjQgd7juHys9rOQH2x6JWEgCXBCvpih3G3hPipiAItNf6TwcelPmlfXLw32bUch1bMUiUYbz0_2Eg8XBc4Y_FFph5pMdT1Q",
    verified: true,
  },
  {
    id: 5,
    name: "Dr. Lisa Wang",
    specialization: "Livestock Consultant",
    specializationKey: "livestock",
    location: "Machakos County",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALqxuB8q4GBK000-gEwoNYy_tgZ_-ydSln6rLuNwReen7WIPsCxWc-q8AvLD3k3DJiI1-HIfa67Re_gYhaGIbRygfDPmfwrBn1ylu0cOve-LigFjLPCdDyt2C8nyCcYKeIfcDRIy3FDOWPxg6sHV8Wc5sKs_stDcxXYSzDi0_0b9Qwlr986tTRKfijPgRE30Wc1Sw0C9HRVBArpYDxKbytJh9dUZX0OZiYbCs0GnMQn8AeiI6I3gl7AFng_hy4I4QQqHWxb9n26Hv6",
    verified: true,
  },
  {
    id: 6,
    name: "Dr. David Smith",
    specialization: "General Practice",
    specializationKey: "general",
    location: "Eldoret, Uasin Gishu",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyGNaBH_TTTjL84PU42fQgfgn3QpRgoPQ8axmUuLbgPtR-hkZI4zAWQCx4ugBYcTw8XkEcvEG8mRji0HnztNpveHX9XOwZ0448cmDNB8IKZcBqzPrxA6YgOBi5_HN9PmYyZ5lWSscjeijXQnipxL0PY3FHMTteCxABrC-cinY9jtLXgNkwgUMKzzlJS78BCkPS3mXV4gyjABATaB4QoXnUH66KgZonIZAkdW9LaPnNK62uu3P8KnzGj28QQPdNwKzYApv1xl9nVctc",
    verified: true,
  },
];

export default function VeterinaryServices() {
  const [search, setSearch] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BG_LIGHT, color: "#0e1b12", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
      {/* Header section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 5,
          px: 1,
        }}
      >
        <Box sx={{ width: "100%" }}>
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
            Veterinary Services
          </Typography>
          <Typography sx={{ color: TEXT_MUTED, fontSize: "1.125rem", mt: 1 }}>
            Connect with MK-verified veterinary professionals
          </Typography>
        </Box>
      </Box>

      {/* Search and filters */}
      <Box sx={{ py: 4, px: 1 }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            fullWidth
            placeholder="Search veterinarians by specialization, location, or service type"
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
              {["Poultry", "Dairy", "Pigs", "Fish"].map((label) => (
                <Button
                  key={label}
                  variant="outlined"
                  size="small"
                  endIcon={<ExpandMore sx={{ color: "grey.400" }} />}
                  sx={{
                    borderRadius: "9999px",
                    borderColor: "divider",
                    color: "text.primary",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { borderColor: PRIMARY, "& .MuiButton-endIcon": { color: PRIMARY } },
                  }}
                >
                  {label}
                </Button>
              ))}
              <Button
                variant="outlined"
                size="small"
                startIcon={<LocationOn />}
                endIcon={<ExpandMore sx={{ color: "grey.400" }} />}
                sx={{
                  borderRadius: "9999px",
                  borderColor: "divider",
                  color: "text.primary",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { borderColor: PRIMARY, "& .MuiButton-endIcon": { color: PRIMARY } },
                }}
              >
                Location
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: "9999px",
                border: "1px solid",
                borderColor: `${PRIMARY}33`,
                bgcolor: `${PRIMARY}1A`,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Verified Only
              </Typography>
              <Switch
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                size="small"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: PRIMARY },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: PRIMARY },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Directory grid */}
      <Box sx={{ px: 1, pb: 4 }}>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={3}>
            {veterinarians.map((vet) => {
              const SpecIcon = specializationIcons[vet.specializationKey] || MedicalServices;
              return (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={vet.id}>
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
                    <Box sx={{ position: "relative", aspectRatio: "4/3" }}>
                      <CardMedia
                        component="div"
                        image={vet.image}
                        sx={{ height: "100%", backgroundSize: "cover", backgroundPosition: "center" }}
                      />
                      {vet.verified && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            bgcolor: PRIMARY,
                            color: "#fff",
                            px: 1.5,
                            py: 0.75,
                            borderRadius: "9999px",
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            boxShadow: 2,
                          }}
                        >
                          <Verified sx={{ fontSize: 16 }} /> MK VERIFIED
                        </Box>
                      )}
                    </Box>
                    <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, p: 2.5 }}>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          {vet.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <SpecIcon sx={{ fontSize: 18, color: TEXT_MUTED }} />
                          <Typography variant="body2" sx={{ color: TEXT_MUTED, fontWeight: 500 }}>
                            {vet.specialization}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <LocationOn sx={{ fontSize: 18, color: "grey.500" }} />
                          <Typography variant="body2" color="text.secondary">
                            {vet.location}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Chat />}
                        disableRipple
                        sx={{
                          mt: "auto",
                          py: 1.375,
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          bgcolor: PRIMARY,
                          "&:hover": { bgcolor: "#15b84a" },
                          "&:focus": { outline: "none" },
                        }}
                      >
                        WhatsApp / Message
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderColor: "divider",
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.875rem",
                "&:hover": { borderColor: "grey.400", bgcolor: "action.hover" },
              }}
            >
              Load More Professionals
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
