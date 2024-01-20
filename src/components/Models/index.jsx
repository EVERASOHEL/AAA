import React from "react";
import "./styles.scss";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect } from "react";

export default function confirmModel(props) {
 
  const { open, message, handleClose,handleConfirmation } = props;

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-50vh', // Set the top margin to position the modal at the top of the screen
  };

  return (
    <Dialog open={open} style={modalStyle}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmation} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
