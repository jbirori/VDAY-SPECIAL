import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

function RainHearts() {
  const [heartList, setHeartList] = useState([]);

  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  useEffect(() => {
    if (window !== undefined && heartList.length === 0) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const numHearts = 50;
      let newHeartList = [];
      for (var i = 0; i < numHearts; i++) {
        var sizeR = getRandomArbitrary(10,30);
        var startLeft = getRandomArbitrary(0,screenWidth);

        var timeRun = getRandomArbitrary(5000,8000);
        var delay = getRandomArbitrary(0,6000);
        var opacityR = Math.random() * (1 - 0.2) + 0.2;
        var sizeR = getRandomArbitrary(5,20);

        var endLeft = getRandomArbitrary(startLeft-100,startLeft+100);

        let startStyle = {
          'left': startLeft + 'px',
          'opacity': opacityR,
          'fontSize': sizeR + 'px',
          top: '-' + sizeR + 5 + 'px'
        }

        let animationInfo = {
          'delay': delay,
          'duration': timeRun,
          'top': screenHeight + sizeR + 'px',
          'left': endLeft + 'px'
        }

        newHeartList.push(
          <RainHearts.Heart
            animationInfo={animationInfo}
            key={"rainheart" + i + startLeft}
            style={startStyle}
          >
            &#9829;
          </RainHearts.Heart>
        )
      }

      setHeartList(newHeartList)
    }
  })

  return (
    <RainHearts.Screen className="heart-screen">
      { heartList }
    </RainHearts.Screen>
  );
}
RainHearts.Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const rainKeyframe = (left, top) => keyframes`
  100% {
    left: ${left};
    top: ${top}
  }
`;

RainHearts.Heart = styled.span`
  position: absolute;
  z-index: 2;
  color: red;
  display: block;
  animation:
    infinite
    linear
    ${p => rainKeyframe(p.animationInfo.left, p.animationInfo.top)}
    ${p => p.animationInfo.duration/1000}s;
  animation-delay: ${p => p.animationInfo.delay/1000}s;
`;

export default RainHearts;
