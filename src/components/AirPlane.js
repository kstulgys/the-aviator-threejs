import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";
import Colors from "../utils/colors";
import { Color } from "three";
import useStore from "../store";

function normalize(v, vmin, vmax, tmin, tmax) {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  const tv = tmin + pc * dt;
  return tv;
}

export function AirPlane() {
  const airplaneRef = useRef();

  const {
    gl, // WebGL renderer
    scene, // Default scene
    camera, // Default camera
    size, // Bounds of the view (which stretches 100% and auto-adjusts)
    viewport, // Bounds of the viewport in 3d units + factor (size/viewport)
    aspect, // Aspect ratio (size.width / size.height)
    mouse, // Current 2D mouse coordinates
    clock, // THREE.Clock (useful for useFrame deltas)
    invalidate, // Invalidates a single frame (for <Canvas invalidateFrameloop />)
    intersect, // Calls onMouseMove handlers for objects underneath the cursor
    setDefaultCamera, // Sets the default camera
  } = useThree();

  useFrame(() => {
    airplaneRef.current.position.x = normalize(mouse.x, -1, 1, -100, 100);
    airplaneRef.current.position.y = normalize(mouse.y, -1, 1, -40, 45);
  });

  return (
    <group scale={[0.25, 0.25, 0.25]} ref={airplaneRef}>
      <Cabin />
      <Engine />
      <Tail />
      <Wing />
      <Propeller />
    </group>
  );
}

function Cabin() {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry attach='geometry' args={[60, 50, 50, 1, 1, 1]} />
      <meshPhongMaterial attach='material' color={Colors.red} flatShading />
    </mesh>
  );
}

function Engine() {
  return (
    <mesh castShadow receiveShadow position-x={40}>
      <boxGeometry attach='geometry' args={[20, 50, 50, 1, 1, 1]} />
      <meshPhongMaterial attach='material' color={Colors.white} flatShading />
    </mesh>
  );
}

function Tail() {
  return (
    <mesh castShadow receiveShadow position={[-35, 25, 0]}>
      <boxGeometry attach='geometry' args={[15, 20, 5, 1, 1, 1]} />
      <meshPhongMaterial attach='material' color={Colors.red} flatShading />
    </mesh>
  );
}

function Wing() {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry attach='geometry' args={[40, 8, 150, 1, 1, 1]} />
      <meshPhongMaterial attach='material' color={Colors.red} flatShading />
    </mesh>
  );
}

function Propeller() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.3;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow position-x={50}>
      <boxGeometry attach='geometry' args={[20, 10, 10, 1, 1, 1]} />
      <meshPhongMaterial attach='material' color={Colors.brown} flatShading />
      <Blades />
    </mesh>
  );
}

function Blades() {
  return (
    <mesh castShadow receiveShadow position-x={8}>
      <boxGeometry attach='geometry' args={[1, 100, 20, 1, 1, 1]} />
      <meshPhongMaterial attach='material' color={Colors.brown} flatShading />
    </mesh>
  );
}
