import React, {
  ComponentProps,
} from 'react';
import Icon from '@ant-design/icons';

const SVGIcon = () => (
  <svg viewBox="0 0 72 72" width="1em" height="1em"><g fill="none" fillRule="evenodd"><path d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36zm0-2c18.778 0 34-15.222 34-34S54.778 2 36 2 2 17.222 2 36s15.222 34 34 34z" fill="#FFF"></path><path stroke="#FFF" strokeWidth="2" d="M19 34.54l11.545 11.923L52.815 24"></path></g></svg>
);

export default (props: ComponentProps<typeof Icon>) => (
  <Icon
    component={SVGIcon}
    {...props}
  />
);