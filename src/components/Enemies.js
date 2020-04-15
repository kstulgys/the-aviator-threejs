import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useResource, extend, useThree } from "react-three-fiber";
import Colors from "../utils/colors";
import { Color } from "three";
import useStore from "../store";
import { a, useTrail } from "react-spring/three";
import { useSphere } from "use-cannon";

export default function Enemies() {
  const enemiesRef = useRef();
  useFrame(() => {
    enemiesRef.current.rotation.z += 0.005;
  });

  const nEnemies = 40;
  const angle = (Math.PI * 2) / nEnemies;

  return (
    <group position={[0, -1300, 200]} ref={enemiesRef}>
      {Array(nEnemies)
        .fill(null)
        .map((enemy, i) => {
          const h = 1250 + Math.random() * 150;
          const x = Math.cos(i * angle) * 1300 + (Math.random() * (300 - -300) + -300);
          const y = Math.sin(i * angle) * h;
          return <Enemy key={i} args={[x, y, -200]} position={[x, y, -200]} />;
        })}
    </group>
  );
}

function Enemy(props) {
  const [enemyRef, api] = useSphere(() => ({ mass: 0, position: props.position }));
  const radius = Math.floor(2 + Math.random() * 19);
  const detail = Math.floor(1 + Math.random() * 2);

  useFrame(() => {
    const Z = enemyRef.current.rotation.z + Math.random() * 0.1;
    const Y = enemyRef.current.rotation.y + Math.random() * 0.1;
    api.rotation.set(0, Y, Z);
  });

  return (
    <mesh castShadow receiveShadow ref={enemyRef}>
      <tetrahedronGeometry attach='geometry' args={[radius, detail]} />
      <meshPhongMaterial
        attach='material'
        color={Colors.red}
        flatShading
        specular={0xffffff}
        shininess={0}
      />
    </mesh>
  );
}

// Ennemy = function(){
//     var geom = new THREE.TetrahedronGeometry(8,2);
//     var mat = new THREE.MeshPhongMaterial({
//       color:Colors.red,
//       shininess:0,
//       specular:0xffffff,
//       shading:THREE.FlatShading
//     });
//     this.mesh = new THREE.Mesh(geom,mat);
//     this.mesh.castShadow = true;
//     this.angle = 0;
//     this.dist = 0;
//   }
