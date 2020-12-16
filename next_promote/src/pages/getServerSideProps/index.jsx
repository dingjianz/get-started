import React from 'react';

const GetServerSidePropsDemo = () => {
  return <div>\asxcc</div>;
};

export const getServerSideProps = async () => {
  const r = await fetch('http://example.com/movies.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
    });
  console.log(r);
  return {
    props: { r },
  };
};

export default GetServerSidePropsDemo;
