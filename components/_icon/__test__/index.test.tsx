import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import CloseCircle from '@/_icon/CloseCircle/index';
import CheckCircle from '@/_icon/CheckCircle/index';

describe('Custom Icon', () => {
  baseTest(<CloseCircle />);
  baseTest(<CheckCircle />);
});