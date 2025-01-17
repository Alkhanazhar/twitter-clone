import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
axios.defaults.baseURL = "http://localhost:8088";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
