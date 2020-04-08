import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";
import Colors from "../utils/colors";

export default function Sea(props) {
  const mesh = useRef();
  const geometryRef = useRef();
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    if (!geometryRef.current) return;
    let wavesArray = geometryRef.current.vertices.map((item) => ({
      ang: Math.random() * Math.PI * 2,
      amp: 5 + Math.random() * 15,
      speed: 0.016 + Math.random() * 0.032,
      ...item,
    }));
    setWaves(wavesArray);
  }, []);

  useFrame(() => {
    waves.forEach((v, i) => {
      geometryRef.current.vertices[i].x = v.x + Math.cos(v.ang) * v.amp;
      geometryRef.current.vertices[i].y = v.y + Math.sin(v.ang) * v.amp;
      v.ang += v.speed;
    });
    mesh.current.rotation.y -= 0.005;
    geometryRef.current.verticesNeedUpdate = true;
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
      <cylinderGeometry attach='geometry' args={[600, 600, 800, 40, 10]} ref={geometryRef} />
      <meshPhongMaterial
        attach='material'
        color={Colors.blue}
        flatShading
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
