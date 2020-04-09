import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";
import Colors from "../utils/colors";

export default function Sky() {
  const groupRef = useRef();
  useFrame(() => {
    groupRef.current.rotation.z += 0.005;
  });

  const nClouds = 20;
  const stepAngle = (Math.PI * 2) / nClouds;

  return (
    <group position={[0, -1300, 200]} ref={groupRef}>
      {Array(nClouds)
        .fill(null)
        .map((cloud, i) => {
          const a = stepAngle * i;
          const h = 1300 + Math.random() * 325;
          const posX = Math.cos(a) * h;
          const posY = Math.sin(a) * h;
          const posZ = -250 - Math.random() * 300;
          const rotZ = a + Math.PI / 2;
          const size = 1 + Math.random() * 2;
          return (
            <Cloud
              key={i}
              position={[posX, posY, posZ]}
              rotation-z={rotZ}
              scale={[size, size, size]}
            />
          );
        })}
    </group>
  );
}

function Cloud(props) {
  const randomNum = () => 3 + Math.floor(Math.random() * 3);
  const posX = (i) => i * 15;
  const posYZ = () => Math.random() * 10;
  const rotYZ = () => Math.random() * Math.PI * 2;
  const getSize = () => 0.1 + Math.random() * 0.9;

  return (
    <group {...props}>
      {Array(randomNum())
        .fill(null)
        .map((_, i) => {
          const size = getSize();
          return (
            <CloudBlock
              key={i}
              position={[posX(i), posYZ(), posYZ()]}
              rotation={[0, rotYZ(), rotYZ()]}
              scale={[size, size, size]}
            />
          );
        })}
    </group>
  );
}

function CloudBlock(props) {
  const blockRef = useRef();

  useFrame(() => {
    blockRef.current.rotation.x += 0.01;
    blockRef.current.rotation.y += 0.01;
    blockRef.current.rotation.z += 0.01;
  });
  return (
    <mesh {...props} ref={blockRef}>
      <boxGeometry attach='geometry' args={[20, 20, 20]} />
      <meshPhongMaterial attach='material' color={Colors.white} />
    </mesh>
  );
}
