import { Anchor, Link } from 'components/anchor';
import './index.scss';

const AnchorDemo = () => (
  <div>
    <Anchor>
      <Link href="#a" title="跳转到a" />
      <Link href="#b" title="跳转到b" />
      <Link href="#c" title="跳转到c">
        <Link href="#c_1" title="跳转到c_1">
          <Link href="#c_1_1" title="跳转到c_1_1">
            <Link href="#g" title="跳转到g" />
          </Link>
        </Link>
        <Link href="#c_2" title="跳转到c_2" />
      </Link>
    </Anchor>
    <h2 id="a">a</h2>
    <h2 id="b">b</h2>
    <h2 id="c">c</h2>
    <h2 id="c_1">c_1</h2>
    <h2 id="c_1_1">c_1_1</h2>
    <h2 id="c_2">c_2</h2>
    <h2 id="d">d</h2>
    <h2 id="e">e</h2>
    <h2 id="f">f</h2>
    <h2 id="g">g</h2>
  </div>
);

export default AnchorDemo;
