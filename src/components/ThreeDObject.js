// components/ThreeDObject.js
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Box, Button, Input, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { SketchPicker } from 'react-color';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import axios from 'axios';
import { templates } from '../lib/templates';

const ThreeDObject = ({ image, userId }) => {
  const mountRef = useRef(null);
  const textureRef = useRef(null);
  const colorRef = useRef('#ffffff');
  const controlsRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [object, setObject] = useState(null);
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('cube');

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await axios.get(`/api/3dobject/versions/${userId}`);
        setVersions(response.data);
      } catch (error) {
        console.error('Error fetching versions', error);
      }
    };

    fetchVersions();
  }, [userId]);

  useEffect(() => {
    const width = 700; // Width of the renderer
    const height = 400; // Height of the renderer

    const scene = new THREE.Scene();
    setScene(scene);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const geometry = templates[selectedTemplate];
    textureRef.current = new THREE.TextureLoader().load(URL.createObjectURL(image));
    const material = new THREE.MeshStandardMaterial({ map: textureRef.current });
    const mesh = new THREE.Mesh(geometry, material);
    setObject(mesh);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    light.castShadow = true;
    scene.add(light);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);
      material.color.set(colorRef.current);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, [image, selectedTemplate]);

  const handleTextureChange = (event) => {
    const newTexture = new THREE.TextureLoader().load(URL.createObjectURL(event.target.files[0]));
    newTexture.image.onload = () => {
      textureRef.current.image = newTexture.image;
      textureRef.current.needsUpdate = true;
    };
  };

  const handleColorChange = (color) => {
    colorRef.current = color.hex;
  };

  const saveVersion = async () => {
    if (!scene) return;
    const objectData = scene.toJSON();
    try {
      const response = await axios.post('/api/3dobject/version', { objectData, userId });
      setVersions([...versions, response.data]);
    } catch (error) {
      console.error("Error saving version", error);
    }
  };

  const revertToVersion = async (version) => {
    setSelectedVersion(version);
    const loader = new THREE.ObjectLoader();
    const object = loader.parse(version.objectData);
    scene.clear();
    scene.add(object);
  };

  const saveLocally = () => {
    if (!scene) return;
    const link = document.createElement('a');
    link.download = '3d-object.json';
    link.href = URL.createObjectURL(new Blob([JSON.stringify(scene.toJSON())], { type: 'application/json' }));
    link.click();
  };

  const exportAsGLB = () => {
    if (!scene) return;
    const exporter = new GLTFExporter();
    exporter.parse(scene, (result) => {
      const blob = new Blob([result], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = '3d-object.glb';
      link.click();
    });
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  return (
    <Box>
      <div ref={mountRef} style={{ width: '400px', height: '500px' }}></div>
      {/* <Input type="file" onChange={handleTextureChange} /> */}
      <SketchPicker color={colorRef.current} onChangeComplete={handleColorChange} />
      <Button onClick={saveVersion}>Save Version</Button>
      <Button onClick={saveLocally}>Save Locally</Button>
      <Button onClick={exportAsGLB}>Export as .GLB</Button>
      <FormControl>
        <InputLabel id="template-select-label">Template</InputLabel>
        <Select
          labelId="template-select-label"
          value={selectedTemplate}
          onChange={handleTemplateChange}
        >
          {Object.keys(templates).map((templateKey, index) => (
            <MenuItem key={index} value={templateKey}>{templateKey}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Select value={selectedVersion} onChange={(e) => revertToVersion(e.target.value)}>
        {versions.map((version, index) => (
          <MenuItem key={index} value={version}>{`Version ${version.versionNumber}`}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ThreeDObject;
