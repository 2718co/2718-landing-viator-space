import { Grid } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import type * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const X_MVMT_FACTOR = 0.001;
const Y_MVMT_FACTOR = 0.002;

// TODO: remove this once project is complete
const Spacecraft = ({ ...props }) => {
    // const router = useRouter();
    const mesh = useRef<THREE.Group>(null);

    const fbx = useLoader(FBXLoader, '/spacecraftYellowCenter.fbx');

    const spacecraftRef = useRef<THREE.Mesh>(null);

    const [{ position, orientation }, set] = useControls(() => ({
        position: {
            value: { x: -1, y: 2, z: 0.5 },
            render: () => false
        },
        orientation: {
            value: { x: (0.23 + 0.1) / 2.0, y: (0.15 + 0.25) / 2.0, z: 0 },
            render: () => false
        }
    }));

    const handleMouseMove = (ev: MouseEvent) => {
        set({
            position: {
                x: position.x + -1 * X_MVMT_FACTOR * (ev.clientX - window.screen.width * 0.5),
                y: position.y + 1 * Y_MVMT_FACTOR * (ev.clientY - window.screen.height * 0.5),
                z: position.z
            }
        });
    };

    useEffect(() => {
        // const handleMouseMove = (ev) => console.log(ev);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
        // Do not include handleMouseMove there, otherwise it would not work
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFrame(
        (
            state
            // delta
        ) => {
            const t = state.clock.getElapsedTime();
            if (spacecraftRef?.current?.position) {
                spacecraftRef.current.position.y = position.y + Math.sin(t) * (Math.PI / 8);
                spacecraftRef.current.position.x = position.x + Math.cos(t) * (Math.PI / 8);
                // spacecraftRef.current.rotation.x = orientation.x + Math.cos(t) * (0.23 - 0.1)
                // spacecraftRef.current.rotation.y = orientation.y + Math.cos(t) * (0.1)
                // spacecraftRef.current.rotation.z -= delta / 4;
            }
        }
    );

    return (
        <group ref={mesh} {...props}>
            <mesh
                ref={spacecraftRef}
                rotation={[Math.PI * orientation.x, Math.PI * orientation.y, Math.PI * orientation.z]}
                position={[position.x, position.y, position.z]}
                scale={0.5}
            >
                <primitive object={fbx} />
                <meshStandardMaterial />
            </mesh>
            <Grid />
        </group>
    );
};

export default Spacecraft;
