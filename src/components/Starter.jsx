import { Button } from "@mui/material";
import { appEnviroment } from "../env";

const styles = {
  launchButton: {
    borderRadius: "10px",
    fontFamily: "Helvetica",
    fontStyle: "normal",
    backgroundColor: "#2874f0",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "2px",
    margin: "0% 20%",
    marginBottom: "30px",
  },
  title: {
    fontFamily: "Helvetica",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "23px",
    lineHeight: "123.5%",
    color: "white",
    marginBottom: "15px",
    margin: "12% 20%",
  },
};

const Starter = () => {
  const handleLaunch = () => {
    window.open(`${appEnviroment.REACT_APP_URL}`, "_blank");
  };

  return (
    <>
      {!(window.location.pathname === "/") &&
      !(window.location.pathname === "/signin") &&
      !(window.location.pathname === "/dashboard") ? (
        <>
          <div style={styles.title}>{"User Authentication"}</div>
          <Button
            variant="contained"
            sx={styles.launchButton}
            onClick={handleLaunch}
          >
            Launch Extension
          </Button>
        </>
      ) : null}
    </>
  );
};

export default Starter;
