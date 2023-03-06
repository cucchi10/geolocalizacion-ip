import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ViteReact from '../pages/ViteReact';

function main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<ViteReact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default main;
