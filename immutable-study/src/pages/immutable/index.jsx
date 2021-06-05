import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import ListDemo from '@/components/immutable/List.jsx';
import MapDemo from '@/components/immutable/Map';
import OrderedMapDemo from '@/components/immutable/OrderedMap';
import SetDemo from '@/components/immutable/Set';
import OrderedSetDemo from '@/components/immutable/OrderedSet';
import SeqDemo from '@/components/immutable/Seq';
import ConversionDemo from '@/components/immutable/Conversion';
import OtherDemo from '@/components/immutable/Other';

import './index.scss';

const ImmutableDemo = () => {
  const [pageFlag, setPageFlag] = useState('Other'); // List Map OrderedMap Set OrderedSet Seq Conversion Other
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
        <li className="tab-item" onClick={() => setPageFlag('OrderedMap')}>OrderedMap</li>
        <li className="tab-item" onClick={() => setPageFlag('Set')}>Set</li>
        <li className="tab-item" onClick={() => setPageFlag('OrderedSet')}>OrderedSet</li>
        <li className="tab-item" onClick={() => setPageFlag('Seq')}>Seq</li>
        <li className="tab-item" onClick={() => setPageFlag('Conversion')}>Conversion</li>
        <li className="tab-item" onClick={() => setPageFlag('Other')}>other</li>
      </ul>
      { pageFlag === 'List' && <ListDemo /> }
      { pageFlag === 'Map' && <MapDemo /> }
      { pageFlag === 'OrderedMap' && <OrderedMapDemo /> }
      { pageFlag === 'Set' && <SetDemo /> }
      { pageFlag === 'OrderedSet' && <OrderedSetDemo /> }
      { pageFlag === 'Seq' && <SeqDemo /> }
      { pageFlag === 'Conversion' && <ConversionDemo /> }
      { pageFlag === 'Other' && <OtherDemo /> }
      <hr />
      <button onClick={turnToReduxPage}>跳转redux</button>
    </div>
  );
};

export default memo(ImmutableDemo);
