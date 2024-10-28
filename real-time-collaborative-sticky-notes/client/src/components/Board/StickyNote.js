import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Paper, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const StickyNote = ({ note, onDragStop, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onUpdate(note._id, { content });
    setIsEditing(false);
  };

  return (
    <Draggable
      position={note.position}
      onStop={(e, data) => onDragStop(note._id, { x: data.x, y: data.y })}
      bounds="parent"
    >
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          width: 200,
          minHeight: 200,
          backgroundColor: note.color,
          cursor: 'move',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        {isEditing ? (
          <TextField
            multiline
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="standard"
            sx={{ flex: 1 }}
          />
        ) : (
          <div style={{ flex: 1, wordBreak: 'break-word' }}>{content}</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <IconButton size="small" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <SaveIcon onClick={handleSave} /> : <EditIcon />}
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(note._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>
    </Draggable>
  );
};

export default StickyNote;