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
import Enemies from "./components/Enemies";
import { Physics } from "use-cannon";

export default function App() {
  return (
    <Canvas
      style={{ background: "linear-gradient(#e4e0ba, #f7d9aa)" }}
      shadowMap
      gl={{ alpha: true, antialias: true }}
      camera={{
        position: [0, 0, 200],
        near: 1,
        fov: 60,
        far: 10000,
        isPerspectiveCamera: true,
      }}
    >
      {/* <fog attach='fog' args={[0xf7d9aa, 100, 950]} /> */}
      <Lights />
      <Sky />
      <Physics>
        <AirPlane />
        <Enemies />
      </Physics>
      <Sea />
      <Controls />
    </Canvas>
  );
}
