import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import Carousel from '../index';
import { SwiperSlide } from 'swiper/react';

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

  baseTest(
    <Carousel
      autoplay={{
        delay: 5000,
      }}
    >
      <SwiperSlide>
        <div>1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>3</div>
      </SwiperSlide>
    </Carousel>
  );
});