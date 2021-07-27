import React from 'react';

const Error = ({ statusCode }) => (
  <div className="error-page">
    <div className="un-support-tip">
      QAQ 我报错了
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </div>
  </div>
);

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default Error;
