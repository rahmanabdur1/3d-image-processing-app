"use client"
import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ThreeDObject from '../components/ThreeDObject';
import Annotations from '../components/Annotations';
import useUndo from '../hooks/useUndo';
import { Button } from '@mui/material';

export default function Home() {
  
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations, undoAnnotation, redoAnnotation] = useUndo([]);

  const addAnnotation = (text) => {
    setAnnotations([...annotations, text]);
  };

  return (
    <div>
      <h1>Welcome to the Advanced 3D Image Processing App</h1>
      <ImageUpload onImageUpload={setImage} />
      {image && (
        <>
          <ThreeDObject image={image} />
          <Annotations annotations={annotations} addAnnotation={addAnnotation} />
          <Button onClick={undoAnnotation}>Undo</Button>
          <Button onClick={redoAnnotation}>Redo</Button>
        </>
      )}
    </div>
  );
}
