'use client';

import * as THREE from 'three'
import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Decal, useTexture } from '@react-three/drei'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { easing } from 'maath'
import { Effects } from './Effects'

const accents = ['#a855f7', '#6366f1', '#20ffa0', '#ff4060']

const logos = [
    { url: '/logos/React.png', color: '#61dafb' },
    { url: '/logos/js.png', color: '#f7df1e' },
    { url: '/logos/node.png', color: '#339933' },
    { url: '/logos/mysql.png', color: '#4479a1' },
    { url: '/logos/php.png', color: '#777bb4' },
    { url: '/logos/Python.png', color: '#3776ab' },
    { url: '/logos/html.png', color: '#e34f26' },
    { url: '/logos/css.png', color: '#1572b6' }
]

const shuffle = (accent = 0) => [
    { roughness: 0.1, metalness: 0.5 },
    { roughness: 0.1, metalness: 0.5 },
    { roughness: 0.1, metalness: 0.5 },
    { roughness: 0.1, metalness: 0.1 },
    { roughness: 0.1, metalness: 0.1 },
    { roughness: 0.1, metalness: 0.1 },
    { color: accents[accent], roughness: 0.1 },
    { color: accents[accent], roughness: 0.1 },
    { color: accents[accent], roughness: 0.1 },
    { color: '#444', roughness: 0.1 },
    { color: '#444', roughness: 0.3 },
    { color: '#444', roughness: 0.3 },
    { color: 'white', roughness: 0.1 },
    { color: 'white', roughness: 0.2 },
    { color: 'white', roughness: 0.1 },
    { color: accents[accent], roughness: 0.1, transparent: true, opacity: 0.5 },
    { color: accents[accent], roughness: 0.3 },
    { color: accents[accent], roughness: 0.1 }
]

export default function GlobalBackground3D() {
    const [accent] = useState(0)
    const connectors = useMemo(() => shuffle(accent), [accent])
    const mouse = useRef({ x: 0, y: 0 })

    // Global mouse tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 5,
                pointerEvents: 'none', // Allow clicks to pass through
                background: 'transparent'
            }}
        >
            <Canvas
                flat
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
                camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 40 }}
                style={{ pointerEvents: 'none' }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 10]} intensity={1} />

                <Cluster>
                    <Physics timeStep="vary" gravity={[0, 0, 0]}>
                        <Pointer mouseCoords={mouse} />
                        {connectors.map((ballProps, i) => {
                            const logo = logos[i % logos.length]
                            return <Sphere key={i} {...ballProps} color={ballProps.color || logo.color} logo={logo.url} />
                        })}
                    </Physics>
                </Cluster>

                <Environment resolution={256}>
                    <group rotation={[-Math.PI / 3, 0, 1]}>
                        <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
                        <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                        <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
                        <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
                        <Lightformer form="ring" color="#a855f7" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
                    </group>
                </Environment>

                <Effects />
            </Canvas>
        </div>
    )
}

function Cluster({ children }) {
    const g = useRef()
    useFrame((_, d) => {
        if (!g.current) return
        g.current.rotation.y += d * 0.08
        g.current.rotation.x += d * 0.05
    })
    return <group ref={g}>{children}</group>
}

function Sphere({ position, vec = new THREE.Vector3(), r = THREE.MathUtils.randFloatSpread, color = 'white', logo, ...props }) {
    const api = useRef()
    const ref = useRef()
    const pos = useMemo(() => position || [r(12), r(12), r(12)], [])

    const decalMap = useTexture(logo)
    decalMap.colorSpace = THREE.SRGBColorSpace
    decalMap.anisotropy = 4

    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.15))
        if (ref.current?.material?.color) easing.dampC(ref.current.material.color, color, 0.2, delta)
    })

    return (
        <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
            <BallCollider args={[1]} />

            <mesh ref={ref} castShadow receiveShadow>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial {...props} polygonOffset polygonOffsetFactor={-5} />

                <Decal position={[0, 0, 1.08]} rotation={[0, Math.PI, 0]} scale={1.35}>
                    <meshStandardMaterial
                        map={decalMap}
                        transparent
                        alphaTest={0.5}
                        polygonOffset
                        polygonOffsetFactor={-10}
                        toneMapped={false}
                        onBeforeCompile={(shader) => {
                            shader.fragmentShader = shader.fragmentShader.replace(
                                '#include <map_fragment>',
                                `
                #include <map_fragment>
                float dist = length(vUv - 0.5);
                if (dist > 0.5) discard;
                if (length(diffuseColor.rgb) < 0.2) discard;
                `
                            )
                        }}
                    />
                </Decal>
            </mesh>
        </RigidBody>
    )
}

function Pointer({ mouseCoords, vec = new THREE.Vector3() }) {
    const ref = useRef()
    const { viewport } = useThree()

    useFrame(() => {
        if (!ref.current) return
        const x = (mouseCoords.current.x * viewport.width) / 2
        const y = (mouseCoords.current.y * viewport.height) / 2
        ref.current.setNextKinematicTranslation(vec.set(x, y, 0))
    })

    return (
        <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[1.5]} />
        </RigidBody>
    )
}
