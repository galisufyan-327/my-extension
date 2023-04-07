import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import * as Yup from "yup";
import { useState } from "react";
import { Form, Formik } from "formik";
import { passwordValidation } from "../utills/password";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import {
  setIsRegistered,
  setMyPassword,
} from "../redux/features/user/userSlice";

const styles = {
  Dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "2px solid grey",
    marginBottom: "8%",
  },
  errorMessages: {
    color: "#B80A26",
  },
  signInForm: {
    flexDirection: "column",
    display: "flex",
  },
  formContainer: {
    marginTop: "5%",
    width: "65%",
    margin: "0% 17%",
    fontFamily: "Montserrat",
    fontSize: "14px",
  },
  DialogHeader: {
    fontFamily: "OpenSans",
    fontStyle: "bold",
    fontWeight: 900,
    fontSize: "32px",
    lineHeight: "123.5%",
    color: "#2874f0",
    margin: "0%",
    marginBottom: "13px",
    paddingLeft: 0,
  },
  saveButton: {
    borderRadius: "10px",
    fontFamily: "Helvetica",
    fontStyle: "normal",
    margin: "8% 0%",
    backgroundColor: "#2874f0",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "2px",
    textTransform: "unset !important",
  },
};

const SetPasswordModal = (props) => {
  const { open, handleClose } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const titleMessage = "Enter Your Password";

  const onSubmit = async ({ password }, { setSubmitting }) => {
    try {
      dispatch(setMyPassword(password));
      dispatch(setIsRegistered(true));
      setSubmitting(false);
      await handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password field is required")
      .matches(
        passwordValidation,
        "Password length Must be 6 characters, include 1 Capital letter, 1 lowercase letter, 1 number, 1 Special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password field is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm Passwords must match to bove password"
      ),
  });

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
      <Box sx={styles.Dialog}>
        <DialogTitle sx={styles.DialogHeader}>{titleMessage} </DialogTitle>
      </Box>
      <Box sx={styles.formContainer}>
        <Stack spacing={2}>
          <Formik
            initialValues={{ password: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, isSubmitting, isValid, values, handleChange }) => (
              <>
                <Form style={styles.signInForm}>
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
                  </FormControl>
                  <FormControl sx={{ mt: 3 }} variant="outlined">
                    <InputLabel htmlFor="confirm-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      name="confirmPassword"
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={handleChange("confirmPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirmPassword visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                    {errors.confirmPassword && (
                      <FormHelperText
                        sx={styles.errorMessages}
                        id="filled-weight-helper-text"
                      >
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      sx={styles.saveButton}
                    >
                      SAVE AND REDIRECT TO LOGIN
                    </Button>
                  </Box>
                </Form>
              </>
            )}
          </Formik>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default SetPasswordModal;
