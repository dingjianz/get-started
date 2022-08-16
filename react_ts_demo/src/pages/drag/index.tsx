/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  FC,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState,
  MouseEventHandler,
  MouseEvent,
} from 'react';
import styles from './index.module.scss';

const idioms = ['诗情画意', '南来北往', '一团和气', '落花流水'];

interface ICellPosition {
  cellX: number,
  cellY: number
}

const DragDemo: FC = (): ReactElement => {
  const [charCollection, setCharCollection] = useState<Array<string>>([]);
  const [charCollectionInfo, setCharCollectionInfo] = useState<Array<ICellPosition>>([]);
  const [cellActive, setCellActive] = useState<number>(-1); // 选中盒子索引
  const [startX, setStartX] = useState<number>(0); // 鼠标相对于屏幕坐标
  const [startY, setStartY] = useState<number>(0);
  const [cellX, setCellX] = useState<number>(0); // 盒子相对于屏幕坐标
  const [cellY, setCellY] = useState<number>(0);
  const [mouseX, setMouseX] = useState<number>(0); // 鼠标相对于盒子内部的坐标
  const [mouseY, setMouseY] = useState<number>(0);

  const handleMouseDown = (
    e: MouseEvent,
    index: number,
  ): void => {
    const $div = e.target as HTMLDivElement;
    setCellActive(index);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setCellX($div.offsetLeft);
    setCellY($div.offsetTop);
    setMouseX(e.clientX - $div.offsetLeft);
    setMouseY(e.clientY - $div.offsetTop);

    const W = $div.offsetWidth;
    const H = $div.offsetHeight;
    $div.style.position = 'fixed';
    $div.style.left = `${$div.offsetLeft / 16}rem`;
    $div.style.top = `${$div.offsetTop / 16}rem`;
    $div.style.width = `${W / 16}rem`;
    $div.style.height = `${H / 16}rem`;
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent,
  ): void => {
    if (cellActive > -1) {
      e.preventDefault();
      const moveX = e.clientX;
      const moveY = e.clientY;
      const pCellX = moveX - mouseX;
      const pCellY = moveY - mouseY;
      setCellX(pCellX);
      setCellY(pCellY);

      const $div = e.target as HTMLDivElement;
      $div.style.left = `${pCellX / 16}rem`;
      $div.style.top = `${pCellY / 16}rem`;
    }
  };

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent,
  ): void => {
    e.preventDefault();
    const $div = e.target as HTMLDivElement;
    $div.style.left = `${charCollectionInfo[cellActive].cellX / 16}rem`;
    $div.style.top = `${charCollectionInfo[cellActive].cellY / 16}rem`;
    setCellActive(-1);
  };

  // eslint-disable-next-line max-len
  const charRadomSort = (arr: string[]): string[] => arr.sort((): number => (Math.random() > 0.5 ? 1 : -1));

  const init = (): void => {
    let arr: string[] = [];
    idioms?.forEach((item: string) => {
      arr = arr.concat(item.split(''));
    });
    setCharCollection(charRadomSort(arr));
  };

  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (charCollection?.length) {
      const oChar = document.querySelectorAll('.char-cell');
      const arr = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < oChar.length; i++) {
        arr.push({
          cellX: (oChar[i] as HTMLDivElement).offsetLeft,
          cellY: (oChar[i] as HTMLDivElement).offsetTop,
        });
      }
      setCharCollectionInfo(arr);
    }
  }, [charCollection]);

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
        {charCollection.map((item, index) => (
          <div className={styles.cell_item} key={item}>
            <div
              className={`${styles.wrapper} char-cell`}
              onMouseDown={(e) => handleMouseDown(e, index)}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDemo;
