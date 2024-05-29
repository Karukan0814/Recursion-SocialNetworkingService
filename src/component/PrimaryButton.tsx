import React from "react";
import "../style/PrimaryButton.css";
import { Button, CircularProgress } from "@mui/material";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading: boolean;
  text: string;
};
const PrimaryButton = ({ onClick, loading, text }: Props) => {
  return (
    <Button
      type="submit"
      onClick={(e) => onClick(e)}
      disabled={loading}
      className={`primary_button ${loading && "primary_button_disabled"}`}
    >
      {loading ? <CircularProgress className="circular" /> : <> {text}</>}
    </Button>
  );
};

export default PrimaryButton;
