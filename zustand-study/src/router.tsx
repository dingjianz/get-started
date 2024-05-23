import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageZustand from 'pages/zustand';
import Waterfall from 'pages/waterfall';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageZustand />} />
        <Route path="/waterfall" element={<Waterfall />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
