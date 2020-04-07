import create from "zustand";
import * as THREE from "three";

const [useStore] = create((set, get) => ({
  sound: false,
  mutation: {
    mouse: new THREE.Vector2(0, 0),
  },
  actions: {
    updateMouse({ clientX: x, clientY: y }) {
      get().mutation.mouse.set(x - window.innerWidth / 2, y - window.innerHeight / 2);
    },
  },
}));

export default useStore;
