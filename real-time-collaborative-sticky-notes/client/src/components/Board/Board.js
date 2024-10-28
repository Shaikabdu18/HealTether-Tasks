import React, { useState, useEffect } from 'react';
import { Box, Fab, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StickyNote from './StickyNote';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Board = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const config = {
    headers: {
      'x-auth-token': token
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notes', config);
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();

    socket.on('noteCreated', (note) => {
      setNotes((prev) => [...prev, note]);
    });

    socket.on('noteUpdated', (updatedNote) => {
      setNotes((prev) =>
        prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
      );
    });

    socket.on('noteDeleted', (noteId) => {
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    });

    return () => {
      socket.off('noteCreated');
      socket.off('noteUpdated');
      socket.off('noteDeleted');
    };
  }, [token]);

  const createNote = async () => {
    try {
      const newNote = {
        content: 'New Note',
        position: { x: Math.random() * 100, y: Math.random() * 100 },
        color: `hsl(${Math.random() * 360}, 80%, 80%)`
      };

      const res = await axios.post('http://localhost:5000/api/notes', newNote, config);
      socket.emit('createNote', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateNote = async (id, updates) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/notes/${id}`, updates, config);
      socket.emit('updateNote', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, config);
      socket.emit('deleteNote', id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden'
      }}
    >
      {notes.map((note) => (
        <StickyNote
          key={note._id}
          note={note}
          onDragStop={(id, position) => updateNote(id, { position })}
          onUpdate={updateNote}
          onDelete={deleteNote}
        />
      ))}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={createNote}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Board;
