import React from 'react';
import Link from 'next/link';

const GetServerSidePropsDemo = (props) => {
  const {
    result: { data },
  } = props;
  console.log('data', data);
  return (
    <div>
      {data.map((item) => {
        return (
          <Link href={`/songDetail/${item.songId}`} key={item.songStringId}>
            <a>{item.songName}</a>
          </Link>
        );
      })}
      <style jsx>
        {`
          a {
            display: block;
          }
        `}
      </style>
    </div>
  );
};

export const getServerSideProps = async () => {
  // const res = await fetch('http://localhost:10087/api/list');
  // const data = await res.json();
  return {
    // props: data,
    props: {
      result: {
        code: 0,
        flag: true,
        data: [
          { songStringId: '1', songId: 1, songName: '青花瓷' },
          { songStringId: '2', songId: 2, songName: '菊花台' },
        ],
      },
    },
  };
};

export default GetServerSidePropsDemo;
