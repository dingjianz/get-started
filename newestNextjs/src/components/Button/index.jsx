import React, { forwardRef } from 'react';
import styles from './index.module.scss';

const Button = forwardRef((props, ref) => (
  <div className={[styles.btn, props?.className].join(' ')} ref={ref} onClick={props?.onClick}>
    {props?.children}
  </div>
));

Button.displayName = 'Button';

export default Button;
