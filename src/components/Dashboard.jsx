import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import SecreteGenrationModal from "../modals/SecreteGenerationModal";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/user/userSlice";

const styles = {
  homePage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom, hsla(17,73%,79%,1) 0%,hsla(17,80%,31%,1) 50%,hsla(17,98%,23%,1) 51%,hsla(17,47%,53%,1) 100%)",
    width: "100vw",
    height: "100vh",
  },
  infoPage: {
    backgroundColor: "white",
    padding: "0% 5%",
    paddingBottom: "2%",
    borderRadius: "10px",
    border: "3px solid black",
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
  submitButton: {
    borderRadius: "3px",
    fontFamily: "Helvetica",
    fontStyle: "normal",
    backgroundColor: "#2874f0",
    fontWeight: 700,
    fontSize: "14px",
    letterSpacing: "1px",
    marginBottom: "6%",
    textTransform: "unset !important",
  },
  typography: {
    fontFamily: "Helvetica",
    fontWeight: 600,
    fontSize: "20px",
    cursor: "pointer",
    marginTop: "20%",
    color: "#2874f0",
    border: "1px dotted #2874f0",
    padding: "1%",
    borderRadius: "5px",
  },
  key: {
    fontFamily: "Helvetica",
    fontWeight: 400,
    fontSize: "20px",
    marginLeft: "9%",
    textDecoration: "underline",
  },
  description: {
    fontFamily: "Helvetica",
    fontWeight: 200,
    fontSize: "15px",
    marginBottom: "10%",
  },
  messege: {
    fontFamily: "Helvetica",
    fontWeight: 200,
    fontSize: "15px",
    color: "rgb(43, 137, 6)",
  },
};

const Dashboard = () => {
  const userRedux = useSelector(selectUser);
  const [openSecreteKeyModal, setOpenSecreteKeyModal] = useState(false);
  const [messege, setMessege] = useState(false);
  const [processType, setProcessType] = useState("update");
  const navigate = useNavigate();

  const handleCloseSecreteKeyModal = () => {
    setOpenSecreteKeyModal(false);
    setMessege(true);
    setTimeout(() => {
      setMessege(false);
    }, 3000);
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  const handleUpdate = () => {
    setOpenSecreteKeyModal(true);
  };

  return (
    <Box sx={styles.homePage}>
      <Box sx={styles.infoPage}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid grey",
            margin: "7% 0%",
            paddingBottom: "2%",
          }}
        >
          <Typography sx={styles.signInTypo}>{"User Dashboard"}</Typography>
          <Button
            type="submit"
            variant="contained"
            onClick={handleLogout}
            sx={styles.submitButton}
          >
            LOG OUT
          </Button>
        </Box>
        <p style={styles.description}>
          Important: Don't Share secrete key with any one, keep it secure.
        </p>
        <p style={styles.typography}>
          My Secrete:{" "}
          <span style={styles.key}>{atob(userRedux.mySecrete)}</span>
        </p>
        {messege ? (
          <p style={styles.messege}>Secrete has been updated successfully!.</p>
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
            sx={styles.submitButton}
            onClick={handleUpdate}
          >
            UPDATE SECRETE
          </Button>
        </Box>
      </Box>
      <SecreteGenrationModal
        open={openSecreteKeyModal}
        handleClose={handleCloseSecreteKeyModal}
        type={processType}
      />
    </Box>
  );
};

export default Dashboard;
