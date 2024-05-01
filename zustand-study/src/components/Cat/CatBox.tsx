import useCatStore from 'stores/catStore';

import styles from './index.module.scss';

const CatBox = () => {
  const { cats, increaseBigCats, increaseSmallCats, summary } = useCatStore();

  const number = summary();
  console.log(number);

  return (
    <div className={styles.box}>
      <h1>Cat Box</h1>
      <p>bigCats: {cats.bigCats}</p>
      <p>smallCats: {cats.smallCats}</p>
      <div>
        <button onClick={increaseBigCats}>add big cats</button>
        <button onClick={increaseSmallCats}>add small cats</button>
      </div>
      <p>{Math.random()}</p>
    </div>
  );
};

export default CatBox;
