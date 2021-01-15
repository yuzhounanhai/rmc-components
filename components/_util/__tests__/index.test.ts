import * as utils from '../index';

describe('utils', () => {
  it('isDef functions should work correctly', () => {
    expect(utils.isDef(undefined)).toBeFalsy();
    expect(utils.isDef(null)).toBeFalsy();
    expect(utils.isDef(1)).toBeTruthy();
    expect(utils.isDef(0)).toBeTruthy();
    expect(utils.isDef('')).toBeTruthy();
    expect(utils.isDef('1')).toBeTruthy();
    expect(utils.isDef(NaN)).toBeTruthy();
    expect(utils.isDef(true)).toBeTruthy();
    expect(utils.isDef(false)).toBeTruthy();
    expect(utils.isDef(Symbol())).toBeTruthy();
    expect(utils.isDef({})).toBeTruthy();
    expect(utils.isDef(new Object())).toBeTruthy();
    expect(utils.isDef(() => null)).toBeTruthy();
  });
});
