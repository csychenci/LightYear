import classnames from 'classnames';
import './index.scss';
import React, { CSSProperties, useRef, useState } from "react";

export type SwitchSize = "default" | "small";

export interface SwitchProps {
  disabled?: boolean;
  size?: SwitchSize;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (val: boolean) => void;
  onColor?: string;
  offColor?: string;
  style?:CSSProperties
}

export default function Switch(props: SwitchProps) {
  const {
    disabled = false,
    defaultChecked = false,
    onColor = "#86d993",
    offColor = "rgb(251, 251, 251)",
    className,
    onChange,
    style
  } = props;

  const [on, setOn] = useState(defaultChecked ?? false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLSpanElement>(null);

  const move = () => {
    const moveX = !on ? `translate(${wrapRef?.current?.clientWidth! - toggleRef?.current?.clientWidth!}px)` : 'translate(0px)';
    toggleRef.current!.style.transform = moveX;
  }

  const clickHander: React.MouseEventHandler<HTMLInputElement> = (e: React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    e?.preventDefault();
    if (disabled) return;
    move();
    setOn(!on);
    onChange?.(!on);
  }

  const cls = classnames('switch-wrap', {
    'on': on,
    'disabled': disabled
  }, className)

  const toggleCls = classnames('switch-btn', {
    'active':on,
    'right': defaultChecked
  })

  return <label className='toggle-switch' style={style}>
    <input
      className='toggle-input'
      type='checkbox'
      checked={on}
      onChange={() => { }}
      onClick={clickHander}
    />
    <div
      ref={wrapRef}
      className={cls} style={{
        background: on ? onColor : offColor
      }}
    >
      <span ref={toggleRef} className={toggleCls}></span>
    </div>
  </label>

};