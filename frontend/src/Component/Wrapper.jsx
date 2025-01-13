import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const Wrapper = ({ children }) => {
  return (
    <Router>
      <Provider store={store}>
        
        {children}
        <ToastContainer />
      </Provider>
    </Router>
  );
};

export default Wrapper;
