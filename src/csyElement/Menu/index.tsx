import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import { MenuItemProps } from './item';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  // 高亮索引
  className?: string;
  // 自定义类
  mode?: MenuMode;
  // 展示方向
  style?: React.CSSProperties;

  onSelect?: SelectCallback;
  // 菜单项被选中的回调
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({
  index: '0',
});

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames('csy__menu', className, {
    csy__menu__vertical: mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus: defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || 'SubMenu')
        return React.cloneElement(childElement, {
          index: `${index}`,
        });
      else console.error('Warning：Menu has a child which is not a MenuItem Component');
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

Menu.displayName = 'Menu';

export default Menu;
