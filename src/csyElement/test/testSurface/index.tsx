import React from 'react';
// @ts-ignore
import styled from 'styled-components';

export default (props: any) => {
  const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;
  return (
    <Wrapper>
      {[1, 2, 3].map((item) => {
        return (
          <div key={item} className="box">
            Second article Tacos actually microdosing, pour-over semiotics banjo chicharrones retro
            fanny pack portland everyday carry vinyl typewriter. Tacos PBR&B pork belly, everyday
            carry ennui pickled sriracha normcore hashtag polaroid single-origin coffee
            cold-pressed. PBR&B tattooed trust fund twee, leggings salvia iPhone photo booth health
            goth gastropub hammock.
          </div>
        );
      })}
    </Wrapper>
  );
};
