import { Card, CardContent, IconButton, Typography, Grid } from "@mui/material";
import { Delete, Lock, PushPin } from "@mui/icons-material";
import "./NoteCard.css";

const NoteCard = ({
  title,
  onDelete,
  onPin,
  pinned,
  onClick,
  onProtection,
  isProtected,
}) => {
  return (
    <Card className="note-card" onClick={onClick}>
      <CardContent>
        <Grid container spacing={2} className="note-card-container">
          <Grid size={{ xs: 8, md: 10 }}>
            <Typography className="note-title">{title}</Typography>
          </Grid>
          <Grid size={{ xs: 4, md: 2 }}>
            <Grid container className="note-card-options">
              <Grid size={4}>
                <IconButton
                  onClick={onPin}
                  className={pinned ? "pin-icon pinned" : "pin-icon"}
                >
                  <PushPin />
                </IconButton>
              </Grid>

              <Grid size={4}>
                <IconButton onClick={onDelete} className="delete-icon">
                  <Delete />
                </IconButton>
              </Grid>

              <Grid size={4}>
                <IconButton
                  onClick={onProtection}
                  className={
                    isProtected ? "protected-icon protected" : "protected-icon"
                  }
                >
                  <Lock />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
