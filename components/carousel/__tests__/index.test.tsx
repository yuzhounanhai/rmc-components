import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import Carousel from '../index';

describe('Carousel', () => {
  baseTest(
    <Carousel>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Carousel>
  );

  baseTest(
    <Carousel
      dots
    >
      <div key={1}>1</div>
      <div key={2}>2</div>
      <div key={3}>3</div>
    </Carousel>
  );

  baseTest(
    <Carousel
      autoplay
    >
      <div key={1}>1</div>
      <div key={2}>2</div>
      <div key={3}>3</div>
    </Carousel>
  );
});