## Menu

---

- 缺省状态下

```tsx
import React from 'react';
import { Menu, MenuItem } from 'BlogLatest';

export default () => (
  <>
    <Menu
      defaultIndex={0}
      onSelect={(index) => {
        console.log(index, 'index');
      }}
    >
      <MenuItem index={0}>item1</MenuItem>
      <MenuItem index={1} disabled>
        item2
      </MenuItem>
      <MenuItem index={2}>item3</MenuItem>
    </Menu>
  </>
);
```

- 垂直模式下

```tsx
import React from 'react';
import { Menu } from 'BlogLatest';
import { MenuItem } from 'BlogLatest';

const defaultMenu = () => <Menu>按钮</Menu>;

export default () => (
  <>
    <Menu
      mode="vertical"
      defaultIndex={0}
      onSelect={(index) => {
        console.log(index, 'index');
      }}
    >
      <MenuItem>item1</MenuItem>
      <MenuItem disabled>item2</MenuItem>
      <MenuItem>item3</MenuItem>
      {/* <span>2222</span> */}
    </Menu>
  </>
);
```

- SubMenu 菜单模式

```tsx
import React from 'react';
import { Menu, SubMenu, MenuItem } from 'BlogLatest';

const defaultMenu = () => <Menu>按钮</Menu>;

export default () => (
  <>
    <Menu
      mode="vertical"
      defaultIndex={0}
      onSelect={(index) => {
        console.log(index, 'index');
      }}
    >
      <MenuItem>item1</MenuItem>
      <SubMenu title="SubMenu">
        <MenuItem>item1</MenuItem>
        <MenuItem disabled>item2</MenuItem>
        <MenuItem>item3</MenuItem>
        {/* <span>2222</span> */}
      </SubMenu>
      <MenuItem>item3</MenuItem>
      {/* <span>2222</span> */}
    </Menu>
  </>
);
```

- SubMenu 菜单模式

```tsx
import React from 'react';
import { Menu, SubMenu, MenuItem } from 'BlogLatest';

const defaultMenu = () => <Menu>按钮</Menu>;

export default () => (
  <>
    <Menu
      defaultOpenSubMenus={['1']}
      defaultIndex={0}
      onSelect={(index) => {
        console.log(index, 'index');
      }}
    >
      <MenuItem>item1</MenuItem>
      <SubMenu title="SubMenu">
        <MenuItem>item1</MenuItem>
        <MenuItem disabled>item2</MenuItem>
        <MenuItem>item3</MenuItem>
        {/* <span>2222</span> */}
      </SubMenu>
      <MenuItem>item3</MenuItem>
      {/* <span>2222</span> */}
    </Menu>
  </>
);
```
