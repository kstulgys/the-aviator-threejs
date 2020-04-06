import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";
import Colors from "../utils/colors";

export default function Sky() {
  const groupRef = useRef();
  useFrame(() => {
    if (!groupRef) return;
    groupRef.current.rotation.z += 0.01;
  });

  const nClouds = 20;
  const stepAngle = (Math.PI * 2) / nClouds;

  return (
    <group position={[0, -700, 200]} ref={groupRef}>
      {Array(nClouds)
        .fill(null)
        .map((cloud, i) => {
          const a = stepAngle * i;
          const h = 750 + Math.random() * 200;

          const posX = Math.cos(a) * h;
          const posY = Math.sin(a) * h;
          const posZ = -500 - Math.random() * 400;

          const rotZ = a + Math.PI / 2;
          const size = 1 + Math.random() * 2;

          return (
            <Cloud position={[posX, posY, posZ]} rotation-z={rotZ} scale={[size, size, size]} />
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
  const getSize = () => 0.4 + Math.random() * 0.6;

  return (
    <group {...props}>
      {Array(randomNum())
        .fill(null)
        .map((_, i) => {
          const size = getSize();
          return (
            <CloudBlock
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
  return (
    <mesh {...props}>
      <boxGeometry attach='geometry' args={[20, 20, 20]} />
      <meshPhongMaterial attach='material' color={Colors.white} />
    </mesh>
  );
}
