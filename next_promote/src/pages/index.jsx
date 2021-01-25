/* eslint-disable no-unused-vars */
import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import moment from 'moment';

if (typeof window !== 'undefined') {
  import('./test').then((r) => {
    const SSO = r.default;
    console.log('SSO', SSO);
    console.log(SSO.config.url);
  });
}

export default function Home() {
  if (typeof document !== 'undefined') {
    // document.cookie = 'name=jianding;expires=Fri, 31 Dec 9999 23:59:59 GMT';
    // console.log(moment(new Date()).format('YYYY-MM-DD, HH:mm:ss'));
    // console.log(new Date().toGMTString());
    // document.cookie = 'name=jianding9;';
    // const date = new Date();
    // date.setDate(date.getDate() + 1);
    // document.cookie = `age=27;expires=${date.toGMTString()}`;
    // cookie.pureSet('top_banner_closed', true, leftTime.toGMTString() + ';path=/');
    // window.location.hash = 7897;
  }

  // console.log(moment('Fri, 31 Dec 9999 23:59:59 GMT').format('YYYY-MM-DD, HH:mm:ss'));

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <h2>{process.env.superName}</h2>
        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
