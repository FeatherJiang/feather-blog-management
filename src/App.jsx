import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from './router';

const handlePageChange = () => {
  window.scrollTo(0, 0);
};

function App() {
  return (
    <BrowserRouter onUpdate={handlePageChange} basename="/admin">
      <Route />
    </BrowserRouter>
  );
}

export default App;
