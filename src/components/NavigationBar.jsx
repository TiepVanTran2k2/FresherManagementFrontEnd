import { Box, AppBar, Toolbar, Stack, Button, Link } from "@mui/material";

export default function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "end" }}>
          <Stack direction="row" spacing={2}>
            <Button color="inherit">
              <Link
                color="inherit"
                href="/login"
                variant="body2"
                underline="none"
              >
                Feedback
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                color="inherit"
                href="/login"
                variant="body2"
                underline="none"
              >
                Mail
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                color="inherit"
                href="/login"
                variant="body2"
                underline="none"
              >
                Login
              </Link>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
