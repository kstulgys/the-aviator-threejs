import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Sky from "./components/Sky";
import "./styles.css";
import Controls from "./components/Controls";
import Sea from "./components/Sea";
import Lights from "./components/Lights";
import { AirPlane } from "./components/AirPlane";
import useStore from "./store";

export default function App() {
  return (
    <Canvas
      shadowMap
      gl={{ alpha: true, antialias: true }}
      camera={{
        position: [0, 0, 100],
        near: 1,
        fov: 60,
        far: 10000,
        isPerspectiveCamera: true,
      }}
    >
      <fog attach='fog' args={[0xf7d9aa, 100, 950]} />
      <Lights />
      <Sky />
      <AirPlane />
      <Sea />
      <Controls />
    </Canvas>
  );
}
