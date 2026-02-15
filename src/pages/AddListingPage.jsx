import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  InputAdornment,
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import { createListing, updateListing } from "../api";
import Footer from "../components/Footer/Footer";

const PRIMARY = "#17cf54";
const BG_LIGHT = "#f6f8f6";
const BORDER_LIGHT = "#d0e7d7";
const TEXT_MUTED = "#4e9767";

export default function AddListingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const editListing = location.state?.editListing || null;
  const isEdit = !!editListing?.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("");
  const [location_, setLocation_] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editListing) {
      setTitle(editListing.title || "");
      setDescription(editListing.description || "");
      setCategory(editListing.category || "");
      setPrice(editListing.price != null ? String(editListing.price) : "");
      setPriceUnit(editListing.priceUnit || "");
      setQuantity(editListing.quantity != null ? String(editListing.quantity) : "");
      setQuantityUnit(editListing.quantityUnit || "");
      setLocation_(editListing.location || "");
      setImageUrl(editListing.imageUrl || "");
    }
  }, [editListing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedTitle = (title || "").trim();
    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const body = {
        title: trimmedTitle,
        description: (description || "").trim() || undefined,
        category: (category || "").trim() || undefined,
        price: price !== "" && !isNaN(parseFloat(price)) ? parseFloat(price) : undefined,
        priceUnit: (priceUnit || "").trim() || undefined,
        quantity: quantity !== "" && !isNaN(parseFloat(quantity)) ? parseFloat(quantity) : undefined,
        quantityUnit: (quantityUnit || "").trim() || undefined,
        location: (location_ || "").trim() || undefined,
        imageUrl: (imageUrl || "").trim() || undefined,
      };
      if (isEdit) {
        await updateListing(editListing.id, body);
        navigate("/marketplace/my-listings", { state: { message: "Listing updated." } });
      } else {
        await createListing(body);
        navigate("/marketplace/my-listings", { state: { message: "Listing created. It will appear after admin approval." } });
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BG_LIGHT, color: "#0e1b12", pt: 2, pb: 4 }}>
      <Box sx={{ maxWidth: 720, mx: "auto", px: { xs: 2, sm: 3 } }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/marketplace/my-listings")}
          sx={{ mb: 2, color: TEXT_MUTED }}
        >
          Back to my listings
        </Button>

        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          {isEdit ? "Edit listing" : "Add new listing"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {isEdit
            ? "Update the details below. After saving, the listing will remain in its current approval status."
            : "List what you want to sell. Your listing will be reviewed by the admin before it appears publicly."}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: BORDER_LIGHT,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Organic maize, 50kg bags"
                size="small"
                inputProps={{ maxLength: 255 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product or service"
                multiline
                rows={4}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Grains, Feeds, Livestock"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={location_}
                onChange={(e) => setLocation_(e.target.value)}
                placeholder="e.g. Nairobi, Kenya"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                size="small"
                inputProps={{ min: 0, step: "any" }}
                InputProps={{
                  endAdornment: priceUnit ? (
                    <InputAdornment position="end">{priceUnit}</InputAdornment>
                  ) : null,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price unit"
                value={priceUnit}
                onChange={(e) => setPriceUnit(e.target.value)}
                placeholder="e.g. KES, USD, per kg"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                size="small"
                inputProps={{ min: 0, step: "any" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity unit"
                value={quantityUnit}
                onChange={(e) => setQuantityUnit(e.target.value)}
                placeholder="e.g. kg, bags, tonnes"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... or /uploads/..."
                size="small"
                helperText="Paste a link to a product image, or leave blank"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Save />}
              disabled={submitting}
              sx={{ bgcolor: PRIMARY, "&:hover": { bgcolor: "#12a842" } }}
            >
              {submitting ? "Saving…" : isEdit ? "Save changes" : "Create listing"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/marketplace/my-listings")}
              disabled={submitting}
              sx={{ borderColor: BORDER_LIGHT, color: TEXT_MUTED }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
}
