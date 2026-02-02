import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, PersonPin, Public, Translate, Business, Grass, ShoppingCart, Build, Pets, School, AddPhotoAlternate } from "@mui/icons-material";
import Swal from "sweetalert2";
import { completeMarketplaceProfile, uploadMarketplaceProfilePhoto } from "../api";

const PRIMARY = "#11d452";
const PRIMARY_DARK = "#0ea33d";
const BG_LIGHT = "#f6f8f6";
const BG_DARK = "#102216";

const ROLES = [
  { value: "farmer", label: "Farmer / Producer", icon: <Grass /> },
  { value: "buyer", label: "Buyer / Consumer", icon: <ShoppingCart /> },
  { value: "input_supplier", label: "Input Supplier", icon: <Build /> },
  { value: "veterinarian", label: "Veterinarian", icon: <Pets /> },
  { value: "consultant", label: "Consultant / Trainer", icon: <School /> },
];

const PRIMARY_ACTIVITIES = [
  { value: "crop", label: "Crop farming" },
  { value: "livestock", label: "Livestock" },
  { value: "mixed", label: "Mixed farming" },
  { value: "aquaculture", label: "Aquaculture" },
  { value: "agro_processing", label: "Agro-processing" },
  { value: "other", label: "Other" },
];

const SCALES = [
  { value: "small", label: "Small scale" },
  { value: "medium", label: "Medium scale" },
  { value: "large", label: "Large scale" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
];

export default function ProfileComplete() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [primaryActivity, setPrimaryActivity] = useState("");
  const [produces, setProduces] = useState("");
  const [scaleOfOperation, setScaleOfOperation] = useState("");
  const [farmOrBusinessName, setFarmOrBusinessName] = useState("");
  const [bio, setBio] = useState("");
  const [roleSpecificData, setRoleSpecificData] = useState({});
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const profilePhotoInputRef = React.useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("marketplace_token");
    if (!token) {
      navigate("/marketplace", { replace: true });
    }
  }, [navigate]);

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (e.g. JPG, PNG).");
      return;
    }
    setError("");
    setUploadingPhoto(true);
    try {
      const data = await uploadMarketplaceProfilePhoto(file);
      if (data.profilePhotoUrl) {
        setProfilePhotoUrl(data.profilePhotoUrl);
        setProfilePhotoPreview(URL.createObjectURL(file));
      }
    } catch (err) {
      setError(err.message || "Failed to upload photo.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!role) {
      setError("Please select your role.");
      return;
    }
    if (!profilePhotoUrl) {
      setError("A profile picture is required for identity verification.");
      return;
    }
    setLoading(true);
    try {
      const body = {
        role,
        profilePhotoUrl,
        country: country.trim() || undefined,
        region: region.trim() || undefined,
        district: district.trim() || undefined,
        preferredLanguage: preferredLanguage.trim() || undefined,
        roleSpecificData: Object.keys(roleSpecificData).length ? roleSpecificData : undefined,
      };
      if (role === "farmer") {
        body.primaryActivity = primaryActivity || undefined;
        body.produces = produces ? produces.split(",").map((s) => s.trim()).filter(Boolean) : undefined;
        body.scaleOfOperation = scaleOfOperation || undefined;
        body.farmOrBusinessName = farmOrBusinessName.trim() || undefined;
        body.bio = bio.trim() || undefined;
      }
      await completeMarketplaceProfile(body);
      const user = JSON.parse(localStorage.getItem("marketplace_user") || "{}");
      localStorage.setItem("marketplace_user", JSON.stringify({ ...user, profileCompleted: true, role }));
      Swal.fire({ icon: "success", title: "Profile completed!", timer: 1500, showConfirmButton: false });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to complete profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: BG_LIGHT,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/marketplace")}
        sx={{
          alignSelf: "flex-start",
          mb: 2,
          color: "text.secondary",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": { color: PRIMARY },
        }}
      >
        Back
      </Button>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 560,
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "rgba(19, 212, 82, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(6, 78, 59, 0.08)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Complete your profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Choose your role and add a few details so we can tailor your experience.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth required>
            <InputLabel id="role-label">User role</InputLabel>
            <Select
              labelId="role-label"
              label="User role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              startAdornment={
                <InputAdornment position="start" sx={{ mr: 1 }}>
                  <PersonPin sx={{ color: "action.active" }} />
                </InputAdornment>
              }
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { "&:focus-within": { borderColor: PRIMARY } },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
              }}
            >
              {ROLES.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {r.icon}
                    {r.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Profile picture <Typography component="span" color="error">*</Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Required for identity verification.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Box
                onClick={() => profilePhotoInputRef.current?.click()}
                sx={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  border: "2px dashed",
                  borderColor: profilePhotoUrl ? "success.main" : "divider",
                  bgcolor: profilePhotoPreview ? "transparent" : "action.hover",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover": { borderColor: PRIMARY, bgcolor: "action.selected" },
                }}
              >
                {profilePhotoPreview ? (
                  <Box component="img" src={profilePhotoPreview} alt="Profile" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : uploadingPhoto ? (
                  <CircularProgress size={32} sx={{ color: PRIMARY }} />
                ) : (
                  <AddPhotoAlternate sx={{ fontSize: 40, color: "text.secondary" }} />
                )}
              </Box>
              <input
                ref={profilePhotoInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleProfilePhotoChange}
              />
              <Box>
                <Button
                  type="button"
                  variant="outlined"
                  size="small"
                  disabled={uploadingPhoto}
                  onClick={() => profilePhotoInputRef.current?.click()}
                  sx={{ textTransform: "none", borderColor: PRIMARY, color: PRIMARY, "&:hover": { borderColor: PRIMARY_DARK, bgcolor: "rgba(17, 212, 82, 0.08)" } }}
                >
                  {profilePhotoUrl ? "Change photo" : "Upload photo"}
                </Button>
                {profilePhotoUrl && (
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                    Photo added
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Country"
            placeholder="e.g. Tanzania"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Public sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            }}
            sx={{ "& label.Mui-focused": { color: PRIMARY }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}
          />
          <TextField
            fullWidth
            label="Region / County"
            placeholder="e.g. Arusha"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            sx={{ "& label.Mui-focused": { color: PRIMARY } }}
          />
          <TextField
            fullWidth
            label="District (optional)"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            sx={{ "& label.Mui-focused": { color: PRIMARY } }}
          />
          <TextField
            fullWidth
            label="Preferred language"
            placeholder="e.g. English, Swahili"
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Translate sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            }}
            sx={{ "& label.Mui-focused": { color: PRIMARY } }}
          />

          {role === "farmer" && (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                Farming details (optional)
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Primary activity</InputLabel>
                <Select
                  label="Primary activity"
                  value={primaryActivity}
                  onChange={(e) => setPrimaryActivity(e.target.value)}
                  sx={{ "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}
                >
                  {PRIMARY_ACTIVITIES.map((a) => (
                    <MenuItem key={a.value} value={a.value}>
                      {a.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="What you produce (comma-separated)"
                placeholder="e.g. maize, beans, poultry"
                value={produces}
                onChange={(e) => setProduces(e.target.value)}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <FormControl fullWidth>
                <InputLabel>Scale of operation</InputLabel>
                <Select
                  label="Scale of operation"
                  value={scaleOfOperation}
                  onChange={(e) => setScaleOfOperation(e.target.value)}
                  sx={{ "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}
                >
                  {SCALES.map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Farm or business name (optional)"
                placeholder="Name"
                value={farmOrBusinessName}
                onChange={(e) => setFarmOrBusinessName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business sx={{ color: "action.active" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Short bio (optional)"
                placeholder="Tell us about your farm or business"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 700,
              fontSize: "1.05rem",
              bgcolor: PRIMARY,
              color: BG_DARK,
              textTransform: "none",
              "&:hover": { bgcolor: PRIMARY_DARK },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: BG_DARK }} /> : "Save and continue"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
