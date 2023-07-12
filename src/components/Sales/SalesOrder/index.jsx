import React, { useEffect, useState } from "react";
import "./styles.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const index = (props) => {
  const [state, updateState] = useState({});

  const updateStateValue = (value) => {
    updateState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  console.log("hellosales");
  const { isModelOpen } = props;
  return (
    <Dialog open={open}>
      <DialogTitle>
        {" "}
        <div className="dialogheaderstyle">
          <Typography variant="h5">Sales Order</Typography>
          <CloseButton
            className="closemodelhoverstyle"
            onClick={() => {
              isModelOpen(false);
            }}
          />
        </div>
      </DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default index;
