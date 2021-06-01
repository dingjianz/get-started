import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import ListDemo from '@/components/immutable/List.jsx';
import MapDemo from '@/components/immutable/Map';

import './index.scss';

const ImmutableDemo = () => {
  const [pageFlag, setPageFlag] = useState('Map');
  const history = useHistory();

  // 跳转redux页面
  const turnToReduxPage = () => {
    history.push("/");
  };

  return (
    <div>
      <ul className="tab-wrap">
        <li className="tab-item" onClick={() => setPageFlag('List')}>List</li>
        <li className="tab-item" onClick={() => setPageFlag('Map')}>Map</li>
      </ul>
      { pageFlag === 'List' && <ListDemo /> }
      { pageFlag === 'Map' && <MapDemo /> }
      <hr />
      <button onClick={turnToReduxPage}>跳转redux</button>
    </div>
  );
};

export default memo(ImmutableDemo);
