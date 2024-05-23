import { memo, useState } from 'react';
import { cloneDeep } from 'lodash';
import 'wc-waterfall';
import clsx from 'clsx';

import styles from './index.module.scss';

const WaterFall = memo(() => {
  const [dataList, setDataList] = useState([
    { name: 'old', src: 'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF' },
    {
      name: 'old',
      src: 'https://img2.baidu.com/it/u=3894312272,1674584272&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=609',
    },
    { name: 'old', src: 'https://t7.baidu.com/it/u=3165657288,4248157545&fm=193&f=GIF' },
    { name: 'old', src: 'https://t7.baidu.com/it/u=3240224891,3518615655&fm=193&f=GIF' },
    { name: 'old', src: 'https://t7.baidu.com/it/u=2501476447,3743798074&fm=193&f=GIF' },
    { name: 'old', src: 'https://t7.baidu.com/it/u=2610975262,3538281461&fm=193&f=GIF' },
    { name: 'old', src: 'https://t7.baidu.com/it/u=3734967019,941734598&fm=193&f=GIF' },
    {
      name: 'old',
      src: 'https://img0.baidu.com/it/u=2175001524,1648483222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=800',
    },
    { name: 'old', src: 'https://t7.baidu.com/it/u=71977564,2288086088&fm=193&f=GIF' },
    { name: 'old', src: 'https://t7.baidu.com/it/u=2120291633,1902073212&fm=193&f=GIF' },
    { name: 'old', src: 'https://t7.baidu.com/it/u=1126218742,3382842115&fm=193&f=GIF' },
  ]);

  const handleAdd = (index: number) => {
    const _list = cloneDeep(dataList);
    _list.splice(index, 0, { name: 'new', src: 'https://img0.baidu.com/it/u=2990371717,3272492199&fm=253&fmt=auto&app=138&f=JPEG?w=577&h=1025' });
    // _list.push({
    //   name: 'new',
    //   src: 'https://img0.baidu.com/it/u=2990371717,3272492199&fm=253&fmt=auto&app=138&f=JPEG?w=577&h=1025',
    // });
    setDataList(_list);
  };

  return (
    <div className={styles.water_fall}>
      <wc-waterfall gap={10} cols={3}>
        {dataList.map((item, index) => (
          <div
            className={clsx(styles.water_item, {
              [styles.water_item_new]: item.name === 'new',
            })}
            onClick={handleAdd.bind(this, index)}
          >
            <img src={item.src} alt="" />
          </div>
        ))}
      </wc-waterfall>
    </div>
  );
});

export default WaterFall;
