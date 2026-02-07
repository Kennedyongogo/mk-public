import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  ArrowBack,
  Person,
  Email,
  Phone,
  Public,
  Translate,
  Business,
  Grass,
  Badge,
  CalendarToday,
} from "@mui/icons-material";
import Footer from "../components/Footer/Footer";

const PRIMARY = "#17cf54";
const BG_LIGHT = "#f6f8f6";

const ROLE_LABELS = {
  farmer: "Farmer / Producer",
  buyer: "Buyer / Consumer",
  input_supplier: "Input Supplier",
  veterinarian: "Veterinarian",
  consultant: "Consultant / Trainer",
};

const PRIMARY_ACTIVITY_LABELS = {
  crop: "Crop farming",
  livestock: "Livestock",
  mixed: "Mixed farming",
  aquaculture: "Aquaculture",
  agro_processing: "Agro-processing",
  other: "Other",
};

const SCALE_LABELS = {
  small: "Small scale",
  medium: "Medium scale",
  large: "Large scale",
  commercial: "Commercial",
  industrial: "Industrial",
};

function getBaseUrl() {
  const env = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL;
  return env ? String(env).replace(/\/$/, "") : "";
}

function InfoRow({ icon, label, value }) {
  if (value == null || value === "") return null;
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.5 }}>
      <Box sx={{ color: PRIMARY, mt: 0.25 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
      </Box>
    </Box>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: `${PRIMARY}08`,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ color: PRIMARY }}>{icon}</Box>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
      </Box>
      <CardContent sx={{ p: 2 }}>{children}</CardContent>
    </Card>
  );
}

// Support both camelCase and snake_case from API
function getProfileValue(profile, camelKey) {
  const snake = camelKey.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "");
  return profile[camelKey] ?? profile[snake];
}

export default function MarketplaceProfileView({ user: data, backTo = "/marketplace/dashboard" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || backTo;

  const user = data || {};
  const profile = user.profile || {};
  const baseUrl = getBaseUrl();
  const profilePhoto = getProfileValue(profile, "profilePhotoUrl");
  const photoUrl = profilePhoto
    ? `${baseUrl}${profilePhoto.startsWith("/") ? "" : "/"}${profilePhoto}`
    : null;

  const country = getProfileValue(profile, "country");
  const region = getProfileValue(profile, "region");
  const district = getProfileValue(profile, "district");
  const locationParts = [country, region, district].filter(Boolean);
  const locationStr = locationParts.length ? locationParts.join(", ") : null;

  const producesRaw = getProfileValue(profile, "produces");
  const producesArr = Array.isArray(producesRaw) ? producesRaw : [];
  const roleSpecificRaw = getProfileValue(profile, "roleSpecificData");
  const roleSpecific = roleSpecificRaw && typeof roleSpecificRaw === "object" ? roleSpecificRaw : {};

  const primaryActivity = getProfileValue(profile, "primaryActivity");
  const scaleOfOperation = getProfileValue(profile, "scaleOfOperation");
  const farmOrBusinessName = getProfileValue(profile, "farmOrBusinessName");
  const bio = getProfileValue(profile, "bio");
  const preferredLanguage = getProfileValue(profile, "preferredLanguage");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: BG_LIGHT,
        color: "#0e1b12",
        pt: 1.5,
        pb: 1.5,
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", px: 0.75, pt: 1.5, pb: 0.75, minWidth: 0, flex: 1 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(from)}
          disableRipple
          sx={{
            mb: 0.75,
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { color: PRIMARY },
            "&:focus": { outline: "none", boxShadow: "none" },
            "&:focus-visible": { outline: "none", boxShadow: "none" },
          }}
        >
          Back
        </Button>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${PRIMARY}22 0%, ${PRIMARY}08 100%)`,
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", mb: 2 }}>
              {photoUrl ? (
                <Box
                  component="img"
                  src={photoUrl}
                  alt={user.fullName || "Profile"}
                  onError={(e) => {
                    e.target.style.display = "none";
                    if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                  }}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid white",
                    boxShadow: 2,
                  }}
                />
              ) : null}
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  bgcolor: `${PRIMARY}30`,
                  color: PRIMARY,
                  display: photoUrl ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "3px solid white",
                  boxShadow: 2,
                }}
              >
                <Typography variant="h3" fontWeight={700}>
                  {(user.fullName || "?").charAt(0).toUpperCase()}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={ROLE_LABELS[user.role] || user.role || "—"}
              size="medium"
              sx={{ bgcolor: PRIMARY, color: "#fff", fontWeight: 600, mb: 1 }}
            />
            <Typography variant="h4" fontWeight={800} sx={{ color: "text.primary", mb: 0.5 }}>
              {user.fullName || "—"}
            </Typography>
            <Chip
              label={user.status === "active" ? "Active" : user.status}
              size="small"
              variant="outlined"
              color={user.status === "active" ? "success" : "default"}
              sx={{ mb: 1 }}
            />
            {farmOrBusinessName && (
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center" }}>
                <Business fontSize="small" /> {farmOrBusinessName}
              </Typography>
            )}
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate("/profile/complete", { state: { from: "/marketplace/profile", edit: true } })}
              disableRipple
              sx={{
                mt: 2,
                borderColor: PRIMARY,
                color: PRIMARY,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { borderColor: PRIMARY, bgcolor: `${PRIMARY}14` },
                "&:focus": { outline: "none", boxShadow: "none" },
                "&:focus-visible": { outline: "none", boxShadow: "none" },
              }}
            >
              Edit profile
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={2} sx={{ minWidth: 0 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="Contact & location" icon={<Person />}>
              <InfoRow icon={<Email fontSize="small" />} label="Email" value={user.email} />
              <InfoRow icon={<Phone fontSize="small" />} label="Phone" value={user.phone} />
              <InfoRow icon={<Public fontSize="small" />} label="Location" value={locationStr} />
              <InfoRow icon={<Translate fontSize="small" />} label="Preferred language" value={preferredLanguage} />
            </SectionCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionCard title="Role & activity" icon={<Badge />}>
              {user.role === "farmer" && (
                <>
                  <InfoRow
                    icon={<Grass fontSize="small" />}
                    label="Primary activity"
                    value={primaryActivity ? PRIMARY_ACTIVITY_LABELS[primaryActivity] || primaryActivity : null}
                  />
                  <InfoRow
                    icon={<Grass fontSize="small" />}
                    label="Scale of operation"
                    value={scaleOfOperation ? SCALE_LABELS[scaleOfOperation] || scaleOfOperation : null}
                  />
                  {producesArr.length > 0 && (
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 600 }}>
                        Produces
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                        {producesArr.map((p, i) => (
                          <Chip key={i} label={p} size="small" sx={{ bgcolor: `${PRIMARY}14`, color: "text.primary" }} />
                        ))}
                      </Box>
                    </Box>
                  )}
                  <InfoRow
                    icon={<Business fontSize="small" />}
                    label="Farm or business name"
                    value={farmOrBusinessName}
                  />
                </>
              )}
              {Object.keys(roleSpecific).length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 600 }}>
                    Additional details
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {JSON.stringify(roleSpecific, null, 2).replace(/[{}"]/g, "").trim() || "—"}
                  </Typography>
                </Box>
              )}
            </SectionCard>
          </Grid>
          {(bio || user.createdAt) && (
            <Grid size={{ xs: 12 }}>
              <SectionCard title="About" icon={<CalendarToday />}>
                {bio && (
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mb: user.createdAt ? 2 : 0 }}>
                    {bio}
                  </Typography>
                )}
                {user.createdAt && (
                  <Typography variant="caption" color="text.secondary">
                    Member since {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </Typography>
                )}
              </SectionCard>
            </Grid>
          )}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}
