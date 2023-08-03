## Button

Demo:

```tsx
import React from 'react';
import { Button } from 'BlogLatest';

const defaultBtn = () => <Button>按钮</Button>;
const primaryBtn = () => <Button btnType="Primary">按钮</Button>;
const dangerBtn = () => <Button btnType="Danger">按钮</Button>;
const linkBtn = () => <Button btnType="Link">按钮</Button>;

export default () => (
  <>
    <Button>按钮</Button>
    <Button btnType="primary">按钮</Button>
    <Button btnType="danger">按钮</Button>
    <Button btnType="link">按钮</Button>
  </>
);
```
