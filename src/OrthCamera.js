import React, { useRef, useEffect } from 'react'
import { useThree } from 'react-three-fiber'

const Camera = () => {
  const camera = useRef()
  const { size, setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera])
  return (
    <orthographicCamera
      ref={camera}
      top={size.height / 2}
      right={size.width / 2}
      bottom={-size.height / 2}
      left={-size.width / 2}
      far={1000}
      near={1}
      position={[0, 0, 500]}
      onUpdate={self => self.updateProjectionMatrix()}
    />
  )
}

export default Camera
