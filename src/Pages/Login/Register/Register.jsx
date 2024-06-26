import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import GoogleButton from "react-google-button";
import Navigation from "../../Shared/Navigation/Navigation";
import Footer from "../../Shared/Footer/Footer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";

const Register = () => {
  const [userRegisterData, setUserRegisterData] = useState({});
  const { user, registerUser, signInWithGoogle, loading, authError } =
    useAuth();
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const location = useLocation();
  const navigate = useNavigate();

  // Linear Progress bar
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });
  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // MUI Input Adornments State
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  // MUI Input Adornments handlers
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handle input fields onBlur
  const handleInputOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newRegisterData = { ...userRegisterData };
    newRegisterData[field] = value;
    setUserRegisterData(newRegisterData);
  };

  // handle Login Submit
  const handleRegisterSubmit = (e) => {
    if (userRegisterData.password !== userRegisterData.password2) {
      alert("Passwords wrong");
      return;
    }
    registerUser(
      userRegisterData.email,
      userRegisterData.password,
      userRegisterData.name,
      navigate
    );
    e.preventDefault();
  };

  // handle google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle(location, navigate);
  };

  return (
    <>
      <Navigation></Navigation>
      <Container>
        <Grid container spacing={0}>
          <Grid
            item
            sx={{ mt: 8, mx: "auto", backgroundColor: "#fff" }}
            xs={10}
            sm={8}
            md={5}
            lg={5}
          >
            <Paper elevation={6}>
              <Box sx={{ py: 5 }}>
                <Typography
                  sx={{ color: "#000000", textAlign: "center", mb: 2 }}
                  variant="h5"
                  gutterBottom
                >
                  Welcome to SmartTechShop
                </Typography>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  Have an account?
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "#FF3E30",
                      marginLeft: "10px",
                      fontWeight: "600",
                    }}
                    to="/login"
                  >
                    Login Now
                  </NavLink>
                </Box>
                <form
                  onSubmit={handleRegisterSubmit}
                  style={{ width: "80%", margin: " 0 auto" }}
                >
                  <TextField
                    sx={{ width: "100%", mb: 2 }}
                    id="outlined-basic"
                    label="Name"
                    name="name"
                    type="text"
                    onBlur={handleInputOnBlur}
                    required
                    variant="outlined"
                  />
                  <TextField
                    sx={{ width: "100%", mb: 2 }}
                    id="outlined-basic"
                    label="Email"
                    name="email"
                    onBlur={handleInputOnBlur}
                    required
                    variant="outlined"
                  />
                  <FormControl sx={{ width: "100%", mb: 2 }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <MdVisibilityOff />
                            ) : (
                              <MdVisibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      name="password"
                      onBlur={handleInputOnBlur}
                    />
                  </FormControl>
                  <TextField
                    sx={{ width: "100%", mb: 2 }}
                    id="outlined-basic"
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    onBlur={handleInputOnBlur}
                    variant="outlined"
                    required
                  />
                  <FormGroup>
                    <FormControlLabel
                      required
                      control={<Checkbox />}
                      label="I agree to the Terms of Use and Privacy Policy"
                    />
                  </FormGroup>
                  <Button
                    sx={{
                      width: "100%",
                      height: "50px",
                      my: 2,
                      textTransform: "capitalize",
                      fontSize: "16px",
                    }}
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    Register
                  </Button>
                  <GoogleButton
                    label="Continue with Google"
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      textAlign: "center",
                    }}
                    type="dark"
                    onClick={handleGoogleSignIn}
                  />
                  {loading && (
                    <LinearProgress
                      variant="buffer"
                      value={progress}
                      sx={{ my: 3 }}
                      valueBuffer={buffer}
                    />
                  )}
                  {user?.email && (
                    <Alert severity="success">Login successfully!</Alert>
                  )}
                  {authError && <Alert severity="error">{authError}</Alert>}
                </form>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Register;
