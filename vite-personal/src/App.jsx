import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage/Homepage';
import Blog from './components/Blog/Blog';
import About from './components/About/About';
import Newsletter from './components/Newsletter/Newsletter';
import SingleBlog from './components/Blog/SingleBlog';
// Define your page components mapping

function App() {
  return (
    <Router>
      <Header />
      <main className='px-5 border-x-1 border-Neutral200 dark:border-Neutral700'>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<SingleBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/newsletter" element={<Newsletter />} />
        </Routes>
        <hr />
      </main>
      <Footer />
    </Router>
  );
}

export default App
