import { memo } from 'react';
import { fromJS, is } from 'immutable';

const WithImmutable = (WrappedComponent) =>
  memo(WrappedComponent, (prevProps, nextProps) => {
    const prevPropsIm = fromJS(prevProps);
    const nextPropsIm = fromJS(nextProps);
    return is(prevPropsIm, nextPropsIm);
  });

  export default WithImmutable;
