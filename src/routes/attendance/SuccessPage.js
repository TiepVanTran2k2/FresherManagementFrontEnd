import { Box, Button, Typography, Container } from "@mui/material";

export default function SuccessPage() {

  return (
    <Container>
      <Box sx={{ maxWidth: 500, margin: "auto", textAlign: "center" }}>
        <Typography
          variant="h3"
          paragraph
          style={{ fontWeight: 700, color: "#212b36", lineHeight: 1.5 }}
        >Successful attendance</Typography>

        <Box
          component="img"
          src="/images/success.png"
          sx={{ height: 400, mx: "auto", my: { xs: 5, sm: 10 } }}
        />
      </Box>
    </Container>
  );
}
