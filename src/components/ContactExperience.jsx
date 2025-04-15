import React  from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import {Computer} from "./Models/Computer-optimized.jsx";

const ContactExperience = () => {

  return (

      <Canvas camera={{position: [0,3,7],fov:45}} shadows>
        
        {/* Lights */}
        <ambientLight intensity={0.5} color="#fff4e6" />
        <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffd9b3"  />
          <directionalLight position={[5,9,1]} castShadow intensity={2.5} color="#ffd9b3" />
        
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
        />
        
        <group scale={0.03} position={[0,-1.5,-2]} castShadow>
            <Computer />
        </group>

          <group scale={[1,1,1]}>
                <mesh receiveShadow position={[0, -1.5, 0]} rotation={[-Math.PI / 2 , 0, 0]}>
                    <planeGeometry args={[30,30]} />
                    <meshStandardMaterial color="#a46b2d"  />
                </mesh>
          </group>

      </Canvas>

  );
};

export default ContactExperience;