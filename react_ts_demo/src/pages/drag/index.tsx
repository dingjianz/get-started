/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  ReactElement,
  useEffect,
  useState,
  TouchEventHandler,
} from 'react';
import styles from './index.module.scss';

const idioms = ['诗情画意', '南来北往', '一团和气', '落花流水'];

const DragDemo: FC = (): ReactElement => {
  const [charCollection, setCharCollection] = useState<Array<string>>([]);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e): void => {
    console.log(e);
  };

  // eslint-disable-next-line max-len
  const charRadomSort = (arr: string[]): string[] => arr.sort((): number => (Math.random() > 0.5 ? 1 : -1));

  const init = (): void => {
    let arr: string[] = [];
    idioms.forEach((item: string) => {
      arr = arr.concat(item.split(''));
    });
    console.log(charRadomSort(arr));
    setCharCollection(charRadomSort(arr));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.blank_cell_group}>
        <div className={styles.cell_item}>
          <div className={styles.wrapper} />
        </div>
        <div className={styles.cell_item}>
          <div className={styles.wrapper} />
        </div>
        <div className={styles.cell_item}>
          <div className={styles.wrapper} />
        </div>
        <div className={styles.cell_item}>
          <div className={styles.wrapper} />
        </div>
      </div>

      <div className={styles.char_cell_group}>
        {charCollection.map((item) => (
          <div className={styles.cell_item} key={item}>
            <div className={styles.wrapper} onTouchStart={handleTouchStart}>
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDemo;
