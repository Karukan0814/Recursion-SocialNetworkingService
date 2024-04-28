import { CircularProgress } from "@mui/material";
import React from "react";
import "../style/Loading.css";

const Loading = () => {
  return (
    <div className="loading_container">
      <CircularProgress className="loading_icon" />
    </div>
  );
};

export default Loading;
