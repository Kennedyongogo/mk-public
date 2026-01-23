import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import {
  RocketLaunch,
  Visibility,
  CheckCircle,
  Verified,
  Gavel,
  Lightbulb,
  WorkspacePremium,
  Nature,
  Groups,
  Mail,
  Phone,
  LocationOn,
  Public,
  Share,
} from "@mui/icons-material";

export default function Team() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "rgba(255, 255, 255, 0.5)",
        display: "flex",
        flexDirection: "column",
        py: { xs: 0.75, md: 0.75 },
      }}
    >
      <Card
        sx={{
          mx: { xs: 0.75, md: 0.75 },
          mt: { xs: 0.5, md: 0.5 },
          mb: { xs: 0.5, md: 0.5 },
          borderRadius: 3,
          border: "1px solid #cfe7cf",
          backgroundColor: "#f6f8f6",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Hero Section: Who We Are */}
      <Box
        sx={{
          pt: 1,
          pb: { xs: 2.5, md: 5 },
        }}
      >
        <Container maxWidth="lg" disableGutters sx={{ pl: { xs: 1, md: 0.2 }, pr: { xs: 1, md: 2 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "center",
            }}
          >
            {/* Left: Image Card */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                flexShrink: 0,
                display: { xs: "flex", md: "block" },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Card
                sx={{
                  width: { xs: "calc(100% - 1rem)", md: "100%" },
                  maxWidth: { xs: "400px", md: "none" },
                  aspectRatio: { xs: "4/3", md: "1/1" },
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 6,
                  minHeight: { xs: "300px", md: "400px" },
                  mx: { xs: "0.5rem", md: 0 },
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=1200&fit=crop&q=90"
                  alt="Agricultural experts"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Card>
            </Box>
            {/* Right: Typography Content */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                flexShrink: 0,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box
                  sx={{
                    bgcolor: "rgba(17, 212, 17, 0.1)",
                    color: "#11d411",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    px: 2,
                    py: 0.5,
                    borderRadius: "9999px",
                    width: "fit-content",
                  }}
                >
                  Who We Are
                </Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3rem" },
                    fontWeight: 900,
                    color: "#0d1b0d",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Bridging <span style={{ color: "#11d411" }}>Science</span> and
                  Practical Farming
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(13, 27, 13, 0.7)",
                    fontSize: "1.25rem",
                    lineHeight: 1.75,
                  }}
                >
                  MK Agribusiness Consultants provides expert guidance in
                  Agricultural Economics and Project Management to ensure
                  sustainable growth and food security. We believe that by
                  combining data-driven insights with traditional farming wisdom,
                  we can revolutionize the global food supply chain.
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(13, 27, 13, 0.7)",
                    fontSize: "1.25rem",
                    lineHeight: 1.75,
                  }}
                >
                  Founded on the principles of integrity and innovation, our firm
                  serves as a strategic partner to commercial farmers,
                  agribusinesses, and governmental bodies aiming for excellence
                  in productivity and ecological balance.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#11d411",
                      color: "white",
                      fontWeight: 700,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      minWidth: 140,
                      "&:hover": {
                        bgcolor: "#0fb80f",
                        boxShadow: 4,
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Our Services
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#11d411",
                      color: "#11d411",
                      fontWeight: 700,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      minWidth: 140,
                      borderWidth: 2,
                      "&:hover": {
                        borderColor: "#11d411",
                        bgcolor: "rgba(17, 212, 17, 0.05)",
                        borderWidth: 2,
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                    onClick={() => navigate("/staff")}
                  >
                    Meet the Team
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Two Cards Section */}
      <Box sx={{ bgcolor: "white", pt: 2, pb: 4 }}>
        <Container maxWidth="xl" disableGutters sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#0d1b0d",
                mb: 2,
              }}
            >
              Our Strategic Direction
            </Typography>
            <Box
              sx={{
                width: 64,
                height: 4,
                bgcolor: "#11d411",
                mx: "auto",
                borderRadius: "9999px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 0.3,
              width: "100%",
            }}
          >
            {/* First Card - Mission */}
            <Card
              sx={{
                flex: 1,
                borderRadius: 3,
                border: "1px solid #cfe7cf",
                bgcolor: "#f8fcf8",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                p: 4,
                ml: 0.3,
                "&:hover": {
                  boxShadow: 8,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography
                  sx={{
                    color: "#11d411",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Our Mission
                </Typography>
                <RocketLaunch
                  sx={{
                    fontSize: 40,
                    color: "#11d411",
                    opacity: 0.5,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 3 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3rem" },
                    fontWeight: 900,
                    color: "#0d1b0d",
                  }}
                >
                  Growth
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#11d411",
                  }}
                >
                  Global Impact
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  "To provide transparent consulting practices across all agricultural sectors.",
                  "Empowering farmers through cutting-edge technological innovation.",
                  "Driving economic resilience and food security in developing regions.",
                ].map((text, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 2 }}>
                    <CheckCircle sx={{ color: "#11d411", fontSize: 24 }} />
                    <Typography
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        color: "rgba(13, 27, 13, 0.9)",
                      }}
                    >
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Second Card - Vision */}
            <Card
              sx={{
                flex: 1,
                borderRadius: 3,
                border: "1px solid #cfe7cf",
                bgcolor: "#f8fcf8",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                p: 4,
                mr: 0.3,
                "&:hover": {
                  boxShadow: 8,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography
                  sx={{
                    color: "#11d411",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Our Vision
                </Typography>
                <Visibility
                  sx={{
                    fontSize: 40,
                    color: "#11d411",
                    opacity: 0.5,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 3 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3rem" },
                    fontWeight: 900,
                    color: "#0d1b0d",
                  }}
                >
                  Future
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#11d411",
                  }}
                >
                  Sustainable Earth
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  "Becoming the leading bridge between global AgTech and local producers.",
                  "Ensuring a carbon-neutral and ecologically balanced farming future.",
                  "Global leadership in Agribusiness data analytics and project management.",
                ].map((text, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 2 }}>
                    <Verified sx={{ color: "#11d411", fontSize: 24 }} />
                    <Typography
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        color: "rgba(13, 27, 13, 0.9)",
                      }}
                    >
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Core Values Grid */}
      <Box sx={{ pt: 2, pb: 5, px: 0, bgcolor: "#f6f8f6" }}>
        <Container maxWidth="xl" disableGutters sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#0d1b0d",
                mb: 1,
              }}
            >
              Our Core Values
            </Typography>
            <Typography
              sx={{
                color: "rgba(13, 27, 13, 0.6)",
                mt: 1,
                fontSize: "2rem",
              }}
            >
              The principles that guide every consulting engagement
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: { xs: "nowrap", sm: "wrap", md: "nowrap" },
              width: "100%",
            }}
          >
            {[
              {
                icon: Gavel,
                title: "Integrity",
                description:
                  "Transparent and ethical consulting practices in every project.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description:
                  "Leveraging modern data and AgTech for superior results.",
              },
              {
                icon: WorkspacePremium,
                title: "Expertise",
                description:
                  "World-class knowledge in Agricultural Economics.",
              },
              {
                icon: Nature,
                title: "Sustainability",
                description:
                  "Commitment to long-term ecological and economic health.",
              },
              {
                icon: Groups,
                title: "Empowerment",
                description:
                  "Prioritizing the success and growth of the producer.",
              },
            ].map((value, index) => (
              <Paper
                key={index}
                sx={{
                  flex: { xs: "0 0 calc(100% - 1rem)", sm: "0 0 calc(50% - 1rem)", md: "1 1 0" },
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  border: "1px solid rgba(17, 212, 17, 0.1)",
                  bgcolor: "white",
                  transition: "transform 0.3s",
                  minWidth: 0,
                  m: 0.7,
                  ml: index === 0 ? 1.5 : 0.7,
                  mr: index === 4 ? 1.5 : 0.7,
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "rgba(17, 212, 17, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <value.icon sx={{ fontSize: 32, color: "#11d411" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: "1.375rem",
                    fontWeight: 700,
                    mb: 1,
                    color: "#0d1b0d",
                  }}
                >
                  {value.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    color: "rgba(13, 27, 13, 0.7)",
                  }}
                >
                  {value.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Our Team Section */}
      <Box sx={{ pt: 2, pb: 10, bgcolor: "white" }}>
        <Container maxWidth="lg" disableGutters sx={{ pl: { xs: 1, md: 0.2 }, pr: { xs: 1, md: 2 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "center",
            }}
          >
            {/* Left: Typography Content */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                flexShrink: 0,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  color: "#0d1b0d",
                  mb: 3,
                }}
              >
                Our Leadership & Expertise
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: "rgba(13, 27, 13, 0.8)",
                  lineHeight: 1.75,
                  mb: 3,
                }}
              >
                The team at MK Agribusiness Consultants is comprised of veteran
                Agricultural Economists, certified Project Managers, and data
                scientists. With decades of combined experience in both the
                private sector and international development, we bring a unique
                perspective to every challenge.
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: "rgba(13, 27, 13, 0.7)",
                  lineHeight: 1.75,
                  mb: 4,
                }}
              >
                Our leaders have spearheaded large-scale irrigation projects,
                implemented regional food security policies, and optimized supply
                chains for some of the world's most successful agribusiness firms.
                We don't just consult; we partner with you to achieve tangible,
                measurable success.
              </Typography>
              <Box sx={{ display: "flex", gap: { xs: 1, md: 4 }, flexWrap: { xs: "nowrap", md: "wrap" }, justifyContent: { xs: "space-between", md: "flex-start" } }}>
                <Box sx={{ flex: { xs: 1, md: "none" }, textAlign: { xs: "center", md: "left" } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      fontWeight: 900,
                      color: "#11d411",
                    }}
                  >
                    15+
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.65rem", md: "0.75rem" },
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#0d1b0d",
                    }}
                  >
                    Years Experience
                  </Typography>
                </Box>
                <Box sx={{ flex: { xs: 1, md: "none" }, textAlign: { xs: "center", md: "left" } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      fontWeight: 900,
                      color: "#11d411",
                    }}
                  >
                    200+
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.65rem", md: "0.75rem" },
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#0d1b0d",
                    }}
                  >
                    Projects Delivered
                  </Typography>
                </Box>
                <Box sx={{ flex: { xs: 1, md: "none" }, textAlign: { xs: "center", md: "left" } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      fontWeight: 900,
                      color: "#11d411",
                    }}
                  >
                    12
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.65rem", md: "0.75rem" },
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#0d1b0d",
                    }}
                  >
                    Country Presence
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* Right: Image Card */}
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                flexShrink: 0,
                display: { xs: "flex", md: "block" },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Card
                sx={{
                  width: { xs: "calc(100% - 1rem)", md: "calc(100% - 0.5rem)" },
                  maxWidth: { xs: "400px", md: "100%" },
                  borderRadius: 3,
                  border: "1px solid #cfe7cf",
                  bgcolor: "#f8fcf8",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  p: { xs: 2, md: 2.5 },
                  mx: { xs: "0.5rem", md: "0.25rem" },
                  boxSizing: "border-box",
                }}
              >
                <Box 
                  sx={{ 
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: { xs: 1, md: 1.5 }, 
                    width: "100%", 
                    boxSizing: "border-box",
                    m: 0,
                  }}
                >
                  {[
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCrlvq7TO5Hmmjiu38GpcYn5eFZ2oDmAyOr3-Fe5HyZ3wrFIA-BCkxxKBawD8yAijgeORAf2KWD2zslSs0sGHzVCT_ImfsI29ofu_BhHqyY2YOoJbyD0zxinDULWl6thFPpX_vmZ65S0rYgHF_NqCJ7PHH8IBozCgmKfrFnvhXUODMwKhnAIf8UJYCwSoPFUihdbbSnOupkYyRbUuxpjFhNjf_dtDPRu7_2M3OWHb_Swif2XZmS1FlP6UYzkur1bsYRDOmrpbP226V_",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAd0CWiR4TdUEDo6ggiMyc3TJ9FW8NhSr6QAegMUnURmqF9LL0F3IixCQyTKrhM81B6GNSNTv7daHK1RZ8HHS9ydHUKRnMcuLo9FL8Sn4bMGAuk_qP64jGgpVbw98l7_By2VdPExmNDNr7DYFw-LAHRndwXALDTUtlaOFnJu6vAbPeoCkIgt5cWJXK6T7nOX6mGv9JKDWz-XF-yq27Awi7-KNF8sA4STGeuqz3QKqH6dxMNvwC7vC1Z-1rY9TzrCfKXgaYdp2rpkoDv",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCrJKNOAMXLc3d0wxUM11CpLM_MUwrTV4PXvDkQUwFP27alatv5liUrxh2KB_3efpks10NmcgRMCmRO2syCiOD59U4_vLxhos1lg2WubYqiLSyTcKOwe1HsAIemmGCxpxQDD8ZlMnDYwfkCRied20TwmGNw3yOgQKx9FU2yqA3RyGKksePf8wLPrsVaAnPLNvdVpYcJvQJKyc7H8TVrrINTJrf5uOiKmrERsQegLjygvFr0eFXO9ieKUfz44c2PhK8-GIndBghenCZW",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDUt-9JYaePQEmb5pB3XhwVVYp1XyuMt-36fbt04Ry8Ct9zmKrQ36BWJxU8ik2wL_Uv_hZEkoRwW9nXqz08jNxZS3ldPCu1u-Q8tTowLAi1cv62-YvIvGFQh0kwvAuS7EaYYohVLqv8AFimn9AmigOfuie2-AvkMb5U1YF0d48GZOULMiQ5hwSQdzc3YwQU8F0ZhfeeYw2chjPw2e6fjU-Ce6_yEcFfykrD7BEAxz7mnQWylMVvnyfrbau5SiTBz_9IxXQLDgQhWwf2",
                  ].map((imageUrl, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        aspectRatio: "1",
                        borderRadius: 3,
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: 4,
                        boxSizing: "border-box",
                        overflow: "hidden",
                      }}
                    />
                  ))}
                </Box>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ pt: 0, pb: 2, px: 2 }}>
        <Container maxWidth="lg">
          <Paper
            sx={{
              bgcolor: "#11d411",
              color: "white",
              p: 6,
              borderRadius: 4,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 256,
                height: 256,
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                transform: "translate(50%, -50%)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 128,
                height: 128,
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                transform: "translate(-50%, 50%)",
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 900,
                  mb: 2,
                  color: "white",
                }}
              >
                Ready to optimize your harvest?
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  opacity: 0.9,
                  mb: 4,
                  maxWidth: "42rem",
                  mx: "auto",
                }}
              >
                Join the hundreds of agribusinesses that have transformed their
                operations with our expert consulting.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    color: "#11d411",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  Get in Touch
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    borderWidth: 2,
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      borderWidth: 2,
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  View Our Portfolio
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      </Card>
    </Box>
  );
}
