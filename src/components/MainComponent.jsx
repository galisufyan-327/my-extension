import { useEffect, useState } from "react";
import SecreteGenrationModal from "../modals/SecreteGenerationModal";
import { useNavigate } from "react-router-dom";
import SetPasswordModal from "../modals/SetPasswordModal";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/user/userSlice";

const MainComponent = () => {
  const navigate = useNavigate();
  const userRedux = useSelector(selectUser);
  const [isRegistered, setIsRegistered] = useState(true);
  const [openKeyGeneration, setOpenKeyGeneration] = useState(false);
  const [openSetPassword, setOpenSetPassword] = useState(false);
  const [processType, setProcessType] = useState("new");

  const handleCloseSecreteGeneration = () => {
    setOpenKeyGeneration(false);
  };
  const handleOpenSetPassword = () => {
    setOpenSetPassword(true);
  };
  const handleCloseSetPassword = () => {
    setOpenSetPassword(false);
  };

  useEffect(() => {
    if (userRedux.isRegistered && !(window.location.pathname === "/signin")) {
      navigate("/signin");
    } else {
      if (!(window.location.pathname === "/signin")) {
        setOpenKeyGeneration(true);
        setIsRegistered(false);
      }
    }
  }, [userRedux, navigate]);

  return (
    <>
      {!isRegistered ? (
        <>
          <SecreteGenrationModal
            open={openKeyGeneration}
            handleClose={handleCloseSecreteGeneration}
            type={processType}
            openSetPassword={handleOpenSetPassword}
          />
          <SetPasswordModal
            open={openSetPassword}
            handleClose={handleCloseSetPassword}
          />
        </>
      ) : null}
    </>
  );
};

export default MainComponent;
