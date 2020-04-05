import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource } from "react-three-fiber";
import "./styles.css";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y -= 0.005;

    // mesh.current.rotation.x += 0.01;
    // mesh.current.rotation.y += 0.02;
  });
  // useEffect(() => {
  //   mesh.current.position.y = -700;
  // }, []);

  return (
    <mesh ref={mesh} {...props} rotation={[-Math.PI / 2, 0, 0]} position={[0, -700, 0]}>
      <cylinderGeometry attach='geometry' args={[600, 600, 200, 40, 10]} />
      <meshPhongMaterial attach='material' color={0x68c3c0} flatShading transparent opacity={0.8} />
    </mesh>
  );
}

function Lights() {
  const [ref, light] = useResource();

  return (
    <>
      <hemisphereLight args={[0xaaaaaa, 0x000000, 0.9]} />
      <ambientLight args={[0xdc8874, 0.5]} />
      <directionalLight ref={ref} args={[0xffffff, 0.9]} position={[150, 350, 350]} />
      {light && <directionalLightHelper args={[light, 1]} />}
    </>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 25, 100], isPerspectiveCamera: true }}>
      <Box />
      <Lights />
    </Canvas>
  );
}
