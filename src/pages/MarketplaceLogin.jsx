import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Link,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import {
  Agriculture,
  Monitor,
  Storefront,
  PrecisionManufacturing,
  VerifiedUser,
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Phone,
  Person,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { loginMarketplaceUser, registerMarketplaceUser } from "../api";

const PRIMARY = "#11d452";
const PRIMARY_DARK = "#0ea33d";
const BG_LIGHT = "#f6f8f6";
const BG_DARK = "#102216";
const EMERALD_900 = "#064e3b";
const EMERALD_950 = "#022c22";

const leftPanelBgImage =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80";

export default function MarketplaceLogin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regFullName, setRegFullName] = useState("");
  const [regTerms, setRegTerms] = useState(false);
  const [regPrivacy, setRegPrivacy] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setLoginError("");
    setRegisterError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    if (!emailOrPhone.trim() || !password) {
      setLoginError("Please enter email and password.");
      return;
    }
    setLoginLoading(true);
    try {
      const { data } = await loginMarketplaceUser({
        email: emailOrPhone.trim().toLowerCase(),
        password,
      });
      localStorage.setItem("marketplace_token", data.token);
      localStorage.setItem("marketplace_user", JSON.stringify(data.user));
      Swal.fire({ icon: "success", title: "Welcome back!", timer: 1200, showConfirmButton: false });
      if (data.user.profileCompleted) {
        navigate("/");
      } else {
        navigate("/profile/complete");
      }
    } catch (err) {
      setLoginError(err.message || "Login failed.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    if (!regEmail.trim() || !regPassword || !regFullName.trim()) {
      setRegisterError("Email, password and full name are required.");
      return;
    }
    if (regPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }
    if (!regTerms || !regPrivacy) {
      setRegisterError("You must accept the terms of use and privacy policy.");
      return;
    }
    setRegisterLoading(true);
    try {
      await registerMarketplaceUser({
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim() || undefined,
        password: regPassword,
        fullName: regFullName.trim(),
        termsAccepted: true,
        privacyAccepted: true,
      });
      Swal.fire({ icon: "success", title: "Account created! Please log in.", timer: 2000, showConfirmButton: false });
      setTab(0);
      setEmailOrPhone(regEmail.trim().toLowerCase());
      setPassword("");
    } catch (err) {
      setRegisterError(err.message || "Registration failed.");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        bgcolor: BG_LIGHT,
      }}
    >
      {/* Left: Visual panel (hidden on small screens) */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: "50%",
          flex: "0 0 50%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: EMERALD_900,
          overflow: "hidden",
          position: "relative",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${leftPanelBgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: `linear-gradient(to bottom right, ${EMERALD_950}E6 0%, ${PRIMARY}33 100%)`,
          }}
        />

        {/* Top brand */}
        <Box sx={{ position: "relative", zIndex: 2, p: "clamp(0.75rem, 1.5vh, 1.5rem)", flexShrink: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: "clamp(32px, 4vh, 40px)",
                height: "clamp(32px, 4vh, 40px)",
                bgcolor: PRIMARY,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Agriculture sx={{ color: "white", fontSize: "clamp(20px, 2.5vh, 28px)" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "white", fontSize: "clamp(0.9rem, 1.5vh, 1.25rem)" }}>
              MK Agribusiness
            </Typography>
          </Box>
        </Box>

        {/* Center: headline + glass cards */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            px: "clamp(0.75rem, 1.5vh, 1.5rem)",
            py: "clamp(0.5rem, 2vh, 2rem)",
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "white",
              maxWidth: 400,
              lineHeight: 1.2,
              mb: "clamp(0.5rem, 1.5vh, 1.5rem)",
              fontSize: "clamp(1.25rem, 2.8vh, 1.85rem)",
            }}
          >
            Empowering Farmers with{" "}
            <Box component="span" sx={{ color: PRIMARY }}>
              Digital Intelligence
            </Box>
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(0.5rem, 1vh, 1rem)",
              maxWidth: 480,
            }}
          >
            {[
              { icon: <Monitor />, title: "Real-time Data", text: "Monitor crop health and soil quality instantly." },
              { icon: <Storefront />, title: "Global Market", text: "Connect directly with verified buyers worldwide." },
              { icon: <PrecisionManufacturing />, title: "Smart Tech", text: "Integrate IoT and drones into your workflow." },
              { icon: <VerifiedUser />, title: "Secure Trade", text: "Guaranteed protection for every transaction." },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  p: "clamp(0.5rem, 1.2vh, 1rem)",
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Box sx={{ color: PRIMARY, mb: 0.5, "& .MuiSvgIcon-root": { fontSize: "clamp(22px, 2.5vh, 28px)" } }}>{item.icon}</Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "white", mb: 0.25, fontSize: "clamp(0.85rem, 1.5vh, 1rem)" }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.8rem, 1.3vh, 0.95rem)" }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bottom note */}
        <Box sx={{ position: "relative", zIndex: 2, p: "clamp(0.5rem, 1vh, 1rem)", flexShrink: 0 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(0.8rem, 1.2vh, 0.95rem)" }}>
            © 2024 MK Agribusiness Consultants. Advancing the future of agriculture.
          </Typography>
        </Box>
      </Box>

      {/* Right: Auth card */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 6, sm: 7 },
          px: "clamp(0.5rem, 2vh, 1.5rem)",
          pb: "clamp(0.5rem, 2vh, 1.5rem)",
          bgcolor: BG_LIGHT,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Back to Home button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          disableRipple
          sx={{
            position: "absolute",
            top: { xs: 12, sm: 16 },
            left: { xs: 12, sm: 16 },
            color: "text.secondary",
            fontSize: "0.95rem",
            textTransform: "none",
            fontWeight: 600,
            outline: "none",
            "&:focus": { outline: "none", boxShadow: "none" },
            "&:focus-visible": { outline: "none", boxShadow: "none" },
            "&:hover": { color: PRIMARY, backgroundColor: "transparent" },
          }}
        >
          Back to Home
        </Button>

        {/* Mobile header */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            flexDirection: "column",
            alignItems: "center",
            mb: "clamp(0.5rem, 1.5vh, 1rem)",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: "clamp(40px, 5vh, 48px)",
              height: "clamp(40px, 5vh, 48px)",
              bgcolor: PRIMARY,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 0.5,
            }}
          >
            <Agriculture sx={{ color: "white", fontSize: "clamp(24px, 3vh, 32px)" }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: BG_DARK, fontSize: "clamp(0.9rem, 2vh, 1.25rem)" }}>
            MK Agribusiness
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 480,
            maxHeight: { xs: "none", lg: "min(85vh, 560px)" },
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "rgba(19, 212, 82, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(6, 78, 59, 0.08)",
            flexShrink: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            mt: 1.5,
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              minHeight: 42,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 700,
                py: 1,
                fontSize: "1rem",
                outline: "none",
                transition: "color 0.2s ease",
                "&:focus": { outline: "none" },
                "&:focus-visible": { outline: "none", boxShadow: "none" },
                "&.Mui-focusVisible": { outline: "none", boxShadow: "none", backgroundColor: "transparent" },
              },
              "& .Mui-selected": { color: PRIMARY },
              "& .MuiTabs-indicator": { backgroundColor: PRIMARY, height: 3 },
              "& .MuiTab-root:hover": { color: PRIMARY, opacity: 0.9 },
            }}
          >
            <Tab label="Login" disableRipple />
            <Tab label="Register" disableRipple />
          </Tabs>

          <Box sx={{ p: "clamp(0.75rem, 1.5vh, 1.5rem)", flex: 1, minHeight: 0, overflow: "auto" }}>
            {tab === 0 && (
              <>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: "clamp(1.25rem, 2.5vh, 1.75rem)" }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: "clamp(0.5rem, 1.5vh, 1rem)", fontSize: "clamp(0.95rem, 1.8vh, 1.05rem)" }}>
                  Access your agribusiness dashboard and marketplace operations.
                </Typography>

                {loginError && (
                  <Alert severity="error" sx={{ mb: 1 }} onClose={() => setLoginError("")}>
                    {loginError}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1.2vh, 1rem)" }}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    placeholder="name@company.com"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle sx={{ color: "action.active", fontSize: 24 }} />
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-notchedOutline": { "&:focus-within": { borderColor: PRIMARY } },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY, borderWidth: 2 },
                      },
                    }}
                    sx={{
                      "& label": { fontSize: "1rem" },
                      "& label.Mui-focused": { color: PRIMARY },
                      "& .MuiInputBase-input": { fontSize: "1rem" },
                    }}
                  />
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "action.active", fontSize: 24 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                            disableRipple
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                              "&:focus-visible": { outline: "none", boxShadow: "none" },
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-notchedOutline": { "&:focus-within": { borderColor: PRIMARY } },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY, borderWidth: 2 },
                      },
                    }}
                    sx={{
                      "& label": { fontSize: "1rem" },
                      "& label.Mui-focused": { color: PRIMARY },
                      "& .MuiInputBase-input": { fontSize: "1rem" },
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          sx={{ color: "text.secondary", "&.Mui-checked": { color: PRIMARY } }}
                        />
                      }
                      label={<Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.95rem" }}>Keep me logged in for 30 days</Typography>}
                    />
                    <Link href="#" variant="body2" sx={{ color: PRIMARY, fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
                      Forgot password?
                    </Link>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disableRipple
                    disabled={loginLoading}
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      bgcolor: PRIMARY,
                      color: BG_DARK,
                      textTransform: "none",
                      boxShadow: `0 10px 25px ${PRIMARY}40`,
                      outline: "none",
                      "&:focus": { outline: "none", boxShadow: `0 10px 25px ${PRIMARY}40` },
                      "&:focus-visible": { outline: "none", boxShadow: `0 10px 25px ${PRIMARY}40` },
                      "&:hover": { bgcolor: PRIMARY_DARK, boxShadow: `0 12px 28px ${PRIMARY}50` },
                    }}
                  >
                    {loginLoading ? <CircularProgress size={24} sx={{ color: BG_DARK }} /> : "Login to Dashboard"}
                  </Button>
                </Box>

                <Box sx={{ mt: "clamp(0.5rem, 1.5vh, 1rem)", pt: 1.5, borderTop: 1, borderColor: "divider", textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "clamp(0.9rem, 1.6vh, 1rem)" }}>
                    Don&apos;t have an account yet?{" "}
                    <Link
                      component="button"
                      variant="body2"
                      sx={{ color: PRIMARY, fontWeight: 700, textDecoration: "none", fontSize: "inherit", "&:hover": { textDecoration: "underline" } }}
                      onClick={() => setTab(1)}
                    >
                      Create an account
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ mt: "clamp(0.5rem, 1vh, 1rem)", display: "flex", alignItems: "center", justifyContent: "center", gap: 1, opacity: 0.7 }}>
                  <VerifiedUser sx={{ fontSize: 20, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", fontSize: "clamp(0.8rem, 1.2vh, 0.9rem)" }}>
                    Login required to protect farmers and buyers
                  </Typography>
                </Box>
              </>
            )}

            {tab === 1 && (
              <>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: "clamp(1.25rem, 2.5vh, 1.75rem)" }}>
                  Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: "clamp(0.5rem, 1.5vh, 1rem)", fontSize: "clamp(0.95rem, 1.8vh, 1.05rem)" }}>
                  Join the marketplace. You’ll complete your profile after signing up.
                </Typography>

                {registerError && (
                  <Alert severity="error" sx={{ mb: 1 }} onClose={() => setRegisterError("")}>
                    {registerError}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1.2vh, 1rem)" }}>
                  <TextField
                    fullWidth
                    type="email"
                    required
                    label="Email"
                    placeholder="name@company.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle sx={{ color: "action.active", fontSize: 24 }} />
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-notchedOutline": { "&:focus-within": { borderColor: PRIMARY } },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY, borderWidth: 2 },
                      },
                    }}
                    sx={{ "& label": { fontSize: "1rem" }, "& label.Mui-focused": { color: PRIMARY }, "& .MuiInputBase-input": { fontSize: "1rem" } }}
                  />
                  <TextField
                    fullWidth
                    label="Phone (optional)"
                    placeholder="+255..."
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: "action.active", fontSize: 24 }} />
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-notchedOutline": { "&:focus-within": { borderColor: PRIMARY } },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY, borderWidth: 2 },
                      },
                    }}
                    sx={{ "& label": { fontSize: "1rem" }, "& label.Mui-focused": { color: PRIMARY }, "& .MuiInputBase-input": { fontSize: "1rem" } }}
                  />
                  <TextField
                    fullWidth
                    required
                    label="Full name"
                    placeholder="Your full name"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "action.active", fontSize: 24 }} />
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-notchedOutline": { "&:focus-within": { borderColor: PRIMARY } },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY, borderWidth: 2 },
                      },
                    }}
                    sx={{ "& label": { fontSize: "1rem" }, "& label.Mui-focused": { color: PRIMARY }, "& .MuiInputBase-input": { fontSize: "1rem" } }}
                  />
                  <TextField
                    fullWidth
                    required
                    type={showRegPassword ? "text" : "password"}
                    label="Password"
                    placeholder="At least 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "action.active", fontSize: 24 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            edge="end"
                            size="small"
                            disableRipple
                            sx={{
                              outline: "none",
                              "&:focus": { outline: "none" },
                              "&:focus-visible": { outline: "none", boxShadow: "none" },
                            }}
                          >
                            {showRegPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-notchedOutline": { "&:focus-within": { borderColor: PRIMARY } },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY, borderWidth: 2 },
                      },
                    }}
                    sx={{ "& label": { fontSize: "1rem" }, "& label.Mui-focused": { color: PRIMARY }, "& .MuiInputBase-input": { fontSize: "1rem" } }}
                  />
                  <TextField
                    fullWidth
                    required
                    type={showRegPassword ? "text" : "password"}
                    label="Confirm password"
                    placeholder="Repeat password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    error={regPassword !== regConfirmPassword && regConfirmPassword.length > 0}
                    helperText={regPassword !== regConfirmPassword && regConfirmPassword.length > 0 ? "Passwords do not match" : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "action.active", fontSize: 24 }} />
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: "1rem",
                        "& .MuiOutlinedInput-notchedOutline": { "&:focus-within": { borderColor: PRIMARY } },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY, borderWidth: 2 },
                      },
                    }}
                    sx={{ "& label": { fontSize: "1rem" }, "& label.Mui-focused": { color: PRIMARY }, "& .MuiInputBase-input": { fontSize: "1rem" } }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={regTerms} onChange={(e) => setRegTerms(e.target.checked)} sx={{ "&.Mui-checked": { color: PRIMARY } }} />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.95rem" }}>
                        I accept the{" "}
                        <Link href="#" variant="body2" sx={{ color: PRIMARY }}>
                          Terms of Use
                        </Link>
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={regPrivacy} onChange={(e) => setRegPrivacy(e.target.checked)} sx={{ "&.Mui-checked": { color: PRIMARY } }} />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.95rem" }}>
                        I accept the{" "}
                        <Link href="#" variant="body2" sx={{ color: PRIMARY }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disableRipple
                    disabled={registerLoading}
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      bgcolor: PRIMARY,
                      color: BG_DARK,
                      textTransform: "none",
                      boxShadow: `0 10px 25px ${PRIMARY}40`,
                      outline: "none",
                      "&:focus": { outline: "none", boxShadow: `0 10px 25px ${PRIMARY}40` },
                      "&:focus-visible": { outline: "none", boxShadow: `0 10px 25px ${PRIMARY}40` },
                      "&:hover": { bgcolor: PRIMARY_DARK, boxShadow: `0 12px 28px ${PRIMARY}50` },
                    }}
                  >
                    {registerLoading ? <CircularProgress size={24} sx={{ color: BG_DARK }} /> : "Register"}
                  </Button>
                </Box>

                <Box sx={{ mt: "clamp(0.5rem, 1.5vh, 1rem)", pt: 1.5, borderTop: 1, borderColor: "divider", textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "clamp(0.9rem, 1.6vh, 1rem)" }}>
                    Already have an account?{" "}
                    <Link component="button" variant="body2" sx={{ color: PRIMARY, fontWeight: 700, textDecoration: "none" }} onClick={() => setTab(0)}>
                      Log in
                    </Link>
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Paper>

        {/* Footer links */}
        <Box sx={{ mt: "clamp(0.5rem, 1.5vh, 1rem)", display: "flex", gap: 2, flexShrink: 0 }}>
          <Link href="#" variant="body2" sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.9rem", "&:hover": { color: PRIMARY } }}>
            Privacy Policy
          </Link>
          <Link href="#" variant="body2" sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.9rem", "&:hover": { color: PRIMARY } }}>
            Terms of Service
          </Link>
          <Link href="#" variant="body2" sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.9rem", "&:hover": { color: PRIMARY } }}>
            Help Center
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
