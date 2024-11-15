import { Decal, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { Color, MeshPhongMaterial, TextureLoader } from 'three';

const RacketModel = ({ configuration, rotating }) => {
  const { scene, nodes } = useGLTF('/racket.glb');
  const [pos] = useState([
    -25.865208350940048, -14.47354410544047, -1.0599478350247227,
  ]);
  const [rot] = useState([
    0.4947503398581219, 1.156025918498105, -0.4356373502667589,
  ]);
  const [scl] = useState([
    9.66471054785273, 1.781583934876309, 27.3985620728917,
  ]);
  const stringRef = useRef();
  const longRef = useRef();
  const handleRef = useRef();
  const frameRef = useRef();
  const [stringDecalTexture, setStringDecalTexture] = useState(null);

  useEffect(() => {
    if (configuration.stringDecal) {
      const loader = new TextureLoader();
      loader.load(configuration.stringDecal, (texture) => {
        setStringDecalTexture(texture);
      });
    } else {
      setStringDecalTexture(null);
    }
  }, [configuration.stringDecal]);

  useEffect(() => {
    frameRef.current.material = new MeshPhongMaterial({
      color: new Color(configuration.frameColor),
    });
    stringRef.current.material = new MeshPhongMaterial({
      color: new Color(configuration.stringColor),
    });
    handleRef.current.material = new MeshPhongMaterial({
      color: new Color(configuration.handleColor),
    });
    longRef.current.material = new MeshPhongMaterial({
      color: new Color(configuration.longColor),
    });
  }, [configuration, nodes]);

  useFrame(() => {
    if (rotating && scene) {
      scene.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {Object.entries(nodes).map(([nodeName, node]) => {
        if (
          node.type === 'Mesh' &&
          !['String', 'Handle', 'Frame', 'Long'].includes(nodeName)
        ) {
          const mesh = node;
          return (
            <mesh
              key={nodeName}
              name={nodeName}
              geometry={mesh.geometry}
              scale={0.2}
              castShadow
            />
          );
        }
        return null;
      })}
      <mesh
        ref={longRef}
        castShadow
        geometry={nodes.Long.geometry}
        scale={0.2}
      />
      <mesh
        ref={handleRef}
        castShadow
        geometry={nodes.Handle.geometry}
        scale={0.2}
      />
      <mesh
        ref={frameRef}
        castShadow
        geometry={nodes.Frame.geometry}
        scale={0.2}
      />
      <mesh
        ref={stringRef}
        castShadow
        geometry={nodes.String.geometry}
        scale={0.2}
      >
        {stringDecalTexture && (
          <Decal
            position={pos}
            rotation={rot}
            scale={scl}
            map={stringDecalTexture}
            depthTest={false}
          />
        )}
      </mesh>
    </group>
  );
};

export default RacketModel;
