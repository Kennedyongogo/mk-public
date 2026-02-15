import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
} from "@mui/material";
import {
  ListAlt,
  ViewList,
  AddCircle,
  Edit,
  Delete,
  ArrowBack,
  Visibility,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  getMyListings,
  getPublicListings,
  getListingById,
  deleteListing,
} from "../api";
import Footer from "../components/Footer/Footer";

const PRIMARY = "#17cf54";
const BG_LIGHT = "#f6f8f6";
const BORDER_LIGHT = "#d0e7d7";
const TEXT_MUTED = "#4e9767";
const PLACEHOLDER_IMG = "https://placehold.co/400x240/f6f8f6/4e9767?text=Listing";

const getBaseUrl = () => {
  const env = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL;
  return env ? String(env).replace(/\/$/, "") : "";
};

const resolveImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = getBaseUrl();
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
};

const formatPrice = (price, unit) => {
  if (price == null || price === "") return null;
  const p = Number(price);
  if (isNaN(p)) return null;
  const u = unit && String(unit).trim() ? ` ${String(unit).trim()}` : "";
  return `${p.toLocaleString()}${u}`;
};

const statusLabel = (status) => {
  const s = String(status || "").replace(/_/g, " ");
  return s ? s.replace(/\b\w/g, (c) => c.toUpperCase()) : "";
};

export default function ListingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyListingsPath = location.pathname === "/marketplace/my-listings";

  const [tab, setTab] = useState(isMyListingsPath ? 0 : 1);
  const [myListings, setMyListings] = useState([]);
  const [publicListings, setPublicListings] = useState([]);
  const [loadingMy, setLoadingMy] = useState(false);
  const [loadingPublic, setLoadingPublic] = useState(false);
  const [error, setError] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [detailListing, setDetailListing] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || null);

  // Sync tab with path when navigating between /marketplace/my-listings and /marketplace/listings
  useEffect(() => {
    setTab(location.pathname === "/marketplace/my-listings" ? 0 : 1);
  }, [location.pathname]);

  // Show success message when returning from add/edit
  useEffect(() => {
    if (location.state?.message) setSuccessMessage(location.state.message);
  }, [location.state?.message]);

  const fetchMyListings = async () => {
    setLoadingMy(true);
    setError(null);
    try {
      const data = await getMyListings();
      setMyListings(data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load your listings");
      setMyListings([]);
    } finally {
      setLoadingMy(false);
    }
  };

  const fetchPublicListings = async () => {
    setLoadingPublic(true);
    setError(null);
    try {
      const data = await getPublicListings();
      setPublicListings(data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load listings");
      setPublicListings([]);
    } finally {
      setLoadingPublic(false);
    }
  };

  useEffect(() => {
    if (tab === 0) fetchMyListings();
    else fetchPublicListings();
  }, [tab]);

  const openDetail = async (id) => {
    setDetailId(id);
    setDetailListing(null);
    setDetailLoading(true);
    try {
      const data = await getListingById(id);
      setDetailListing(data.data);
    } catch (err) {
      setError(err.message || "Failed to load listing");
      setDetailId(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setDetailId(null);
    setDetailListing(null);
  };

  const handleEdit = (listing) => {
    closeDetail();
    navigate("/marketplace/add-listing", { state: { editListing: listing } });
  };

  const handleDelete = async (listing) => {
    const confirmed = await Swal.fire({
      title: "Delete listing?",
      text: `"${listing.title}" will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#4e9767",
      confirmButtonText: "Delete",
    });
    if (!confirmed.isConfirmed) return;
    setDeletingId(listing.id);
    try {
      await deleteListing(listing.id);
      setMyListings((prev) => prev.filter((l) => l.id !== listing.id));
      closeDetail();
      Swal.fire({
        icon: "success",
        title: "Listing deleted",
        text: "Your listing has been removed.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      setError(err.message || "Failed to delete listing");
    } finally {
      setDeletingId(null);
    }
  };

  const listings = tab === 0 ? myListings : publicListings;
  const loading = tab === 0 ? loadingMy : loadingPublic;
  const canEditDelete = (listing) =>
    tab === 0 &&
    listing &&
    (listing.status === "pending_approval" || listing.status === "rejected");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: BG_LIGHT,
        color: "#000",
        pt: 2,
        pb: 4,
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          px: { xs: 0.5, sm: 0.75 },
          mb: { xs: 0.5, sm: 0.75 },
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/marketplace/dashboard")}
          sx={{
            mt: { xs: 0.5, sm: 0.75 },
            mb: { xs: 0.5, sm: 0.75 },
            color: "#000",
            "&:focus": { outline: "none", boxShadow: "none" },
            "&:focus-visible": { outline: "none", boxShadow: "none" },
          }}
        >
          Dashboard
        </Button>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: BORDER_LIGHT,
            overflow: "hidden",
            p: { xs: "5px", sm: "9px" },
            boxSizing: "border-box",
            width: "calc(100% - 1px)",
            mx: "0.5px",
            mb: "2px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
              mb: 2,
              width: "100%",
              minWidth: 0,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#000", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
              Marketplace Listings
            </Typography>
            {tab === 0 && (
              <Button
                variant="contained"
                startIcon={<AddCircle />}
                onClick={() => navigate("/marketplace/add-listing")}
                sx={{
                  bgcolor: PRIMARY,
                  color: "#000",
                  fontWeight: 700,
                  ml: "auto",
                  mr: 1,
                  flexShrink: 0,
                  minWidth: "fit-content",
                  "&:hover": { bgcolor: "#12a842", color: "#000" },
                  "&:focus": { outline: "none", boxShadow: "none" },
                  "&:focus-visible": { outline: "none", boxShadow: "none" },
                }}
              >
                Add listing
              </Button>
            )}
          </Box>

          <Tabs
            value={tab}
            onChange={(_, v) => {
              setTab(v);
              navigate(v === 0 ? "/marketplace/my-listings" : "/marketplace/listings", { replace: true });
            }}
            sx={{
              borderBottom: 1,
              borderColor: BORDER_LIGHT,
              mb: 2,
              "& .MuiTab-root": { textTransform: "none", fontWeight: 600, color: "#000" },
            }}
          >
            <Tab icon={<ListAlt />} iconPosition="start" label="My listings" />
            <Tab icon={<ViewList />} iconPosition="start" label="All listings" />
          </Tabs>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress sx={{ color: PRIMARY }} />
            </Box>
          ) : listings.length === 0 ? (
            <Typography sx={{ py: 4, color: "#000" }}>
              {tab === 0
                ? "You have no listings yet. Add one to get started."
                : "No approved listings at the moment."}
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {listings.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: BORDER_LIGHT,
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={resolveImageUrl(item.imageUrl) || PLACEHOLDER_IMG}
                      alt={item.title}
                      sx={{ objectFit: "cover", bgcolor: "#e8f5e9" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ color: "#000" }}>
                        {item.title || "Untitled"}
                      </Typography>
                      {item.category && (
                        <Typography variant="caption" display="block" sx={{ color: "#000" }}>
                          {item.category}
                        </Typography>
                      )}
                      {formatPrice(item.price, item.priceUnit) && (
                        <Typography variant="body2" sx={{ color: "#000", fontWeight: 600, mt: 0.5 }}>
                          {formatPrice(item.price, item.priceUnit)}
                        </Typography>
                      )}
                      {tab === 0 && item.status && (
                        <Chip
                          label={statusLabel(item.status)}
                          size="small"
                          color={
                            item.status === "approved"
                              ? "success"
                              : item.status === "rejected"
                                ? "default"
                                : "warning"
                          }
                          sx={{ mt: 1 }}
                        />
                      )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 1 }}>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => openDetail(item.id)}
                        sx={{
                          color: "#000",
                          "&:focus": { outline: "none" },
                          "&:focus-visible": { outline: "none", boxShadow: "none" },
                        }}
                      >
                        View
                      </Button>
                      {canEditDelete(item) && (
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                            sx={{ "&:focus": { outline: "none" }, "&:focus-visible": { outline: "none", boxShadow: "none" } }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(item)}
                            disabled={deletingId === item.id}
                            color="error"
                            title="Delete"
                            sx={{ "&:focus": { outline: "none" }, "&:focus-visible": { outline: "none", boxShadow: "none" } }}
                          >
                            {deletingId === item.id ? (
                              <CircularProgress size={20} color="error" />
                            ) : (
                              <Delete fontSize="small" />
                            )}
                          </IconButton>
                        </Box>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Box>

      <Dialog
        open={!!detailId}
        onClose={closeDetail}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            "& .MuiDialogTitle-root, .MuiDialogContent-root": { color: "#000" },
            "& .MuiDialogActions-root .MuiButton-root:focus": { outline: "none", boxShadow: "none" },
            "& .MuiDialogActions-root .MuiButton-root:focus-visible": { outline: "none", boxShadow: "none" },
          },
        }}
      >
        <DialogTitle>Listing details</DialogTitle>
        <DialogContent dividers>
          {detailLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress sx={{ color: PRIMARY }} />
            </Box>
          ) : detailListing ? (
            <Box sx={{ pt: 0.5 }}>
              {detailListing.imageUrl && (
                <Box
                  component="img"
                  src={resolveImageUrl(detailListing.imageUrl) || PLACEHOLDER_IMG}
                  alt=""
                  sx={{ width: "100%", maxHeight: 240, objectFit: "cover", borderRadius: 1, mb: 2 }}
                />
              )}
              <Typography variant="h6">{detailListing.title || "Untitled"}</Typography>
              {detailListing.status && (
                <Chip
                  label={statusLabel(detailListing.status)}
                  size="small"
                  color={
                    detailListing.status === "approved"
                      ? "success"
                      : detailListing.status === "rejected"
                        ? "default"
                        : "warning"
                  }
                  sx={{ mt: 0.5, mb: 1 }}
                />
              )}
              {detailListing.description && (
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap", mb: 1 }}>
                  {detailListing.description}
                </Typography>
              )}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                {detailListing.category && (
                  <Typography variant="body2">
                    <strong>Category:</strong> {detailListing.category}
                  </Typography>
                )}
                {formatPrice(detailListing.price, detailListing.priceUnit) && (
                  <Typography variant="body2">
                    <strong>Price:</strong> {formatPrice(detailListing.price, detailListing.priceUnit)}
                  </Typography>
                )}
                {detailListing.quantity != null && detailListing.quantity !== "" && (
                  <Typography variant="body2">
                    <strong>Quantity:</strong> {detailListing.quantity}{" "}
                    {detailListing.quantityUnit || ""}
                  </Typography>
                )}
                {detailListing.location && (
                  <Typography variant="body2">
                    <strong>Location:</strong> {detailListing.location}
                  </Typography>
                )}
              </Box>
              {detailListing.user && (
                <Box sx={{ mt: 2, p: 1.5, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Seller
                  </Typography>
                  <Typography variant="body2">
                    {detailListing.user.fullName || detailListing.user.email}
                  </Typography>
                  {detailListing.user.phone && (
                    <Typography variant="body2" color="text.secondary">
                      {detailListing.user.phone}
                    </Typography>
                  )}
                </Box>
              )}
              {detailListing.status === "rejected" && detailListing.rejectedReason && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="caption">Rejection reason:</Typography>
                  <Typography variant="body2">{detailListing.rejectedReason}</Typography>
                </Alert>
              )}
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          {detailListing && canEditDelete(detailListing) && (
            <>
              <Button
                startIcon={<Edit />}
                onClick={() => handleEdit(detailListing)}
                sx={{ "&:focus": { outline: "none" }, "&:focus-visible": { outline: "none", boxShadow: "none" } }}
              >
                Edit
              </Button>
              <Button
                color="error"
                startIcon={<Delete />}
                onClick={() => handleDelete(detailListing)}
                disabled={deletingId === detailListing.id}
                sx={{ "&:focus": { outline: "none" }, "&:focus-visible": { outline: "none", boxShadow: "none" } }}
              >
                Delete
              </Button>
            </>
          )}
          <Button
            onClick={closeDetail}
            sx={{ "&:focus": { outline: "none" }, "&:focus-visible": { outline: "none", boxShadow: "none" } }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
}
