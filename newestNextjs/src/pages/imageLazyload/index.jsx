import React from 'react';
import Image from 'next/image';

import pic from '../../assets/images/pic.png';
import styles from './index.module.scss';

// const myLoader = ({ src, width, quality }) => {
//   return `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com${src}?w=${width}&q=${quality || 75}`;
// };

/* 
要为外部网站上托管的图片启用图片优化功能，请先将图片的 src 地址设置完整的网址（即，带域名的地址），
然后指定哪些 域名 需要开启优化功能。这是为了确保不会误伤其它外部网址。
当 loader 被设置为外部图片服务时，此选项将被忽略。自定义loader以后不需要设置domains
*/

const ImageLazyload = () => (
  <div className={styles.img_wrap}>
    <img
      src={pic}
      style={{
        width: '100px',
        height: '100px',
      }}
      alt=""
    />
    <Image src="/pic.png" width="180" height="180" quality="100" />
    <br />
    <Image
      // loader={myLoader}
      src="https://img2.baidu.com/it/u=1704219071,3761829583&fm=26&fmt=auto&gp=0.jpg"
      width="400"
      height="400"
      quality="100"
    />
    <br />
    <Image
      // loader={myLoader}
      src="https://img2.baidu.com/it/u=1704219071,3761829583&fm=26&fmt=auto&gp=0.jpg"
      width="400"
      height="400"
      quality="1"
    />
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <Image
      // loader={myLoader}
      // src="/u=2592042537,1864064944&fm=26&fmt=auto&gp=0.jpg"
      src="https://img2.baidu.com/it/u=2592042537,1864064944&fm=26&fmt=auto&gp=0.jpg"
      width="80"
      height="80"
    />
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <Image
      // loader={myLoader}
      // src="/u=1541636380,2661844494&fm=26&fmt=auto&gp=0.jpg"
      src="https://img2.baidu.com/it/u=1541636380,2661844494&fm=26&fmt=auto&gp=0.jpg"
      width="80"
      height="80"
    />
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <p>我是一段文字</p>
    <Image
      // loader={myLoader}
      // src="/u=2645058785,2214371962&fm=26&fmt=auto&gp=0.jpg"
      src="https://img2.baidu.com/it/u=2645058785,2214371962&fm=26&fmt=auto&gp=0.jpg"
      width="80"
      height="80"
    />
  </div>
);

export default ImageLazyload;
