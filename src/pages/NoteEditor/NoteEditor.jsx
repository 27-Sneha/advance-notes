import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Skeleton,
  Grid,
  Divider,
} from "@mui/material";
import { AutoAwesome, Save, Tag } from "@mui/icons-material";
import TextEditor from "../../components/TextEditor/TextEditor";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import localStorageService from "../../services/storageServices/localStorageService";
import {
  getNoteSummary,
  getNoteTags,
} from "../../services/groqApiServices/groqApiService";
import "./NoteEditor.css";

const NoteEditor = () => {
  const [title, setTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isAiSummaryLoading, setIsAiSummaryLoading] = useState(false);
  const [isAiTagLoading, setIsAiTagLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [aiTags, setAiTags] = useState(null);
  const editorRef = useRef();

  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsEdit(!location.pathname.includes("new-note"));
    if (!location.pathname.includes("new-note")) {
      var noteData = localStorageService.getNoteById(id);
      editorRef.current.setContent(noteData.content);
      setTitle(noteData.title);
    }
  }, []);

  const handleSave = () => {
    if (title.trim() === "") {
      alert("Title cannot be empty!");
      return;
    }

    const content = editorRef.current.getContent();
    const oldNotes = localStorageService.getNotes();

    if (content.length > 20) {
      alert("limit exceeded");
    }

    if (isEdit) {
      const noteIndex = oldNotes.findIndex((note) => note.id == id);
      oldNotes[noteIndex] = {
        ...oldNotes[noteIndex],
        title,
        content,
      };
    } else {
      const note = {
        id: Date.now(),
        title,
        content,
        pinned: false,
        isProtected: false,
        password: "",
        createdAt: new Date(),
      };
      oldNotes.push(note);
    }

    localStorageService.saveNotes(oldNotes);

    alert("Note Saved!");
    navigate("/");
  };

  const handleAiSummary = async () => {
    const content = editorRef.current.getContent();
    setIsAiSummaryLoading(true);
    const summary = await getNoteSummary(content);
    setIsAiSummaryLoading(false);
    setAiSummary(summary);
  };

  const handleAiTags = async () => {
    const content = editorRef.current.getContent();
    setIsAiTagLoading(true);
    const tags = await getNoteTags(content);
    setIsAiTagLoading(false);
    setAiTags(tags);
  };

  const checkContentSize = () => {
    const data = editorRef.current.getContent();
    console.log(data);
    if (data.length > 10) {
      alert("limit exceeded");
    }
  };

  return (
    <div className="editor-container">
      <TextField
        label="Note Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="editor-title"
      />

      <Paper elevation={2} className="editor-box">
        <TextEditor ref={editorRef} />
      </Paper>

      <Button
        variant="contained"
        startIcon={<Save />}
        onClick={handleSave}
        className="save-btn"
      >
        Save
      </Button>

      <Grid container className="ai-section">
        <Grid size={7}>
          <Grid container rowSpacing={2}>
            <Grid size={12}>
              <Button
                variant="outlined"
                startIcon={<AutoAwesome />}
                onClick={handleAiSummary}
                className="save-btn"
              >
                AI Summary
              </Button>
            </Grid>
            <Grid size={12}>
              {isAiSummaryLoading ? (
                <Skeleton variant="rectangular" height={60} />
              ) : (
                <Paper
                  elevation={2}
                  className={`${aiSummary ? "summary-box" : ""}`}
                >
                  {aiSummary}
                </Paper>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid size={1} className="divider-section">
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{ borderRightWidth: "2px" }}
          />
        </Grid>
        <Grid size={4}>
          <Grid container rowSpacing={2}>
            <Grid size={12}>
              <Button
                variant="outlined"
                startIcon={<Tag />}
                onClick={handleAiTags}
                className="save-btn"
              >
                AI Tags
              </Button>
            </Grid>
            <Grid size={12}>
              {isAiTagLoading ? (
                <Skeleton variant="rectangular" height={30} />
              ) : (
                <Paper
                  elevation={2}
                  className={`${aiTags ? "summary-box" : ""}`}
                >
                  {aiTags &&
                    (aiTags.length > 0 ? (
                      aiTags.map((tag, index) => (
                        <span key={index} style={{ paddingRight: "5px" }}>
                          #{tag}{" "}
                        </span>
                      ))
                    ) : (
                      <span>No tags generated.</span>
                    ))}
                </Paper>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NoteEditor;
