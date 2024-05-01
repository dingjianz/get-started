import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PageZustand from 'pages/zustand';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageZustand />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
