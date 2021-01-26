import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import CloseCircle from '../CloseCircle/index';
import CheckCircle from '../CheckCircle/index';

describe('Custom Icon', () => {
  baseTest(<CloseCircle />);
  baseTest(<CheckCircle />);
});