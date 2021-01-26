import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import { Swiper as BaseSwiper } from 'swiper';
import Swiper from './swiper';
import { SwiperSlide } from 'swiper/react';
import { isDef } from '../_util/index';
import { defaultPrefixCls } from '../_config/dict';

export type Key = string | number;

export interface PickerImcascadeData {
  key: Key;
  value: React.ReactNode;
  [key: string]: any;
};

export interface handledImcascadeData extends PickerImcascadeData {
  $$react$$node: React.ReactNode;
};

export interface PickerCascadeData {
  key: Key;
  value: React.ReactNode;
  children?: PickerCascadeData[];
  [key: string]: any;
};

export interface handledCascadeData extends PickerCascadeData {
  $$react$$node: React.ReactNode;
};

export type PickerData = PickerImcascadeData[][] | PickerCascadeData[];

export interface PickerViewProps {
  data?: PickerData;
  defaultValue?: Key[];
  defaultShowCount?: number;
  onChange?: (value: Key[]) => void;
  minCols?: number;
  prefixCls?: string;
  [key: string]: any;
}

function getItemReactNode(key: Key, value: React.ReactNode) {
  return (
    <SwiperSlide
      key={key}
    >
      <div className="swiper-slide-content">{value}</div>
    </SwiperSlide>
  );
}

function recursionCascadeHandleData(
  arr: PickerCascadeData[],
  deep = 0
): handledCascadeData[] {
  return arr.filter(item => isDef(item) && isDef(item.value)).map((item, i) => {
    const key = isDef(item.key) ? item.key : `${deep}-${i}`;
    const o = {
      ...item,
      key,
      $$react$$node: getItemReactNode(key, item.value),
    }
    if (isDef(o.children)) {
      o.children = recursionCascadeHandleData(o.children as PickerCascadeData[], deep + 1);
    }
    return o;
  });
}

function mapHandleData(arr: PickerImcascadeData[][]): handledImcascadeData[][] {
  return arr.filter(i => Array.isArray(i) && i.length).map((group, gI) => {
    return group.filter(i => isDef(i) && isDef(i.value)).map((item, i) => {
      const key = isDef(item.key) ? item.key : `${gI}-${i}`;
      return {
        ...item,
        key,
        $$react$$node: getItemReactNode(key, item.value),
      }
    })
  })
}

function recursionAppendDefaultV(
  arr: PickerCascadeData[] | undefined,
  value: Key[],
  deep: number,
  returned: Key[],
) {
  if (!Array.isArray(arr) || !arr.length) {
    return;
  }
  if (isDef(value[deep])) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (item.key === value[deep]) {
        recursionAppendDefaultV(item.children, value, deep + 1, returned);
        return;
      }
    }
    returned[deep] = arr[0].key;
    recursionAppendDefaultV(arr[0].children, value, deep + 1, returned);
    return;
  }
  returned.push(arr[0].key);
  recursionAppendDefaultV(arr[0].children, value, deep + 1, returned);
}

export default (props: PickerViewProps) => {
  const {
    data = [],
    defaultValue = [],
    defaultShowCount = 6,
    onChange,
    prefixCls = defaultPrefixCls,
    minCols,
    ...restProps
  } = props;
  if (!Array.isArray(data) || (data[0] && typeof data[0] !== 'object')) {
    throw Error('The parameter "data" gets the wrong data type.');
  }
  if (!Array.isArray(defaultValue)) {
    throw Error('The parameter "value" gets the wrong data type.');
  }
  let groups: React.ReactNode[] = [];

  // 是否级联
  let isCascade = !(!isDef(data[0]) || Array.isArray(data[0]));
  
  let handledData;
  
  // 预处理defaultValue
  let dv = [...defaultValue];
  if (isCascade) {
    const invalidIndex = dv.findIndex(i => !isDef(i));
    if (invalidIndex > -1) {
      dv = dv.slice(0, invalidIndex);
    }
    handledData = recursionCascadeHandleData(data as PickerCascadeData[], 0);
    if (dv.length === 0) {
      dv.push(handledData[0].key);
    }
    recursionAppendDefaultV(handledData, dv, 0, dv);
  } else {
    handledData = mapHandleData(data as PickerImcascadeData[][]);
    dv = dv.slice(0, handledData.length);
    handledData.forEach((group, gI) => {
      if (isDef(dv[gI])) {
        // 排查是否在选项序列中
        let isInOptions = false;
        for (let i = 0; i < group.length; i++) {
          const item = group[i];
          if (item.key === dv[gI]) {
            isInOptions = true;
            break;
          }
        }
        if (!isInOptions) {
          // 推入组别的第一个选项的key
          dv[gI] = group[0].key;
        }
      } else {
        // 推入组别的第一个选项的key
        dv[gI] = group[0].key;
      }
    });
  }

  const [valueState, setValueState] = useState(dv);

  const triggerOnChangeRef = useRef<
    (
      swiper: BaseSwiper,
      valueIndex: number,
      dataBase: Key[],
      cascadeData: PickerCascadeData[] | false,
    ) => void
  >();
  useEffect(() => {
    triggerOnChangeRef.current = (swiper, valueIndex, dataBase, cascadeData) => {
      let v = [...valueState];
      v[valueIndex] = dataBase[swiper.activeIndex];
      if (cascadeData) {
        v = v.slice(0, valueIndex + 1);
        recursionAppendDefaultV(cascadeData, v, 0, v);
      }
      setValueState(v);
      typeof onChange === 'function' && onChange(v);
    }
  }, [valueState, onChange]);

  if (!isCascade) {
    groups = (handledData as handledImcascadeData[][]).map((group, gI) => {
      const currentColValue = valueState[gI];
      let initialSlide = 0;
      const groupKeyValue: Key[] = [];
      const options = group.map((item, i) => {
        if (currentColValue === item.key) {
          initialSlide = i;
        }
        groupKeyValue.push(item.key);
        return item.$$react$$node;
      });
      return (
        <div className={`${prefixCls}-picker-view-col`} key={gI}>
          <Swiper
            className={`${prefixCls}-picker-view-col-content`}
            direction="vertical"
            centeredSlides
            initialSlide={initialSlide}
            slidesPerView={defaultShowCount}
            onSlideChange={(swiper) => {
              triggerOnChangeRef.current && triggerOnChangeRef.current(swiper, gI, groupKeyValue, false);
            }}
          >
            {options}
          </Swiper>
          <div className={`${prefixCls}-picker-view-col-indicator`} style={{height: `calc(100% / ${defaultShowCount})`}}></div>
          <div className={`${prefixCls}-picker-view-col-mask`}></div>
        </div>
      );
    });
  } else {
    const recursionData = handledData;
    function recursionPackSwiperDom(
      recursionArrData: handledCascadeData[],
      deep: number,
      value: Key[],
      returned: React.ReactNode[],
    ) {
      let selectedIndex = 0;
      const groupKeyValue: Key[] = [];
      const swiperSlides = recursionArrData.map((item, i) => {
        if (item.key === value[deep]) {
          selectedIndex = i;
        }
        groupKeyValue.push(item.key);
        return item.$$react$$node;
      });
      let colKey = deep + '';
      if (deep >= 0) {
        colKey = ''
        for (let i = 0; i < deep; i++) {
          colKey = colKey + value[i] + '-';
        }
        colKey += deep;
      }
      returned.push((
        <div className={`${prefixCls}-picker-view-col`} key={colKey}>
          <Swiper
            className={`${prefixCls}-picker-view-col-content`}
            direction="vertical"
            centeredSlides
            initialSlide={selectedIndex}
            slidesPerView={defaultShowCount}
            onSlideChange={(swiper) => {
              triggerOnChangeRef.current && triggerOnChangeRef.current(swiper, deep, groupKeyValue, recursionData as PickerCascadeData[]);
            }}
          >
            {swiperSlides}
          </Swiper>
          <div
            className={`${prefixCls}-picker-view-col-indicator`}
            style={{
              height: `calc(100% / ${defaultShowCount})`
            }}
          />
          <div
            className={`${prefixCls}-picker-view-col-mask`}
          />
        </div>
      ));
      if (
        recursionArrData[selectedIndex].children &&
        (recursionArrData[selectedIndex].children as handledImcascadeData[]).length
      ) {
        recursionPackSwiperDom(
          recursionArrData[selectedIndex].children as handledImcascadeData[],
          deep + 1,
          value,
          returned,
        );
      }
    }
    recursionPackSwiperDom(recursionData as handledCascadeData[], 0, valueState, groups);
    if (typeof minCols === 'number' && groups.length < minCols) {
      for (let i = groups.length; i < minCols; i++) {
        groups.push((
          <div className={`${prefixCls}-picker-view-col`} key={i}>
            <div
              className={`${prefixCls}-picker-view-col-indicator`}
              style={{
                height: `calc(100% / ${defaultShowCount})`
              }}
            />
            <div
              className={`${prefixCls}-picker-view-col-mask`}
            />
          </div>
        ))
      }
    }
  }
  return (
    <div
      {...restProps}
      className={`${prefixCls}-picker-view`}
    >
      {groups}
    </div>
  )
}