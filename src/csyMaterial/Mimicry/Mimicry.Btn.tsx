import React from 'react';
import './Mimicry.Btn.scss';

export default (props: any) => {
  return (
    <div className="mimicry-btn-container">
      {Array(2)
        .fill(7)
        .map((ele, idx) => {
          return (
            <div key={idx} className="mimicry-btn-box">
              <div className="mimicry-btn-img">
                <img src="test.png" alt="" />
              </div>
              <p>测试文字</p>
            </div>
          );
        })}
    </div>
  );
};
