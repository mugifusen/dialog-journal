import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Graph from './pages/Graph';
import Records from './pages/Records';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/journal' element={<Journal />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}

export default App