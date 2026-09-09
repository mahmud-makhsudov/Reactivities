import { ArrowBack, Home, SearchOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          px: { xs: 3, md: 8 },
          py: { xs: 5, md: 8 },
          borderRadius: 3,
          border: "1px solid rgba(33, 138, 174, 0.16)",
          background: "linear-gradient(145deg, #ffffff 0%, #f0fbfc 100%)",
          textAlign: "center",
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: -90,
            right: -70,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(32, 167, 172, 0.11)",
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            bottom: -130,
            left: -90,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(24, 42, 115, 0.08)",
          }}
        />

        <Stack position="relative" alignItems="center" spacing={3}>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 82,
              height: 82,
              borderRadius: "50%",
              color: "#218aae",
              backgroundColor: "rgba(33, 138, 174, 0.12)",
            }}
          >
            <SearchOff sx={{ fontSize: 42 }} />
          </Box>
          <Typography
            component="p"
            sx={{
              mb: -2,
              color: "#218aae",
              fontSize: { xs: "4.5rem", md: "6.5rem" },
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "0.04em",
            }}
          >
            404
          </Typography>
          <Typography variant="h4" fontWeight={700} color="#182a73">
            This activity wandered off
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 460, fontSize: "1.05rem", lineHeight: 1.7 }}
          >
            We could not find the page you were looking for. It may have moved,
            or the link may be out of date.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ pt: 1, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => navigate("/")}
              sx={{
                minWidth: 170,
                py: 1.25,
                borderRadius: 2,
                background: "linear-gradient(135deg, #182a73, #218aae)",
              }}
            >
              Go home
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{ minWidth: 170, py: 1.25, borderRadius: 2 }}
            >
              Go back
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
