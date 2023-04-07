import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, selectUser } from "../redux/features/user/userSlice";

const styles = {
  loginPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom, hsla(17,73%,79%,1) 0%,hsla(17,80%,31%,1) 50%,hsla(17,98%,23%,1) 51%,hsla(17,47%,53%,1) 100%)",
    width: "100vw",
    height: "100vh",
  },
  formPage: {
    backgroundColor: "white",
    padding: "0% 5%",
    borderRadius: "10px",
    border: "3px solid black",
  },
  errorMessages: {
    color: "#B80A26",
  },
  signInForm: {
    flexDirection: "column",
    display: "flex",
    margin: "10% 0%",
  },
  form: {
    flexDirection: "column",
    display: "flex",
  },
  redText: {
    width: "186px",
    height: "42px",
    fontFamily: "Helvetica",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    color: "#B80A26",
  },
  navLink: {
    textDecoration: "none",
  },
  signinButton: {
    borderRadius: "10px",
    fontFamily: "Helvetica",
    fontStyle: "normal",
    backgroundColor: "#2874f0",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "2px",
    textTransform: "unset !important",
  },
  signInTypo: {
    fontFamily: "Helvetica",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "123.5%",
    color: "#2874f0",
    marginBottom: "15px",
  },
};

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRedux = useSelector(selectUser);
  const [helperMessege, setHelperMessege] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleHelperMessege = async () => {
    setHelperMessege(true);
    setTimeout(() => {
      setHelperMessege(false);
    }, 3000);
  };

  const onSubmit = async ({ password, secreteKey }, { setSubmitting }) => {
    const isValidKey =
      atob(userRedux.mySecrete) === secreteKey ? true : false;
    if (!(userRedux.myPassword === password) || !isValidKey) {
      handleHelperMessege();
      setSubmitting(false);
    } else {
      navigate("/dashboard");
    }
  };

  const handleResetExtension = async () => {
    dispatch(resetUser());
    navigate("/");
  };

  const validationSchemaSignin = Yup.object({
    secreteKey: Yup.string().required("Secrete is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Box sx={styles.loginPage}>
      <Box sx={styles.formPage}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "4% 0%",
            paddingBottom: "2%",
            borderBottom: "2px solid grey",
          }}
        >
          <div style={styles.signInTypo}>{"Sign In to Portal"}</div>
          <Button
            variant="contained"
            sx={{ ...styles.signinButton, backgroundColor: "red" }}
            onClick={handleResetExtension}
          >
            RESET EXTENSION
          </Button>
        </Box>
        <Formik
          initialValues={{ secreteKey: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={validationSchemaSignin}
        >
          {({ errors, isSubmitting, isValid, values, handleChange }) => (
            <>
              <Form style={styles.signInForm}>
                <FormControl sx={{ mb: 2 }} variant="outlined">
                  <TextField
                    label="Secrete Key"
                    variant="outlined"
                    name="secreteKey"
                    id="secreteKey"
                    onChange={handleChange("secreteKey")}
                  />
                  {errors.secreteKey && (
                    <FormHelperText
                      sx={styles.errorMessages}
                      id="filled-weight-helper-text"
                    >
                      {errors.secreteKey}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl sx={{}} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {errors.password && (
                    <FormHelperText
                      sx={styles.errorMessages}
                      id="filled-weight-helper-text"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                  <FormHelperText id="filled-weight-helper-text">
                    Password length Must be 6 characters, include 1 Capital
                    letter, 1 lowercase letter, 1 number, 1 Special character{" "}
                  </FormHelperText>
                </FormControl>
                {helperMessege ? (
                  <p style={styles.errorMessages}>
                    Credentials Didn't Matched i.e; Wrong secrete key or
                    password
                  </p>
                ) : null}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "8%",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={styles.signinButton}
                  >
                    SIGN IN AND REDIRECT TO DASHBOARD
                  </Button>
                </Box>
              </Form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Signin;
