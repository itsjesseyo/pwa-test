import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

let total = 0

let count = Array.from(Array(100), (_,x) => x);

function Box(props) {

  const [rotationSpeed, setRotationSpeed] = useState(Math.random() / 20)

  const [xStart, setXStart] = useState(4 * Math.random())
  const [xSize, setXSize] = useState(10 * Math.random())

  const [yStart, setYStart] = useState(4 * Math.random())
  const [ySize, setYSize] = useState(10 * Math.random())

  const [zStart, setZStart] = useState(4 * Math.random())
  const [zSize, setZSize] = useState(10 * Math.random())

  const [scale, setScale] = useState(Math.random() * 2)

  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    total += delta
    mesh.current.rotation.x += rotationSpeed
    mesh.current.position.x = xStart + Math.sin(total) * xSize
    mesh.current.rotation.y += rotationSpeed
    mesh.current.position.y = yStart + Math.sin(total) * ySize
    mesh.current.rotation.z += rotationSpeed
    mesh.current.position.z = zStart + Math.sin(total) * zSize
    
  })

  useEffect(() => {
    mesh.current.scale.set(scale, scale, scale)
  },[])

  return (
    <mesh
      {...props}
      ref={mesh}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas gl={{ alpha: false }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      {count.map(item => (<Box />))}
    </Canvas>
  );
}

export default App;
