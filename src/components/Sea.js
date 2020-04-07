import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";
import Colors from "../utils/colors";

export default function Sea(props) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y -= 0.005;
  });

  return (
    <mesh
      castShadow
      receiveShadow
      ref={mesh}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -700, 0]}
      {...props}
    >
      <cylinderGeometry attach='geometry' args={[600, 600, 800, 40, 10]} />
      <meshPhongMaterial
        attach='material'
        color={Colors.blue}
        flatShading
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}
