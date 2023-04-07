import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import Starter from "./components/Starter";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Starter />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainComponent />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
