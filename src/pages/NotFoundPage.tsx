import "../style/NotFound.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";

const NotFoundPage = () => {
  let navigate = useNavigate();

  return (
    <>
      <Sidebar currentPage="notfound" />
      <div className="notfound_container">
        <p className="notfound_text">
          This page does not exist. Please search other words.
        </p>
        <Button
          onClick={() => navigate("/search")}
          className="jumpSearch__button"
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;
