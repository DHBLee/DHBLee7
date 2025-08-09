import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
const Homepage = lazy(() => import('./components/Homepage/Homepage'));
const Blog = lazy(() => import('./components/Blog/Blog'));
const About = lazy(() => import('./components/About/About'));
const Newsletter = lazy(() => import('./components/Newsletter/Newsletter'));
const SingleBlog = lazy(() => import('./components/Blog/SingleBlog'));
// Define your page components mapping

function App() {
  return (
    <Router>
      <div className="min-h-screen px-5 flex flex-col">
        <Header />
        <main className='flex-1 px-5 border-x-1 border-Neutral200 dark:border-Neutral700'>
          <div className="max-w-7xl mx-auto w-full">
            <Suspense fallback={<div className='text-center py-10'>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<SingleBlog />} />
                <Route path="/about" element={<About />} />
                <Route path="/newsletter" element={<Newsletter />} />
              </Routes>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
