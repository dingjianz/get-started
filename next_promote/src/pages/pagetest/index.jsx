import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class PageTest extends React.Component {
  componentDidMount() {
    const curDate = new Date(); // 当前时间
    const curTamp = curDate.getTime(); // 当前时间的时间戳
    const curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1; // toLocaleDateString为了截去时分秒，留下年月日，默认0点0分0秒 curWeeHours为当天23:59:59秒对应的时间戳
    const passedTamp = curTamp - curWeeHours; // 当天已过去的时间戳数
    const leftTamp = 24 * 60 * 60 * 1000 - passedTamp; // 当天还未过去的时间戳数
    const leftTime = new Date();
    leftTime.setTime(leftTamp + curTamp); // 设置时间
    // console.log('curTamp', curTamp);
    // console.log('curDate.toLocaleDateString()', curDate.toLocaleDateString());
    // console.log('new Date(curDate.toLocaleDateString())', new Date(curDate.toLocaleDateString()));
    // console.log('curWeeHours', curWeeHours);
    // console.log(new Date(new Date().toLocaleDateString()).getTime());
    // console.log('passedTamp', passedTamp);
  }

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
