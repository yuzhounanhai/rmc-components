import React from 'react';
import Skeleton from '../index';
import baseTest from '../../../tests/common/baseTest';

describe('Skeleton', () => {
  describe('Skeleton.Article', () => {
    baseTest(
      <Skeleton />
    );
    baseTest(
      <Skeleton active />
    );
    baseTest(
      <Skeleton avatar />
    );
    baseTest(
      <Skeleton title />
    );
    baseTest(
      <Skeleton paragraph={false} />
    );
  });

  describe('Skeleton.Element', () => {
    baseTest(
      <Skeleton.Element />
    );
    baseTest(
      <Skeleton.Element element="span" />
    );
    baseTest(
      <Skeleton.Element element="span" display="block" />
    );
    baseTest(
      <Skeleton.Element
        element="span"
        display="block"
        style={{
          width: '100px',
          height: '30px',
        }}
      />
    );
  });

  describe('Skeleton.Button', () => {
    baseTest(
      <Skeleton.Button />
    );
    baseTest(
      <Skeleton.Button
        width="50%"
      />
    );
    baseTest(
      <Skeleton.Button
        height="30px"
      />
    );
    baseTest(
      <Skeleton.Button
        shape="smooth"
      />
    );
    baseTest(
      <Skeleton.Button
        shape="round"
      />
    );
  });

  describe('Skeleton.Avatar', () => {
    baseTest(
      <Skeleton.Avatar />
    );
    baseTest(
      <Skeleton.Avatar size="100px" />
    );
  });

  describe('Skeleton.Paragraph', () => {
    baseTest(
      <Skeleton.Paragraph />
    );
    baseTest(
      <Skeleton.Paragraph width="20%" />
    );
    baseTest(
      <Skeleton.Paragraph height="40px" />
    );
    baseTest(
      <Skeleton.Paragraph rows={3} />
    );
    baseTest(
      <Skeleton.Paragraph width={['20%', '30%', '40%']} rows={3} />
    );
  });

  describe('Skeleton.Title', () => {
    baseTest(
      <Skeleton.Title />
    );
    baseTest(
      <Skeleton.Title width="200px" />
    );
    baseTest(
      <Skeleton.Title height="20px" />
    );
  });

  describe('Skeleton.Image', () => {
    baseTest(
      <Skeleton.Image />
    );
    baseTest(
      <Skeleton.Image width="100px" />
    );
    baseTest(
      <Skeleton.Image height="100px" />
    );
    baseTest(
      <Skeleton.Image icon={false} />
    );
    baseTest(
      <Skeleton.Image shape="smooth" />
    );
    baseTest(
      <Skeleton.Image shape="circle" />
    );
  });
});