import {OrbitControls, ScrollControls} from "@react-three/drei";
import {Overlay} from "./overlay.tsx";
import {Office} from "./office.tsx";

export function Experience() {
    return (
        <>
            <ambientLight intensity={1}/>
            <OrbitControls enableZoom={false} enableRotate={false}/>
            <ScrollControls pages={3} damping={0.25}>
                <Overlay />
                <Office />
            </ScrollControls>
        </>
    )
}