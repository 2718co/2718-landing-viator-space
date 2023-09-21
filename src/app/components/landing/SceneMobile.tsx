import { Html, OrbitControls, Preload, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';
import * as THREE from 'three';
import SpacecraftMobile from './SpacecraftMobile';

// TODO: remove this once project is complete
interface Props extends PropsWithChildren {
    className?: string;
    //   eventSource?: MutableRefObject<HTMLCanvasElement | undefined>;
    //   eventPrefix?: "offset" | "client" | "page" | "layer" | "screen";
}

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

const SceneMobile = ({ ...props }: Props) => {
    // Everything defined in here will persist between route changes, only children are swapped
    return (
        <Canvas {...props} style={{ width: '100vw', height: '30vh' }}>
            <directionalLight intensity={0.75} />
            <ambientLight intensity={0.75} />
            {process.env.NEXT_PUBLIC_CONTROLS && <primitive object={new THREE.AxesHelper(20)} />}
            {/* {children} */}
            <Suspense fallback={<Loader />}>
                <SpacecraftMobile />
            </Suspense>
            <Preload all />
            {process.env.NEXT_PUBLIC_CONTROLS && <OrbitControls />}
        </Canvas>
    );
};

export default SceneMobile;
