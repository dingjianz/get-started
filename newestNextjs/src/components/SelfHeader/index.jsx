import React from 'react';
import Head from 'next/head';

const SelfHeader = ({ title = '海草学员内部课件' }) => (
  <Head>
    <title>{title}</title>
  </Head>
);

export default SelfHeader;
