import { Grid } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import type * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

interface DeviceOrientationEventStatic {
    new (type: string, eventInitDict?: DeviceOrientationEventInit): DeviceOrientationEvent;
    requestPermission(): Promise<PermissionState>;
}

declare global {
    interface Window {
        DeviceOrientationEvent: DeviceOrientationEventStatic;
    }
}
const X_MVMT_FACTOR_MOUSE = 0.001;
const Y_MVMT_FACTOR_MOUSE = 0.002;
// const X_MVMT_FACTOR_ORIENTATION = 0.03;
// const Y_MVMT_FACTOR_ORIENTATION = 0.03;

const SpacecraftMobile = ({ ...props }) => {
    const mesh = useRef<THREE.Group>(null);

    const fbx = useLoader(FBXLoader, '/spacecraftYellowCenter.fbx');

    const spacecraftRef = useRef<THREE.Mesh>(null);

    const [{ position, orientation }, set] = useControls(() => ({
        position: {
            value: { x: -1, y: 2, z: 0 },
            render: () => (process.env.NEXT_PUBLIC_CONTROLS ? true : false)
        },
        orientation: {
            value: { x: 0.23, y: (0.15 + 0.25) / 2.0, z: 0 },
            render: () => (process.env.NEXT_PUBLIC_CONTROLS ? true : false)
        }
    }));

    const handleMouseMove = (ev: MouseEvent) => {
        set({
            position: {
                x: position.x + -1 * X_MVMT_FACTOR_MOUSE * (ev.clientX - window.screen.width * 0.5),
                y: position.y + 1 * Y_MVMT_FACTOR_MOUSE * (ev.clientY - window.screen.height * 0.5),
                z: position.z
            }
        });
    };

    // const handleDeviceOrientation = (ev: DeviceOrientationEvent) => {
    //     if (ev.beta !== null && ev.gamma !== null) {
    //         set({
    //             position: {
    //                 x: position.x + ev.gamma * X_MVMT_FACTOR_ORIENTATION, // gamma is the left-to-right tilt
    //                 y: position.y + ev.beta * Y_MVMT_FACTOR_ORIENTATION, // beta is the front-to-back tilt
    //                 z: position.z
    //             }
    //         });
    //     }
    // };

    useEffect(() => {
        // const initOrientationEvent = () => {
        //     window.addEventListener('deviceorientation', handleDeviceOrientation);
        // };

        // if (
        //     typeof DeviceOrientationEvent !== 'undefined' &&
        //     typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventStatic).requestPermission === 'function'
        // ) {
        //     (DeviceOrientationEvent as unknown as DeviceOrientationEventStatic)
        //         .requestPermission()
        //         .then((permissionState) => {
        //             if (permissionState === 'granted') {
        //                 initOrientationEvent();
        //             }
        //         })
        //         .catch(console.error);
        // } else {
        //     initOrientationEvent();
        // }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            // window.removeEventListener('deviceorientation', handleDeviceOrientation);
            window.removeEventListener('mousemove', handleMouseMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (spacecraftRef?.current?.position) {
            spacecraftRef.current.position.y = position.y + Math.sin(t) * (Math.PI / 8);
            spacecraftRef.current.position.x = position.x + Math.cos(t) * (Math.PI / 8);
        }
    });

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

export default SpacecraftMobile;
