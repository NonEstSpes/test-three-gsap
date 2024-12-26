import {useGLTF, useScroll} from "@react-three/drei";
import {useLayoutEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from 'three';
import {Mesh} from "three";


export const FLOOR_HEIGHT = 2.3;
export const NG_FLOORS = 3;

export function Office(props: object) {
    const {nodes, materials} = useGLTF('WawaOffice.glb')
    const ref = useRef<THREE.Group>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const libraryRef = useRef<THREE.Group>(null);
    const atticRef = useRef<THREE.Group>(null);

    const scroll = useScroll();

    useFrame(() => {
        if (!tl.current) return
        tl.current.seek(scroll.offset * tl.current.duration())
    })

    useLayoutEffect(() => {
        if(!ref.current || !libraryRef.current || !atticRef.current) return;
        tl.current = gsap.timeline()
        tl.current.to(ref.current.position, {
            duration: 2,
            y: -FLOOR_HEIGHT * (NG_FLOORS - 1)
        }, 0
        )

        tl.current.to(
            ref.current.rotation,
            {duration: 1, x: 0, y: -Math.PI / 6, z: 0},
            0
        )

        tl.current.to(
            ref.current.rotation,
            {duration: 1, x: 0, y: -Math.PI / 6, z: 0},
            1
        )

        tl.current.to(
            ref.current.position,
            {duration: 1, x: -1, z: 2},
            0
        )
        tl.current.to(
            ref.current.position,
            {duration: 1, x: 1,z: 2},
            1
        )

        tl.current.from(
            libraryRef.current.position,
            {
                duration: 0.5,
                x: -2,
            },
            0.5
        );
        tl.current.from(
            libraryRef.current.rotation,
            {
                duration: 0.5,
                y: -Math.PI / 2,
            },
            0
        );

        tl.current.from(
            atticRef.current.position,
            {
                duration: 1.5,
                y: 2,
            },
            0
        );

        tl.current.from(
            atticRef.current.rotation,
            {
                duration: 0.5,
                y: Math.PI / 2,
            },
            1
        );

        tl.current.from(
            atticRef.current.position,
            {
                duration: 0.5,
                z: -2,
            },
            1.5
        );
    }, [ref,libraryRef,atticRef])

    return (
        <group
            {...props}
            dispose={null}
            ref={ref}
            position={[0.5, -1, -1]}
            rotation={[0, -Math.PI / 3, 0]}
        >
            <mesh geometry={(nodes["01_office"] as Mesh).geometry} material={materials["01"]}/>
            <group position={[0, 2.11, -2.23]}>
                <group ref={libraryRef}>
                    <mesh
                        geometry={(nodes["02_library"] as Mesh).geometry}
                        material={materials["02"]}
                    />
                </group>
            </group>
            <group position={[-1.97, 4.23, -2.2]}>
                <group ref={atticRef}>
                    <mesh
                        geometry={(nodes["03_attic"] as Mesh).geometry}
                        material={materials["03"]}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload("WawaOffice.glb");