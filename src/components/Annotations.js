// components/Annotations.js
import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const Annotations = ({ annotations, addAnnotation }) => {
  const [text, setText] = useState('');

  const handleAddAnnotation = () => {
    addAnnotation(text);
    setText('');
  };

  return (
    <Box>
      <TextField
        label="Annotation"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleAddAnnotation}>Add Annotation</Button>
      <List>
        {annotations.map((annotation, index) => (
          <ListItem key={index}>
            <ListItemText primary={annotation} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Annotations;
