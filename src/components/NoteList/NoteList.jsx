import { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import localStorageService from "../../services/storageServices/localStorageService";
import PasswordModal from "../PasswordModal/PasswordModal";
import { getTextEncryption } from "../../services/cryptoServices/cryptoService";
import "./NoteList.css";

const NoteList = ({ notes, handleUpdateNotes }) => {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (event, id) => {
    event.stopPropagation();
    const filtered = notes.filter((note) => note.id !== id);
    localStorageService.saveNotes(filtered);
    handleUpdateNotes(filtered);
  };

  const handlePinToggle = (event, id) => {
    event.stopPropagation();
    let updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );

    updatedNotes = localStorageService.sortNotes(updatedNotes);
    localStorageService.saveNotes(updatedNotes);
    handleUpdateNotes(updatedNotes);
  };

  const handleEditNote = (id) => {
    var note = localStorageService.getNoteById(id);
    if (note.isProtected) {
      setSelectedNote(note);
      setShowNote(true);
      setPasswordModalOpen(true);
    } else {
      navigate(`/note/${id}`);
    }
  };

  const handleProtection = (event, id) => {
    event.stopPropagation();
    setShowNote(false);
    setSelectedNote(localStorageService.getNoteById(id));
    setPasswordModalOpen(true);
  };

  const handleSavePassword = (isProtected, password) => {
    let updatedNotes = notes.map((note) =>
      note.id === selectedNote.id
        ? {
            ...note,
            isProtected: isProtected,
            password: getTextEncryption(password),
          }
        : note
    );
    localStorageService.saveNotes(updatedNotes);
    handleUpdateNotes(updatedNotes);
    setPasswordModalOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} className="note-list-container">
        {notes &&
          notes.map((note) => (
            <Grid key={note.id} size={{ xs: 12 }}>
              <NoteCard
                title={note.title}
                pinned={note.pinned}
                isProtected={note.isProtected}
                onDelete={(event) => handleDelete(event, note.id)}
                onPin={(event) => handlePinToggle(event, note.id)}
                onClick={() => handleEditNote(note.id)}
                onProtection={(event) => handleProtection(event, note.id)}
              />
            </Grid>
          ))}
      </Grid>

      <PasswordModal
        open={passwordModalOpen}
        note={selectedNote}
        onClose={() => setPasswordModalOpen(false)}
        onSave={handleSavePassword}
        showNote={showNote}
      />
    </>
  );
};

export default NoteList;
