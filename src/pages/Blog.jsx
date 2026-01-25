import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
  IconButton,
} from "@mui/material";
import {
  Search,
  ArrowForward,
  AccessTime,
  Payments,
  Recycling,
  ChevronLeft,
  ChevronRight,
  Agriculture,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const categories = [
  "All Posts",
  "Agri-Finance",
  "Agri-Tech",
  "Climate-Smart",
  "Livestock",
];

const featuredPosts = [
  {
    id: 1,
    title: "Bankable Agribusiness Proposal",
    category: "Agri-Finance",
    icon: <Payments fontSize="small" />,
    description: "Learn how to structure your proposal to secure funding and scale operations. We dive deep into financial forecasting, risk management, and investor expectations for the 2024 agricultural market.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWUsuEtMkZ-ZMvGF-t-ggHKRfLWy3AqkQd1mPhzJFoc0T6OBSraC9VwswWPS1o8ZKjoS-nEhZo45vLTOM_GPBsewS0jNA69livO_o9R1lYl4Uqqj3bYnnZGlV2OJ16EjMZw_QeEr3PEvDuEW2jS0h1Dyis7VDPep6gkA4OoClz9DaQGi70nYa7GDkuz_Ax-PruPZnf7-bNjnUj1RZZJWclk1HxL2Ao7K8dxui669MDUyR5qMOQY7lF5dW119Mpfu82jNt9jdegpreK",
  },
  {
    id: 2,
    title: "BSF Farming Guide",
    category: "Sustainable Tech",
    icon: <Recycling fontSize="small" />,
    description: "A comprehensive guide to Black Soldier Fly farming for sustainable feed production. Discover why BSF is the future of protein for poultry and fish farming across the continent.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATVi__6O-OiV7QFnJvil843alCQeGmxl7pySjoi69VtE0LlfrOWLRPDHW-z4ht9HerIp05z1y1hYp-4yq2XLE26rTopiGsPNqFE6Sh4NZuWXY1JjB1k5S7iLuvTrMUXraZAkoH19N_2VswvHLE7F5nSDbd5BPDqgHgMBU_xmlApgL0oZ4BaYIyWNv6wenFSl5OuEdUzIFJPGTZOtmKS7c3iLGP_ji1AwAyNdGTkDCjEIrkRwmso1SVPLG-ETWMMleN0UwDGePiC6ol",
  },
];

const latestArticles = [
  {
    id: 1,
    title: "Hydroponics for Urban Farmers",
    category: "Climate-Smart",
    description: "Maximizing yield in limited spaces using nutrient-rich water solutions and smart monitoring systems.",
    readTime: "5 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP4yxfxRucjPIl4t8GNMj83gXdgzmj-koQ9KFcpcdEwq37LpmOXO8BIF11VNjGewaZL5qyjRvME_3scZEh75eo58SEM67slHMVoDnzBu-9iHSSgRwVZdOu4DTV8b2g_2pAZVSpdakGS-o2uBi6c6ScqHLPgCdAMG2mtI93-z9-E8sEGrWRsNuqejBnhkUF3Z1j9ZPHyH91UmjErCVLmrrvAZBJsYur298qrz9TPUpwGvkYeL7XZuWe6v985YOCLdoZ_6ZaZCAcz4IS",
  },
  {
    id: 2,
    title: "IoT in Modern Irrigation",
    category: "Agri-Tech",
    description: "How sensors and automation are saving up to 40% of water costs while improving crop health.",
    readTime: "8 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCom-j2yR5pG05CTzLyQF5SNH7KrpiMgvS0OE9GlgtQBlDAZhh4Xvu0W1TYCo_P9UEElb2vP5Y7Hbvgt2XNLj8fO7DTXIKhE6GQ_7dFA92izFKlAlc9Xu-oOiQ8ffXLWh9jEooWCy4TX4yuIk2YUBxs_yo8wOJoW-UbtdwA_MbGPKzgdwRXMVy55M1v61ys0OvTLqxXjeQv1s_NjlcRij1Dj-yuqAI0s9qDNuvZXZ21rezLH8igaCK3ZXVUUiqVOG-XlcY-66mC3wzM",
  },
  {
    id: 3,
    slug: "soil-health-the-farmers-bank",
    title: "Soil Health: The Farmer's Bank",
    category: "Regenerative",
    description: "Strategies for restoring depleted soils through crop rotation and organic mineralization.",
    readTime: "6 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJw1vJYo0MzBQoaLFzmm-pFL2CRdnj5da1JJBdNVCj81v4WavcSThYdHK5QWtplJTnvO58OJcV9oV5rpUU5aHpsnP3Yx7qVFeRYcjncvofemrQIXcpzfw8dADYj3UjK6dbZ3XHb4VVf7-Drm23LhdMECzP9HpoKjucd3ILIIfhs0JSdqUrU75snyOqco17sbnxa7UfzXoDQTz9XAKLezb9zh46xJcUkKXoShOMluzpNokPuBeRpP8mGv5B7zupXw1r1h64hpoiuEt-",
  },
  {
    id: 4,
    title: "Accessing Green Grants",
    category: "Agri-Finance",
    description: "A directory of 2024 grants available for African agribusinesses focused on climate resilience.",
    readTime: "12 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCukQOnvNp8aGeGUfZqWgM90q7hwbEwyMaVlDc20f4obAKjMExXI0jllQ7542tZZi8gDFW_O91evrlikrDGgxiSwADelK_YfNK563WbtlLDRoA40G3PtPyhDOWiKDkphDhVipPZOQ1AdcMrIkR9wvXmkxyZMB3UwwrygFoPAB620KxQM9hZvlmhhiTZ6Ppd3b1_vYuFid7rwVpqSa1fpv6uB6FQSn-tdq2-atQphF-rS9KwrIEIViJ3_ulTBjyOQM2RKA88Sd3EFjad",
  },
  {
    id: 5,
    title: "Biosecurity in Poultry",
    category: "Livestock",
    description: "Protecting your investment through strict hygiene protocols and early disease detection.",
    readTime: "4 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLyvGv47bkqmAY7js6wQQIelGmyz9sAtbNz699yZNZGlle1BtN3Zn3DAsLxDw6kle62DXAzJ9It7gpY5ofnAePMt3mR-ya4Yral5SNvUmuSF1EJ7AyPENridz6UZ3wNLLnjDETQKgy9fvD_l7Tdhhv1zlb7HxQAaWpnUm9n580drZZdqym53hqZwrfYPmAlEsa_TOoy9JNInEMeWdAvGLUfoVwTXBYlMOR9UhcW-QFjn4tDGmhXaoGEda0rNsH861MiP9RaawfqQXq",
  },
  {
    id: 6,
    title: "From Farm to Digital Market",
    category: "Marketing",
    description: "How to brand and sell your produce directly to consumers using social media and e-logistics.",
    readTime: "7 min read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgAB12qJBrpRjUw1hDIgFfjVcPnFMAymJ_pzP18blghul6E-vbf84FCKCh4lhk7_dcu-GNDI1ilNq5zr03tKKfP9Y_vgj-1_9onqJ1cKXKhVqYq8HuvQ9-gVAvlhYcoVibTWvIsCb1jsoCqgRbbM8q37irlSiF8q-_L_eRCeinxrfUzFxZN9Kvn6nX5a61_K-ZclAgi0fSLosaRQjjsMZRts4STf_Id4gir0_mEAH0oljdqxYj7MsqTFRshFytwoGaNFsCwuis_t8F",
  },
];

// Helper function to create slug from title or use id
const createSlug = (post) => {
  if (post.slug) return post.slug;
  if (post.title) {
    return post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  return post.id.toString();
};

// Add slugs to sample posts to match BlogDetail
const featuredPostsWithSlugs = featuredPosts.map(post => ({
  ...post,
  slug: createSlug(post),
}));

const latestArticlesWithSlugs = latestArticles.map(article => ({
  ...article,
  slug: createSlug(article),
}));

export default function Blog() {
  const navigate = useNavigate();

  const handleReadArticle = (post) => {
    const slug = createSlug(post);
    navigate(`/blog/${slug}`);
  };

  return (
    <Box
      sx={{
        pt: 1.5,
        pb: 0.3,
        px: 0,
        bgcolor: "#f6f8f6",
        background:
          "linear-gradient(135deg, rgba(246, 248, 246, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(246, 248, 246, 0.95) 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(15, 189, 15, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(13, 27, 13, 0.05) 0%, transparent 50%)",
          zIndex: 0,
        },
        fontFamily: '"Open Sans", sans-serif',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1.5, sm: 1.5, md: 1.5 },
          pt: { xs: 0.75, sm: 0.75, md: 0.75 },
          pb: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Paper
            elevation={3}
            sx={{
              py: { xs: 2, md: 3 },
              px: 0, // Removed side padding to allow stretching
              borderRadius: { xs: 3, md: 4 },
              background: "#FFFFFF",
              border: "1px solid rgba(15, 189, 15, 0.15)",
              flex: 1,
              mb: 0.3,
              overflow: "hidden",
            }}
          >
            {/* Page Heading - Wrapped in padding */}
            <Box sx={{ mb: 6, maxWidth: "1000px", px: 1.5 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 900,
                  color: "#0d1b0d",
                  mb: 2,
                  lineHeight: 1.1,
                }}
              >
                Resources & Blog
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  color: "#4c9a4c",
                  lineHeight: 1.6,
                  maxWidth: "800px",
                }}
              >
                Empowering farmers and agripreneurs with expert knowledge, sustainable strategies, and bankable insights to transform African agriculture.
              </Typography>
            </Box>

            {/* Category Filter & Search - Wrapped in padding */}
            <Box
              sx={{
                mb: 6,
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: 3,
                alignItems: { lg: "center" },
                justifyContent: "space-between",
                px: 1.5,
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {categories.map((category, idx) => (
                  <Button
                    key={idx}
                    variant={idx === 0 ? "contained" : "text"}
                    sx={{
                      bgcolor: idx === 0 ? "#0fbd0f" : "rgba(15, 189, 15, 0.05)",
                      color: idx === 0 ? "white" : "#0d1b0d",
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: idx === 0 ? "#0da50d" : "rgba(15, 189, 15, 0.1)",
                      },
                      "&:focus": { outline: "none" },
                      "&:focus-visible": { outline: "none" },
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </Box>
              <TextField
                placeholder="Search articles..."
                size="small"
                sx={{
                  width: { xs: "100%", lg: "300px" },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(15, 189, 15, 0.05)",
                    borderRadius: 2,
                    "& fieldset": { border: "none" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#0fbd0f" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Featured Section - Stretching edge-to-edge */}
            <Box sx={{ mb: 4, px: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, px: 0 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#0d1b0d" }}>
                  Featured Insights
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    sx={{
                      border: "1px solid #e7f3e7",
                      "&:focus": { outline: "none" },
                      "&:focus-visible": { outline: "none" },
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <IconButton
                    sx={{
                      border: "1px solid #e7f3e7",
                      "&:focus": { outline: "none" },
                      "&:focus-visible": { outline: "none" },
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gap: 3,
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                  },
                }}
              >
                {featuredPostsWithSlugs.map((post) => (
                  <Card
                    key={post.id}
                    sx={{
                      borderRadius: 4,
                      border: "1px solid #e7f3e7",
                      boxShadow: "none",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                        "& .MuiCardMedia-root": { transform: "scale(1.05)" },
                      },
                    }}
                  >
                    <Box sx={{ overflow: "hidden", aspectRatio: "16/9" }}>
                      <CardMedia
                        component="img"
                        image={post.image}
                        sx={{ transition: "transform 0.6s ease" }}
                      />
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#0fbd0f", mb: 2 }}>
                        {post.icon}
                        <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {post.category}
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                        {post.title}
                      </Typography>
                      <Typography sx={{ color: "rgba(0,0,0,0.6)", mb: 3, lineClamp: 3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {post.description}
                      </Typography>
                      <Button
                        endIcon={<ArrowForward />}
                        onClick={() => handleReadArticle(post)}
                        sx={{
                          color: "#0fbd0f",
                          fontWeight: 700,
                          p: 0,
                          "&:hover": { bgcolor: "transparent", gap: 1 },
                          "&:focus": { outline: "none" },
                          "&:focus-visible": { outline: "none" },
                        }}
                      >
                        Read Full Article
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Newsletter - Full Width inside Paper */}
            <Box
              sx={{
                mb: 4,
                bgcolor: "#e7f3e7",
                p: { xs: 4, md: 6 },
                mx: 1.5,
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -100,
                  right: -100,
                  width: 300,
                  height: 300,
                  bgcolor: "rgba(15, 189, 15, 0.03)",
                  borderRadius: "50%",
                  filter: "blur(60px)",
                }}
              />
              <Grid container spacing={4} alignItems="center" sx={{ position: "relative", zIndex: 1, maxWidth: "1200px", mx: "auto" }}>
                <Grid item xs={12} md={5}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, color: "#0d1b0d", fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
                    Stay Ahead of the Curve
                  </Typography>
                  <Typography sx={{ color: "#4c9a4c", fontSize: "1rem", lineHeight: 1.5, maxWidth: "450px" }}>
                    Join our community of 500+ agripreneurs. Stay updated with the latest in sustainable farming, market trends, and grant opportunities.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Box
                    component="form"
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "100%",
                      alignItems: "center",
                      justifyContent: { md: "flex-end" },
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Enter your email"
                      sx={{
                        bgcolor: "white",
                        borderRadius: 3,
                        maxWidth: "450px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          "& fieldset": { border: "none" },
                        },
                        "& .MuiInputBase-input": {
                          py: 2,
                          px: 2.5,
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#0fbd0f",
                        color: "white",
                        px: 4,
                        py: 2,
                        borderRadius: 3,
                        fontWeight: 700,
                        textTransform: "none",
                        whiteSpace: "nowrap",
                        boxShadow: "0 4px 14px 0 rgba(15,189,15,0.39)",
                        "&:hover": { 
                          bgcolor: "#0da50d",
                          boxShadow: "0 6px 20px rgba(15,189,15,0.23)",
                        },
                        "&:focus": { outline: "none" },
                        "&:focus-visible": { outline: "none" },
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Latest Articles - Stretching edge-to-edge */}
            <Box sx={{ mb: 6, px: 1.5 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, px: 0 }}>
                Latest Articles
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gap: 4,
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                }}
              >
                {latestArticlesWithSlugs.map((article) => (
                  <Card
                    key={article.id}
                    sx={{
                      borderRadius: 4,
                      border: "1px solid #e7f3e7",
                      boxShadow: "none",
                      overflow: "hidden",
                      bgcolor: "white",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                        "& .MuiCardMedia-root": { transform: "scale(1.05)" },
                      },
                    }}
                  >
                    <Box sx={{ overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        image={article.image}
                        sx={{
                          aspectRatio: "16/9",
                          transition: "transform 0.6s ease",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{
                          alignSelf: "flex-start",
                          bgcolor: "rgba(15, 189, 15, 0.1)",
                          color: "#0fbd0f",
                          fontWeight: 700,
                          mb: 2,
                          borderRadius: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, mb: 1, lineHeight: 1.2 }}
                      >
                        {article.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(0,0,0,0.6)", mb: 2, flex: 1 }}
                      >
                        {article.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          pt: 2,
                          borderTop: "1px solid #e7f3e7",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "rgba(0,0,0,0.5)",
                          }}
                        >
                          <AccessTime sx={{ fontSize: 16 }} />
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {article.readTime}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => handleReadArticle(article)}
                          sx={{
                            color: "#0fbd0f",
                            fontWeight: 700,
                            p: 0,
                            minWidth: 0,
                            "&:hover": {
                              bgcolor: "transparent",
                              textDecoration: "underline",
                            },
                            "&:focus": { outline: "none" },
                            "&:focus-visible": { outline: "none" },
                          }}
                        >
                          Read More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Pagination - Centered with padding */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8, pb: 4 }}>
              <Pagination
                count={12}
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 700,
                    "&.Mui-selected": {
                      bgcolor: "#0fbd0f",
                      color: "white",
                      "&:hover": { bgcolor: "#0da50d" },
                    },
                    "&:focus": { outline: "none" },
                    "&:focus-visible": { outline: "none" },
                  },
                }}
              />
            </Box>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
}
