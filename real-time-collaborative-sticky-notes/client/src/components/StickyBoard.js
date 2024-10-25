import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { io } from 'socket.io-client';
import * as noteService from '../services/noteService'; // Updated import
import '../App.css'; // Ensure this file exists or remove the import

const socket = io('http://localhost:5000');

const StickyBoard = () => {
  const [notes, setNotes] = useState([]); // Ensure it's initialized as an array

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await noteService.getNotes();
        console.log('Fetched notes:', result); // Log fetched notes for debugging
        if (Array.isArray(result.data)) {
          setNotes(result.data); // Access the data array directly
        } else {
          console.error('Expected an array of notes, but got:', result);
          setNotes([]); // Handle unexpected response
        }
      } catch (error) {
        console.error('Error fetching notes:', error); // Log error if any
        setNotes([]); // Fallback to an empty array on error
      }
    };

    fetchNotes();

    socket.on('noteUpdated', (data) => {
      setNotes(data);
    });

    return () => {
      socket.off('noteUpdated');
    };
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
    socket.emit('noteUpdated', items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="board">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="board" // Your styling class
      >
        {notes.map((note, index) => (
          <Draggable key={note._id} draggableId={note._id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="note"
              >
                {note.content}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder} {/* Important for spacing */}
      </div>
    )}
  </Droppable>
</DragDropContext>

  );
};

export default StickyBoard;
