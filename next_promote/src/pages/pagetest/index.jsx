import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class PageTest extends React.Component {
  fn = () => {
    console.log(window.opener);
    window.self.close();
    window.opener.location.reload();
  };

  render() {
    return (
      <div>
        <h1>pagetest</h1>
        <button onClick={this.fn} type="button">
          点击
        </button>
      </div>
    );
  }
}

export default PageTest;
