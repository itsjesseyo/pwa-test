import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BreathingDots from './BreathingDots';
import ReflectiveTriangles from './ReflectiveTriangles';
import { FpsView } from 'react-fps';
import Lorem from './Lorem';
import Spill from './Spill';
import MyMeshLine from './MyMeshLine';
import PixiTest from './PixiTest';
import {useKeycode, useKeycodes} from '@accessible/use-keycode'
import { useWindowSize } from '@react-hook/window-size';
import { browserName, BrowserView, browserVersion, fullBrowserVersion } from "react-device-detect";
import isWebglEnabled from 'is-webgl-enabled';
import Greensock from './Greensock';

const items = [
  (<Greensock />),
  (<App />),
  (<BreathingDots />),
  (<ReflectiveTriangles />),
  (<Spill />),
  (<MyMeshLine />),
  (<PixiTest />)
]

let index = 0

const Menu = () => {
  const [itemIndex, setItemIndex] = useState(0)

  const next = () => {
    let next = index + 1
    if(next >= items.length) {
      next = 0
    }
    index = next
    setItemIndex(index)
  }
  const prev = () => {
    let next = index - 1
    if(next <= -1) {
      next = items.length-1
    }
   index = next
   setItemIndex(index)
  }
  const ref = useKeycodes({39: console.log, 37: prev})

  const handleKeypress = useCallback((event) => {
    if(event.keyCode === 39){
      next()
    }else if(event.keyCode === 37){
      prev()
    }
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeypress, false);
    return () => {
      document.removeEventListener("keydown", handleKeypress, false);
    };
  }, []);

  return (
    <>
      {items[itemIndex]}
    </>
  )

}

const Info = () => {
  const [width, height] = useWindowSize()
  const hasWebGl = isWebglEnabled() ? 'enabled' : 'unavailable'

  return (
    <div className="info">
      <header className="App-header">
        <p>
          window width={width}, and height={height}
        </p>
        <p>
          name:{browserName} <br/>
          version: {fullBrowserVersion} <br/>
          webgl: {hasWebGl} <br/>
        </p>
      </header>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <App /> */}
    {/* <BreathingDots /> */}
    {/* <ReflectiveTriangles /> */}
    {/* <Lorem /> */}
    {/* <Spill /> */}
    {/* <MyMeshLine /> */}
    {/* <PixiTest /> */}
    <Menu />
    <FpsView />
    <Info />
  </>
);

