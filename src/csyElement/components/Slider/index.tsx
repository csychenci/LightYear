import React, { useEffect, useRef, useState } from 'react';
import './index.scss';

export interface SliderProps {

}

export default function Slider(props: SliderProps) {

  const sliderBoxRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLSpanElement>(null);

  const [flag, setFlag] = useState(false);

  const pointerDown = (event:any) => {

  }

  useEffect(() => {
    sliderBoxRef?.current?.addEventListener('touchmove', clearPreventDefault, false);
    return () => {
      sliderBoxRef?.current?.removeEventListener('touchmove', clearPreventDefault);
    }
  }, [])

  return <div ref={sliderBoxRef} className='toggle-slider'>
    <span onMouseDown={pointerDown}  ref={sliderRef} className='slider'></span>
  </div>
}

export const clearPreventDefault = (event: any) => {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.preventDefault = false
  }
}