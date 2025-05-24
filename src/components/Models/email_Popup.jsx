import React, { useState } from "react";
import "./styles.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import TextFieldOutlined from "../../web/TextField/TextFieldOutlined";

export default function confirmModel(props) {
  const { open, message, handleClose, handleMailConfirmation } = props;

  const [toEmail, setToEmail] = useState("");

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-50vh", // Set the top margin to position the modal at the top of the screen
  };

  const handleToEmailChange = (event) => {
    setToEmail(event.target.value);
  };

  return (
    <Dialog open={open} style={modalStyle}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <Grid container spacing={2} style={{ alignItems: "center" }}>
          {/* Horizontal "To" email field */}
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <DialogContentText style={{ marginRight: "10px", display: "flex" }}>
              <h5>To</h5>
              <span style={{ color: "red" }}>*</span>
            </DialogContentText>
            <div style={{ flex: 1 }}>
              <TextFieldOutlined
                name={"toEmail"}
                variant={"outlined"}
                handleChange={handleToEmailChange}
                value={toEmail}
                placeholder={"Enter email address"}
                style={{ width: "100%" }}
              />
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleMailConfirmation(toEmail)} // Pass a function reference
          color="primary"
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}