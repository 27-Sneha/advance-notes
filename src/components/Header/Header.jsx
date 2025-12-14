import { AddCircle, Search } from "@mui/icons-material";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import localStorageService from "../../services/storageServices/localStorageService";
import { useState } from "react";
import "./Header.css";

const Header = ({ handleUpdateNotes }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const q = event.target.value.toLowerCase();
    setQuery(q);
    const storedNotes = localStorageService.getNotes();
    const filteredNotes = storedNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
    handleUpdateNotes(filteredNotes);
  };

  return (
    <Grid container className="header-container">
      <Grid size={{ xs: 4, md: 3 }}>
        <Typography variant="h4" sx={{ color: "#124268ff" }}>
          Notes
        </Typography>
      </Grid>
      <Grid size={{ xs: 8, md: 6 }}>
        <Grid container className="search-container">
          <Grid size={7}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              value={query}
              onChange={(event) => handleSearch(event)}
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  height: 42,
                  borderRadius: "8px",
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={1}>
            <Link to="/new-note">
              <AddCircle fontSize="large" sx={{ color: "#1a5c93ff" }} />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
