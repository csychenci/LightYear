import React, { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from '.';
import { MenuItemProps } from './item';
import './index.scss';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, children, className } = props;

  const context = useContext(MenuContext);

  const isOpened =
    index && context.mode === 'vertical' ? context?.defaultOpenSubMenus?.includes(index) : true;

  const [menuOpen, setOpen] = useState(isOpened);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: any;

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
        }
      : {};

  const classes = classNames('csy__menu__item csy__submenu__item', className, {
    'is-active': context?.index === index,
  });

  const renderChildren = () => {
    const subMenuClasses = classNames('csy__submenu', {
      'menu-opened': menuOpen,
    });

    const childrenElement = React.Children.map(children, (child, idx) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem')
        return React.cloneElement(childElement, {
          index: `${index}-${idx}`,
        });
      else console.error('Warning：SubMenu has a child which is not a MenuItem Component');
    });

    return <ul className={subMenuClasses}>{childrenElement}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
