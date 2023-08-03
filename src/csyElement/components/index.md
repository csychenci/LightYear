# Components
---
## Switch
---
```tsx
import React from 'react';
import {Switch} from 'BlogLatest';

export default function SwitchDemo() {

  const clickHandler = (val:boolean) => {
    // console.log(val);
  }

  return (
    <div>
      <div>
        <Switch
          disabled
        />
      </div>
      <div>
        <Switch
          disabled
          defaultChecked={true}
        />
      </div>
      <div>
        <Switch
          onChange={clickHandler}
          onColor="#0958d9"
          style={{
            width:"66px"
          }}
        />
      </div>
      <div>
        <Switch
          onColor="#69B1FF"
        />
      </div>
    </div>
  )
}
```
---
## Slider
---
```tsx
import React from 'react';
import {Slider} from 'BlogLatest';

export default function SliderDemo() {

  const clickHandler = (val:boolean) => {
    // console.log(val);
  }

  return (
    <div>
      <div>
        <Slider
          
        />
      </div>
    </div>
  )
}
```
