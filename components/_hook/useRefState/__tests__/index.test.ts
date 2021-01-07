import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import useRefState from '../index';

describe('useRefState', () => {
  it('should be defined', () => {
    expect(useRefState).toBeDefined();
  });

  it('should return a array with correctly value', () => {
    const defaultValue = 1;
    const { result } = renderHook(
      () => useRefState(defaultValue)
    );
    expect((result.current[0] as React.RefObject<number>).current).toBe(defaultValue);
    expect(typeof result.current[1]).toBe('function');
  });

  it('should get right value when set function called', () => {
    const defaultValue = 1;
    const { result } = renderHook(
      () => useRefState(defaultValue)
    );
    const changedValue = 2;
    act(() => {
      (result.current[1] as Function)(changedValue);
    });
    expect((result.current[0] as React.RefObject<number>).current).toBe(changedValue);
  });

  it('should use callback function to set ref value', () => {
    const defaultValue = 1;
    const { result } = renderHook(
      () => useRefState(defaultValue)
    );
    act(() => {
      (result.current[1] as Function)((prevValue: number) => {
        return prevValue + 1;
      });
    });
    expect((result.current[0] as React.RefObject<number>).current).toBe(defaultValue + 1);
  });

  it('should get right value after multi changes', () => {
    const defaultValue = 1;
    const { result } = renderHook(
      () => useRefState(defaultValue)
    );
    act(() => {
      (result.current[1] as Function)(2);
    });
    expect((result.current[0] as React.RefObject<number>).current).toBe(2);
    act(() => {
      (result.current[1] as Function)((prevValue: number) => {
        return prevValue + 1;
      });
    });
    expect((result.current[0] as React.RefObject<number>).current).toBe(3);
    act(() => {
      (result.current[1] as Function)(4);
    });
    expect((result.current[0] as React.RefObject<number>).current).toBe(4);
  });
});