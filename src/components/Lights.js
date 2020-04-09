import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";

export default function Lights() {
  const [ref, light] = useResource();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.shadow.camera.left = -400;
    ref.current.shadow.camera.right = 400;
    ref.current.shadow.camera.top = 400;
    ref.current.shadow.camera.bottom = -400;
    ref.current.shadow.camera.near = 1;
    ref.current.shadow.camera.far = 1000;
    ref.current.shadow.mapSize.width = 2048;
    ref.current.shadow.mapSize.height = 2048;
  }, []);

  return (
    <>
      <hemisphereLight args={[0xaaaaaa, 0x000000, 0.9]} />
      <directionalLight ref={ref} args={[0xffffff, 0.9]} position={[150, 350, 350]} castShadow />
      <ambientLight args={[0xdc8874, 0.5]} />
      {/* {light && <directionalLightHelper args={[light, 1]} />} */}
    </>
  );
}
