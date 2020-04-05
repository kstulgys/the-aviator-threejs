import React from "react";
import { Canvas } from "react-three-fiber";
import "./styles.css";

export default function App() {
  return (
    <Canvas>
      <mesh>
        <cylinderBufferGeometry attach="geometry" args={[5, 5, 20, 32]} />
        <meshBasicMaterial attach="material" color="red" />
      </mesh>
    </Canvas>
  );
}
