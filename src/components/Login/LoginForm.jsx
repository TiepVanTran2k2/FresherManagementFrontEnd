import { useState } from "react";

import authService from "../../services/authService";
import {
  Grid,
  TextField,
  Paper,
  Button,
  InputAdornment,
  IconButton,
  CardActionArea,
  CardActions
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { capitalizeFirstLetter } from "../../utils/string-utils";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';

const claimTypes = ["username", "email"];
const constraints = {
  [claimTypes[0]]: {
    minLength: 5,
    maxLength: 20,
  },
  [claimTypes[1]]: {
    minLength: 10,
    maxLength: 50,
  },
  password: {
    maxLength: 24,
  },
};

export default function LoginForm() {
  const [userClaim, setUserClaim] = useState({
    value: "",
    type: claimTypes[0],
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    isShown: false,
  });

  // Action: this function checks whether the claim is
  // a username or an email base on character "@".
  const handleChangeClaim = (e) => {
    let {
      currentTarget: { value },
    } = e;

    value = value.replace(/\s/g, "");

    if (value.includes("@")) {
      setUserClaim({
        value,
        type: claimTypes[1],
        error: getUserClaimErrorMessage(value, claimTypes[1]),
      });
    } else {
      setUserClaim({
        value,
        type: claimTypes[0],
        error: getUserClaimErrorMessage(value, claimTypes[0]),
      });
    }
  };

  // Action: this function prevent space character,
  // it doesn't handle other special characters yet
  const handleChangePassword = (e) => {
    let {
      currentTarget: { value },
    } = e;

    value = value.replace(/\s/g, "");

    if (value.length <= constraints.password.maxLength) {
      setPassword({ value, isShown: password.isShown });
    }
  };

  const handleClickShowPassword = () => {
    setPassword({ value: password.value, isShown: !password.isShown });
  };

  const handleMouseDownPassword = () => {
    setPassword({ value: password.value, isShown: !password.isShown });
  };

  const handleSubmit = (e) => {
    // Prevent default submitting action (go to subfix "?" url).
    e.preventDefault();

    loginAsync();
  };

  const loginAsync = async () => {
    try {
      if (userClaim.type === claimTypes[0]) {
        await authService.loginAsync(userClaim.value, null, password.value);
      } else {
        await authService.loginAsync(null, userClaim.value, password.value);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data: errorMessage } = error.response;
        setUserClaim({
          value: userClaim.value,
          type: userClaim.type,
          error: errorMessage,
        });
      }
    }
  };

  const isSubmitable = () => {
    return isValidUserClaim(userClaim.value, userClaim.type);
  };

  const isValidUserClaim = (value, claimType) => {
    return (
      value.length >= constraints[claimType].minLength &&
      value.length <= constraints[claimType].maxLength
    );
  };

  const getUserClaimErrorMessage = (value, claimType) => {
    if (!isValidUserClaim(value, claimType)) {
      const capUserClaim = capitalizeFirstLetter(claimType);

      return `${capUserClaim} length must be between ${constraints[claimType].minLength} and ${constraints[claimType].maxLength}.`;
    }

    return "";
  };

  const paperStyle = {
    padding: "20px",
    height: "24vh",
    width: 300,
    margin: "20px auto",
    "border-radius": "10px",
  };

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: '100vh' }}>
      <Grid container spacing={0} columns={12} justifyContent="center" alignItems="center">
        <Grid item xs={6} >
          <Container maxWidth='xs'>
            <Paper variant="outlined" style={{ padding: 30 }}>
              <Stack spacing={3} direction="column" justifyContent="center" alignItems="center">
                <img height={50} src='./images/logo_fpt.png' />
                <Typography variant="h5" gutterBottom component="div">
                  Login
                </Typography>
                <TextField
                  sx={{ margin: "10px auto" }}
                  value={userClaim.value}
                  label="Username/Email"
                  //type={userClaim.type === claimType[1] ? "email" : "text"}
                  onChange={handleChangeClaim}
                  error={Boolean(userClaim.error)}
                  helperText={userClaim.error}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ margin: "10px auto" }}
                  value={password.value}
                  label="Password"
                  type={password.isShown ? "text" : "password"}
                  onChange={handleChangePassword}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    // Toggle button.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {password.isShown ? (
                            <VisibilityIcon fontSize="small" />
                          ) : (
                            <VisibilityOffIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  required
                />
                <Button
                  color="primary"
                  type="submit"
                  variant="outlined"
                  disabled={!isSubmitable()}
                  onClick={handleSubmit}
                  fullWidth
                  required
                >
                  Login
                </Button>
              </Stack>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={6} style={{ backgroundImage: 'url("images/bg_right.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', minHeight: '100vh' }}>

        </Grid>
      </Grid>
    </Box>
  );
}
