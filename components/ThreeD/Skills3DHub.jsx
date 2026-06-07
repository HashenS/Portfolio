'use client';

import * as THREE from 'three'
import { useRef, useMemo, useEffect, useState, useReducer } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Decal, useTexture } from '@react-three/drei'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { easing } from 'maath'
import { Effects } from './Effects'
import useIsMobile from '../../hooks/useIsMobile'

const accents = ['#ff4060', '#ffcc00', '#20ffa0', '#4060ff']

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

export default function Skills3DHub({ containerRef }) {
    const isMobile = useIsMobile()
    const [accent, click] = useReducer((state) => ++state % accents.length, 0)
    const connectors = useMemo(() => shuffle(accent), [accent])
    const mouse = useRef({ x: 0, y: 0 })
    const rectRef = useRef(null)
    const [isInView, setIsInView] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)

    // Preload all textures early
    useEffect(() => {
        logos.forEach(logo => {
            useTexture.preload(logo.url)
        })
        setHasMounted(true)
    }, [])

    // Intersection Observer to pause/play for performance, but don't unmount immediately
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.01 } // Lower threshold to keep context alive during transitions
        )
        if (containerRef.current) observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [containerRef])

    // Cache the bounding rectangle to avoid per-frame layout thrashing
    useEffect(() => {
        if (!containerRef.current || !hasMounted) return

        const updateRect = () => {
            if (containerRef.current) {
                rectRef.current = containerRef.current.getBoundingClientRect()
            }
        }

        updateRect()
        const resizeObserver = new ResizeObserver(updateRect)
        if (containerRef.current) resizeObserver.observe(containerRef.current)

        window.addEventListener('resize', updateRect)
        window.addEventListener('scroll', updateRect, true)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', updateRect)
            window.removeEventListener('scroll', updateRect, true)
        }
    }, [containerRef, hasMounted])

    // Capture mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!rectRef.current || !isInView) return
            const rect = rectRef.current

            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

            mouse.current.x = x
            mouse.current.y = y
        }

        const handleTouchMove = (e) => {
            if (!rectRef.current || !isInView) return
            // Prevent scrolling when interacting with the 3D element if desired,
            // but might block page scroll.
            // e.preventDefault() 

            const rect = rectRef.current
            const touch = e.touches[0]

            const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
            const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1

            mouse.current.x = x
            mouse.current.y = y
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('touchmove', handleTouchMove, { passive: false })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('touchmove', handleTouchMove)
        }
    }, [isInView])

    if (!hasMounted) return null

    return (
        <div
            onClick={click}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 3,
                pointerEvents: 'auto',
                background: 'transparent',
                opacity: isInView ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
            }}
        >
            <Canvas
                flat
                shadows
                frameloop={isInView ? 'always' : 'never'} // Don't render if not in view, but keep context
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, stencil: false, depth: true, powerPreference: "high-performance" }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0)
                }}
                camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 40 }}
                style={{ pointerEvents: 'none' }}
            >
                {/* <color attach="background" args={['#141622']} /> */}
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
                        <Lightformer form="ring" color={accents[accent]} intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
                    </group>
                </Environment>

                {!isMobile && <Effects />}
            </Canvas>
        </div>
    )
}

function Cluster({ children }) {
    const g = useRef()
    useFrame((_, d) => {
        if (!g.current) return
        g.current.rotation.y += d * 0.12
        g.current.rotation.x += d * 0.05
    })
    return <group ref={g}>{children}</group>
}

function Sphere({ position, vec = new THREE.Vector3(), r = THREE.MathUtils.randFloatSpread, color = 'white', logo, ...props }) {
    const api = useRef()
    const ref = useRef()
    const pos = useMemo(() => position || [r(8), r(8), r(8)], [])

    const decalMap = useTexture(logo)
    decalMap.colorSpace = THREE.SRGBColorSpace
    decalMap.anisotropy = 16

    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        // COMPENSATION: Higher impulse (0.3) for snappier return since damping is lower
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.3))
        if (ref.current?.material?.color) easing.dampC(ref.current.material.color, color, 0.2, delta)
    })

    return (
        <RigidBody linearDamping={1.5} angularDamping={0.5} friction={0.1} position={pos} ref={api} colliders={false}>
            <BallCollider args={[1]} />

            <mesh ref={ref} castShadow receiveShadow>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial {...props} polygonOffset polygonOffsetFactor={-5} />

                {/* ✅ LOGO - Rounded/Circular and color-matched with custom shader */}
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
                                float dist = length(vMapUv - 0.5);
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
            <BallCollider args={[1.2]} />
        </RigidBody>
    )
}
