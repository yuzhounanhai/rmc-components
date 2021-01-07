
import { renderHook } from '@testing-library/react-hooks';
import useUpdateEffect from '../index';

describe('useUpdateEffect', () => {

  it('should be defined', () => {
    expect(useUpdateEffect).toBeDefined();
  });

  it('should mounted correctly', () => {
    let mountedState = 1;
    const hook = renderHook(() =>
      useUpdateEffect(() => {
        mountedState = 2;
      }),
    );
    expect(mountedState).toEqual(1);
    hook.rerender();
    expect(mountedState).toEqual(2);
  });

  it('should mounted correctly with dependency list', () => {
    let mountedState = 1;
    let dependent = 0;
    const hook = renderHook(() =>
      useUpdateEffect(() => {
        mountedState = 2;
      }, [dependent]),
    );
    expect(mountedState).toEqual(1);
    dependent = 1;
    hook.rerender();
    expect(mountedState).toEqual(2);
  });
});