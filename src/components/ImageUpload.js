// components/ImageUpload.js
import React, { useState } from 'react';
import { Button, Input } from '@mui/material';

const ImageUpload = ({ onImageUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload Image
      </Button>
    </div>
  );
};

export default ImageUpload;
