import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NoteList from "../../components/NoteList/NoteList";
import localStorageService from "../../services/storageServices/localStorageService";
import { Grid } from "@mui/material";

const Home = () => {
  const [notes, setNotes] = useState([]);

  const loadNotes = () => {
    let storedNotes = localStorageService.getNotes() || [];

    storedNotes = localStorageService.sortNotes(storedNotes);

    setNotes(storedNotes);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleUpdateNotes = (newNotes) => {
    setNotes(newNotes);
  };

  return (
    <Grid container rowSpacing={4} className="home-container">
      <Grid size={12}>
        <Header handleUpdateNotes={handleUpdateNotes} />
      </Grid>
      <Grid size={12}>
        <NoteList notes={notes} handleUpdateNotes={handleUpdateNotes} />
      </Grid>
    </Grid>
  );
};

export default Home;
