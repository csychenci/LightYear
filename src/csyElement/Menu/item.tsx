import React, { useEffect, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from '.';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;

  const context = useContext(MenuContext);

  const classes = classNames('csy__menu__item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });

  const handleClick = () => {
    context?.onSelect && !disabled && typeof index === 'string' && context?.onSelect(index!);
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
