import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { ArrowBack, PersonPin, Public, Translate, Business, Grass, ShoppingCart, Build, Pets, School, AddPhotoAlternate, Phone as PhoneIcon } from "@mui/icons-material";
import Swal from "sweetalert2";
import { completeMarketplaceProfile, uploadMarketplaceProfilePhoto, getMarketplaceMe } from "../api";
import Footer from "../components/Footer/Footer";

function getBaseUrl() {
  const env = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL;
  return env ? String(env).replace(/\/$/, "") : "";
}

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

const DEFAULT_BACK = "/marketplace/dashboard";

export default function ProfileComplete({ onProfileCompleted } = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const backTo = location.state?.from || DEFAULT_BACK;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
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
  const [loadingProfile, setLoadingProfile] = useState(!!location.state?.edit);
  const profilePhotoInputRef = React.useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("marketplace_token");
    if (!token) {
      navigate("/marketplace", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (location.state?.edit) return;
    try {
      const saved = localStorage.getItem("marketplace_user");
      if (saved) {
        const u = JSON.parse(saved);
        if (u.fullName && !fullName) setFullName(u.fullName);
        if (u.email && !email) setEmail(u.email);
      }
    } catch (_) {}
  }, []);

  // Pre-fill form when editing (same component for view → edit)
  useEffect(() => {
    if (!location.state?.edit) return;
    let cancelled = false;
    getMarketplaceMe()
      .then((res) => {
        if (cancelled || !res?.data) return;
        const u = res.data;
        const p = u.profile || {};
        const baseUrl = getBaseUrl();
        const photoUrl = p.profilePhotoUrl ?? p.profile_photo_url;
        setFullName(u.fullName ?? u.full_name ?? "");
        setEmail(u.email ?? "");
        setRole(u.role || "");
        setPhone(u.phone || "");
        setCountry(p.country ?? "");
        setRegion(p.region ?? "");
        setDistrict(p.district ?? "");
        setPreferredLanguage(p.preferredLanguage ?? p.preferred_language ?? "");
        if (photoUrl) {
          setProfilePhotoUrl(photoUrl);
          setProfilePhotoPreview(photoUrl.startsWith("http") ? photoUrl : `${baseUrl}${photoUrl.startsWith("/") ? "" : "/"}${photoUrl}`);
        }
        setPrimaryActivity(p.primaryActivity ?? p.primary_activity ?? "");
        setProduces(Array.isArray(p.produces) ? p.produces.join(", ") : "");
        setScaleOfOperation(p.scaleOfOperation ?? p.scale_of_operation ?? "");
        setFarmOrBusinessName(p.farmOrBusinessName ?? p.farm_or_business_name ?? "");
        setBio(p.bio ?? "");
        const rsd = p.roleSpecificData ?? p.role_specific_data;
        if (rsd && typeof rsd === "object") {
          const parsed = { ...rsd };
          if (Array.isArray(parsed.whatTheyBuy)) parsed.whatTheyBuy = parsed.whatTheyBuy.join(", ");
          if (Array.isArray(parsed.productsSupplied)) parsed.productsSupplied = parsed.productsSupplied.join(", ");
          setRoleSpecificData(parsed);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoadingProfile(false);
      });
    return () => { cancelled = true; };
  }, [location.state?.edit]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setRoleSpecificData({});
  };

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
      if (newPassword.trim() || confirmPassword) {
        if (!newPassword.trim()) {
          setError("Enter a new password.");
          return;
        }
        if (newPassword.length < 6) {
          setError("New password must be at least 6 characters.");
          return;
        }
        if (newPassword !== confirmPassword) {
          setError("New password and confirm password do not match.");
          return;
        }
        if (!currentPassword.trim()) {
          setError("Current password is required to change password.");
          return;
        }
      }

      const body = {
        role,
        profilePhotoUrl,
        ...(fullName.trim() && { fullName: fullName.trim() }),
        ...(email.trim() && { email: email.trim().toLowerCase() }),
        phone: phone.trim() || undefined,
        country: country.trim() || undefined,
        region: region.trim() || undefined,
        district: district.trim() || undefined,
        preferredLanguage: preferredLanguage.trim() || undefined,
      };
      if (newPassword.trim()) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }
      if (role === "farmer") {
        body.primaryActivity = primaryActivity || undefined;
        body.produces = produces ? produces.split(",").map((s) => s.trim()).filter(Boolean) : undefined;
        body.scaleOfOperation = scaleOfOperation || undefined;
        body.farmOrBusinessName = farmOrBusinessName.trim() || undefined;
        body.bio = bio.trim() || undefined;
      } else if (["buyer", "input_supplier", "veterinarian", "consultant"].includes(role)) {
        const data = { ...roleSpecificData };
        if (data.whatTheyBuy && typeof data.whatTheyBuy === "string") {
          data.whatTheyBuy = data.whatTheyBuy.split(",").map((s) => s.trim()).filter(Boolean);
        }
        if (data.productsSupplied && typeof data.productsSupplied === "string") {
          data.productsSupplied = data.productsSupplied.split(",").map((s) => s.trim()).filter(Boolean);
        }
        const cleaned = Object.fromEntries(
          Object.entries(data).filter(([, v]) => v != null && v !== "" && (typeof v !== "object" || (Array.isArray(v) && v.length > 0)))
        );
        if (Object.keys(cleaned).length) body.roleSpecificData = cleaned;
      }
      await completeMarketplaceProfile(body);
      const user = JSON.parse(localStorage.getItem("marketplace_user") || "{}");
      localStorage.setItem("marketplace_user", JSON.stringify({ ...user, profileCompleted: true, role }));
      Swal.fire({ icon: "success", title: "Profile completed!", timer: 1500, showConfirmButton: false });
      if (typeof onProfileCompleted === "function") {
        await onProfileCompleted();
      }
      navigate("/marketplace/profile", { replace: true, state: { fromComplete: true } });
    } catch (err) {
      setError(err.message || "Failed to complete profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingProfile) {
    return (
      <Box sx={{ minHeight: "100dvh", bgcolor: BG_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: PRIMARY }} size={48} />
      </Box>
    );
  }

  return (
    <>
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: BG_LIGHT,
        pt: 2.5,
        pb: 1.5,
        px: 0.75,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(backTo)}
        disableRipple
        sx={{
          alignSelf: "flex-start",
          mb: 0.75,
          color: "text.secondary",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": { color: PRIMARY },
          "&:focus": { outline: "none" },
          "&:focus-visible": { outline: "none" },
        }}
      >
        Back
      </Button>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "100%",
          flex: 1,
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "rgba(19, 212, 82, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(6, 78, 59, 0.08)",
          boxSizing: "border-box",
          minWidth: 0,
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
          {/* 1. Profile picture first, centered in card */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Profile picture <Typography component="span" color="error">*</Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Required for identity verification.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
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
                <Typography variant="caption" color="text.secondary">
                  Photo added
                </Typography>
              )}
            </Box>
          </Box>

          {/* 2. Role input below */}
          <FormControl fullWidth required>
            <InputLabel id="role-label">User role</InputLabel>
            <Select
              labelId="role-label"
              label="User role"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
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

          <TextField
            fullWidth
            label="Full name"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ "& label.Mui-focused": { color: PRIMARY }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="e.g. you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ "& label.Mui-focused": { color: PRIMARY }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}
          />

          <TextField
            fullWidth
            label="Phone"
            placeholder="e.g. +255 700 000 000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            }}
            sx={{ "& label.Mui-focused": { color: PRIMARY }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}
          />

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

          {location.state?.edit && (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                Change password (optional)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Leave blank to keep your current password.
              </Typography>
              <TextField
                fullWidth
                label="Current password"
                type="password"
                placeholder="Enter current password to set a new one"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                label="New password"
                type="password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                label="Confirm new password"
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
            </>
          )}

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

          {role === "buyer" && (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                Buyer details (optional)
              </Typography>
              <TextField
                fullWidth
                label="Business name"
                placeholder="Your business or trading name"
                value={roleSpecificData.businessName ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, businessName: e.target.value }))}
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
                label="What you buy (comma-separated)"
                placeholder="e.g. maize, beans, livestock"
                value={roleSpecificData.whatTheyBuy ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, whatTheyBuy: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                label="Coverage area"
                placeholder="e.g. East Africa, Tanzania"
                value={roleSpecificData.coverageArea ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, coverageArea: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
            </>
          )}

          {role === "input_supplier" && (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                Supplier details (optional)
              </Typography>
              <TextField
                fullWidth
                label="Business name"
                placeholder="Your company or business name"
                value={roleSpecificData.businessName ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, businessName: e.target.value }))}
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
                label="Products supplied (comma-separated)"
                placeholder="e.g. seeds, fertilizers, feeds"
                value={roleSpecificData.productsSupplied ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, productsSupplied: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                label="Coverage area"
                placeholder="e.g. East Africa, Tanzania"
                value={roleSpecificData.coverageArea ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, coverageArea: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
            </>
          )}

          {role === "veterinarian" && (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                Veterinary details (optional)
              </Typography>
              <TextField
                fullWidth
                label="Business / practice name"
                placeholder="Your practice or business name"
                value={roleSpecificData.businessName ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, businessName: e.target.value }))}
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
                label="Specialization"
                placeholder="e.g. livestock, poultry, wildlife"
                value={roleSpecificData.specialization ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, specialization: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Services offered"
                placeholder="e.g. vaccinations, consultations, emergency care"
                value={roleSpecificData.servicesOffered ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, servicesOffered: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                label="Coverage area"
                placeholder="e.g. Arusha region, Tanzania"
                value={roleSpecificData.coverageArea ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, coverageArea: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
            </>
          )}

          {role === "consultant" && (
            <>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                Consultant details (optional)
              </Typography>
              <TextField
                fullWidth
                label="Business name"
                placeholder="Your consultancy or business name"
                value={roleSpecificData.businessName ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, businessName: e.target.value }))}
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
                label="Specialization"
                placeholder="e.g. agronomy, livestock management, marketing"
                value={roleSpecificData.specialization ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, specialization: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Services offered"
                placeholder="e.g. training, advisory, project design"
                value={roleSpecificData.servicesOffered ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, servicesOffered: e.target.value }))}
                sx={{ "& label.Mui-focused": { color: PRIMARY } }}
              />
              <TextField
                fullWidth
                label="Coverage area"
                placeholder="e.g. East Africa, Tanzania"
                value={roleSpecificData.coverageArea ?? ""}
                onChange={(e) => setRoleSpecificData((p) => ({ ...p, coverageArea: e.target.value }))}
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
            disableRipple
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 700,
              fontSize: "1.05rem",
              bgcolor: PRIMARY,
              color: BG_DARK,
              textTransform: "none",
              "&:hover": { bgcolor: PRIMARY_DARK },
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:focus-visible": { outline: "none", boxShadow: "none" },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: BG_DARK }} /> : "Save and continue"}
          </Button>
        </Box>
      </Paper>
    </Box>
    <Footer />
    </>
  );
}
