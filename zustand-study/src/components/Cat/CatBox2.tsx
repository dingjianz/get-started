import useCatStore from 'stores/catStore';

import styles from './index.module.scss';

const CatBox2 = () => {
  // const {
  //   cats: { bigCats },
  // } = useCatStore(); // 修改smallcats也会重渲染
  const bigCats = useCatStore((state) => state.cats.bigCats);

  return (
    <div className={styles.box}>
      <h1>Cat Box2</h1>
      <p>bigCats: {bigCats}</p>
      <p>{Math.random()}</p>
    </div>
  );
};

export default CatBox2;
