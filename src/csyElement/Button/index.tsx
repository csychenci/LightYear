import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';
import './index.scss';

// const classNames = (...names: any[]) => {
//   console.log(names)
//   let currentNames: string[] = [];
//   names.forEach((name) => {
//     if (name) currentNames.push(name)
//   });
//   return currentNames.join(' ');
// }

export enum ButtonSize {
  lg = 'lg',
  sm = 'sm',
}
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}
// export type ButtonSize = 'lg' | 'sm';
// export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: FC<BaseButtonProps> = (props) => {
  const { btnType, disabled, className, size, children, href, ...OtherProps } = props;

  const classes = classNames('csy__btn', {
    [`csy__btn__${btnType}`]: btnType,
    [`csy__btn__${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...OtherProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...OtherProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
};

export default Button;
