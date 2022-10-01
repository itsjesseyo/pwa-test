import { useReducer, useRef, useState, useEffect } from 'react'
import { Stage, Sprite, useTick, Container } from '@saitonakamura/react-pixi'
import { useWindowSize } from '@react-hook/window-size';
import { browserName, BrowserView, browserVersion, fullBrowserVersion } from "react-device-detect";
import isWebglEnabled from 'is-webgl-enabled';

const count = 500
const bunnies = Array.from(Array(count).keys())

export default function PixiTest() {
  const [width, height] = useWindowSize()
  const hasWebGl = isWebglEnabled() ? 'enabled' : 'unavailable'
  const reducer = (_, { data }) => data
  
  const Bunny = () => {
    const [width, height] = useWindowSize()
    const [motion, update] = useReducer(reducer)
    const iter = useRef(0)
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
    const [scale, setScale] = useState(0)
    useEffect(()=> {
      const x = Math.random() * width / 2
      const y = Math.random() * height / 2

      const dis = Math.random() * height
      setScale(dis)
      setStartX(x)
      setStartY(y)
    }, [width, height])
    useTick(delta => {
      const i = (iter.current += 0.05 * delta)
      update({
        type: 'update',
        data: {
          x: startX + (Math.sin(i) * scale),
          y: startY +  (Math.sin(i / 1.5) * scale),
          rotation: Math.sin(i) * Math.PI,
          anchor: Math.sin(i / 2),
        },
      })
    })
    return (
      <Sprite
        image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        {...motion}
      />
    )
  }
  return (
    <>
    <Stage width={width} height={height} options={{ backgroundAlpha: 0 }}>
      <Container x={150} y={150}>
        {bunnies.map(index => (<Bunny />))}
      </Container>
    </Stage>
    
    </>
  )
}