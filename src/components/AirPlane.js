import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";
import Colors from "../utils/colors";
import { Color } from "three";
import useStore from "../store";
import { a, useTrail } from "react-spring/three";
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
    const currentY = mouse.y > -0.8 ? mouse.y * size.height * 0.1 : mouse.y * size.height * 0.085;
    const prevY = airplaneRef.current.position.y;
    airplaneRef.current.position.y += (currentY - prevY) * 0.1;
    airplaneRef.current.rotation.z = (currentY - prevY) * 0.012;
    camera.fov = -mouse.x * 15 + 60;
    camera.updateProjectionMatrix();
  });

  return (
    <group scale={[0.25, 0.25, 0.25]} ref={airplaneRef}>
      <Cabin />
      <Engine />
      <Tail />
      <Wing />
      <WindShield />
      <Propeller />
    </group>
  );
}

function Cabin() {
  const geometryRef = useRef();

  useEffect(() => {
    if (!geometryRef.current) return;
    geometryRef.current.vertices[4].y -= 10;
    geometryRef.current.vertices[4].z += 20;
    geometryRef.current.vertices[5].y -= 10;
    geometryRef.current.vertices[5].z -= 20;
    geometryRef.current.vertices[6].y += 30;
    geometryRef.current.vertices[6].z += 20;
    geometryRef.current.vertices[7].y += 30;
    geometryRef.current.vertices[7].z -= 20;
  }, []);

  return (
    <mesh castShadow receiveShadow>
      <boxGeometry attach='geometry' args={[80, 50, 50]} ref={geometryRef} />
      <meshPhongMaterial attach='material' color={Colors.red} flatShading />
    </mesh>
  );
}

function Engine() {
  return (
    <mesh castShadow receiveShadow position-x={50}>
      <boxGeometry attach='geometry' args={[20, 50, 50]} />
      <meshPhongMaterial attach='material' color={Colors.white} flatShading />
    </mesh>
  );
}

function Tail() {
  return (
    <mesh castShadow receiveShadow position={[-40, 20, 0]}>
      <boxGeometry attach='geometry' args={[15, 20, 5]} />
      <meshPhongMaterial attach='material' color={Colors.red} flatShading />
    </mesh>
  );
}

function Wing() {
  return (
    <mesh castShadow receiveShadow position-y={15}>
      <boxGeometry attach='geometry' args={[30, 5, 120]} />
      <meshPhongMaterial attach='material' color={Colors.red} flatShading />
    </mesh>
  );
}

function WindShield() {
  return (
    <mesh castShadow receiveShadow position={[5, 27, 0]}>
      <boxGeometry attach='geometry' args={[3, 15, 20]} />
      <meshPhongMaterial
        attach='material'
        color={Colors.white}
        flatShading
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function Propeller() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.3;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow position-x={60}>
      <boxGeometry attach='geometry' args={[20, 10, 10]} />
      <meshPhongMaterial attach='material' color={Colors.brown} flatShading />
      <Blades />
    </mesh>
  );
}

function Blades() {
  return (
    <group>
      <mesh castShadow receiveShadow position-x={8}>
        <boxGeometry attach='geometry' args={[1, 80, 10]} />
        <meshPhongMaterial attach='material' color={Colors.brownDark} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position-x={8} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry attach='geometry' args={[1, 80, 10]} />
        <meshPhongMaterial attach='material' color={Colors.brownDark} flatShading />
      </mesh>
    </group>
  );
}

//
// function Mesh({ meshProps, geometryProps, materialProps }) {
//   return (
//     <mesh castShadow receiveShadow {...meshProps}>
//       <boxGeometry attach='geometry' {...geometryProps} />
//       <meshPhongMaterial attach='material' flatShading {...materialProps} />
//     </mesh>
//   );
// }
