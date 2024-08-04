import Body from "./components/Body";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
    <>
      <ToastContainer theme="dark" />
      <Body />;
    </>
  );
};

export default App;
