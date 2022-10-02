import React, {useRef, useEffect} from "react";
import { gsap } from "gsap";
import { faker } from "@faker-js/faker";


const count = 200
const gallery = Array.from(Array(count).keys())

const BigImage = () => {
  const boxRef = useRef();

  // wait until DOM has been rendered
  useEffect(() => {
    gsap.fromTo(boxRef.current, {left:1920}, {left:0, delay: 10.0, repeat:10, yoyo:true});
    // gsap.fromTo(boxRef.current, {left:0}, {left:1920, repeat:10, yoyo:true});

  });
  
  // DOM to render
  return (
    <img ref={boxRef} className='bigImage' src={faker.image.cats()} />
  )
}

const Thumbnail = () => {
  const boxRef = useRef();

  // wait until DOM has been rendered
  useEffect(() => {
    gsap.to(boxRef.current, { rotation: "+=360",  repeat:10 });
  });
  
  // DOM to render
  return (
    <img ref={boxRef} className='thumbnail' src={faker.image.cats()} />
  )
}

const Menu = () => {
  const boxRef = useRef();

  // wait until DOM has been rendered
  useEffect(() => {
    gsap.to(boxRef.current, { left: "+=200" });
  });
  
  // DOM to render
  return (
    <div className="menu" ref={boxRef}>Hello</div>
  )
}
 
export default function Greensock() {
  const boxRef = useRef();

  // wait until DOM has been rendered
  useEffect(() => {
    gsap.to(boxRef.current, { rotation: "+=360" });
  });
  
  // DOM to render
  return (
    <div className="greensock-container ">
      <div className="box" ref={boxRef}>Hello</div>
      <Menu />
      <div className="gallery">
        {gallery.map(index => (<Thumbnail />))}
      </div>
      <BigImage />
  </div>
  )
}