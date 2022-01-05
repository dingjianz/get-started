import { useEffect } from 'react';
import Title from 'components/Tile';
import Lee from 'components/Lee';
import Event from 'components/Event';
import ThemeContext from 'api/theme';

import { getUserInfo } from 'api/userApi';

import avatar from 'assets/images/avtar.jpg';

import './index.scss';

function App() {
  // const [count, setCount] = useState<number | null>(1);
  // const obj: Jianding.CommonObj = {
  //   name: 'jianding9',
  //   age: 18,
  //   sayHello() {
  //     console.log('hello');
  //   },
  // };

  type Pair<T> = [T, T];

  const num: Pair<string> = ['1', '1'];
  console.log(num);

  const m1 = new Map<string, string>();
  m1.set('key1', 'value1');
  m1.set('key2', 'value2');
  console.log(m1.get('key2'));

  useEffect(() => {
    getUserInfo('jianding9', 127);
    try {
      throw new Error('报错了');
    } catch (e) {
      console.log('e:::', e);
    } finally {
      console.log('finally--------');
    }
  }, []);

  return (
    <div className="rc-page">
      <Title title="我是头部" />
      <Lee
        name="Lee_name"
        user={{
          name: 'jianding9',
          sex: 'male',
          say() {
            console.log('say方法');
          },
        }}
      />
      <Event title="event title" />
      <img src={avatar} alt="" />
      <ThemeContext.Consumer>
        {(value) => {
          console.log('context--consumer:::', value);
          return <div>{value.background}</div>;
        }}
      </ThemeContext.Consumer>
    </div>
  );
}

export default App;
