import { Box, Button, Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMySecrete } from "../redux/features/user/userSlice";

const styles = {
  Dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "2px solid grey",
    marginBottom: "8%",
  },
  Header: {
    fontFamily: "Helvetica",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "123.5%",
    color: "#2874f0",
    margin: "0%",
    marginBottom: "14px",
    paddingLeft: 0,
  },
  typography: {
    fontFamily: "Helvetica",
    fontWeight: 600,
    fontSize: "20px",
    margin: "3% 14%",
    cursor: "pointer",
    color: "#2874f0",
    border: "1px dotted #2874f0",
    padding: "1%",
    borderRadius: "5px",
  },
  key: {
    fontFamily: "Helvetica",
    fontWeight: 400,
    fontSize: "20px",
    marginLeft: "10%",
    textDecoration: "underline",
  },
  description: {
    fontFamily: "Helvetica",
    fontWeight: 200,
    fontSize: "15px",
    margin: "0% 14%",
  },
  messege: {
    fontFamily: "Helvetica",
    fontWeight: 200,
    fontSize: "15px",
    color: "rgb(43, 137, 6)",
    margin: "1% 14%",
  },
  nextButton: {
    borderRadius: "10px",
    fontFamily: "Helvetica",
    fontStyle: "normal",
    margin: "5% 0%",
    backgroundColor: "#2874f0",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "2px",
    textTransform: "unset !important",
  },
};

const SecreteGenrationModal = (props) => {
  const { open, handleClose, type, openSetPassword } = props;
  const [secrete, setSecrete] = useState("");
  const [messege, setMessege] = useState(false);
  const dispatch = useDispatch();

  const title = "Secrete key Generation Card";
  const isNewProcess = type === "new" ? true : false;

  const generateSecreteKey = () => {
    const key = Math.random().toString(36).substring(2, 34);
    setSecrete(key);
  };

  const handleHelperMessege = async () => {
    setMessege(true);
    setTimeout(() => {
      setMessege(false);
    }, 3000);
  };

  const unsecureCopyToClipboard = (secreteKey) => {
    const textArea = document.createElement("textarea");
    textArea.value = secreteKey;
    document.body.appendChild(textArea);
    textArea.focus({ preventScroll: true });
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(secrete);
    } else {
      unsecureCopyToClipboard(secrete);
    }
    handleHelperMessege();
  };

  const handleNext = async () => {
    handleCopyToClipboard();
    const secureKey = btoa(secrete);
    dispatch(setMySecrete(secureKey));
    handleClose();
    if (isNewProcess) {
      openSetPassword();
    }
  };

  useEffect(() => {
    generateSecreteKey();
  }, []);

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"} scroll="body">
      <Box sx={styles.Dialog}>
        <DialogTitle sx={styles.Header}>{title} </DialogTitle>
      </Box>
      <p style={styles.description}>
        Description: Secrete is Confidential, Don't Share it with anyone. Click
        on the secrete key to copy to clipboard.
      </p>
      <p onClick={handleCopyToClipboard} style={styles.typography}>
        My Secrete: <span style={styles.key}>{secrete}</span>
      </p>
      {messege ? (
        <p style={styles.messege}>Secrete has been copied to clipboard!</p>
      ) : null}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" sx={styles.nextButton} onClick={handleNext}>
          {isNewProcess ? "COPY AND SET PASSWORD" : "UPDATE KEY"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default SecreteGenrationModal;
