import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getTextDecryption } from "../../services/cryptoServices/cryptoService";
import "./PasswordModal.css";

const PasswordModal = ({ open, note, onClose, onSave, showNote }) => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPassword("");
  }, [open]);

  const handleSave = () => {
    if (!showNote) {
      if (note.isProtected) {
        if (getTextDecryption(note.password) === password) {
          onSave(false, "");
        } else {
          alert("Incorrect Password!");
          return;
        }
      } else {
        onSave(true, password);
      }
    } else {
      if (getTextDecryption(note.password) !== password) {
        alert("Incorrect Password!");
        return;
      }
    }

    setPassword("");
    setShow(false);
    onClose();

    if (showNote) {
      navigate(`/note/${note.id}`);
    }
  };

  const handleTogglePassword = () => {
    setShow((prev) => !prev);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="password-modal-box">
        <Typography variant="h6" className="password-modal-title">
          Enter Password
        </Typography>

        <TextField
          fullWidth
          label="Password"
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box className="password-modal-actions">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {showNote ? "Open" : note && note.isProtected ? "Remove" : "Save"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PasswordModal;
