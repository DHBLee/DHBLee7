import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import arrowUp from './assets/arrow-up-s-line.png';
import arrowDown from './assets/arrow-down-s-line.png';


const paddingStyle = 'px-[clamp(1rem,-1.684859154929577rem+11.455399061032862vw,8.625rem)]';

function App() {
  const [showButton, setShowButton] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      setShowButton(false);

      scrollTimeout.current = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomThreshold = 50;
        
        setAtBottom(scrollPosition >= pageHeight - bottomThreshold);
        setShowButton(window.scrollY > 100); 
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Header padding={paddingStyle}/>
      <main>
          <Section1 padding={paddingStyle}/>

          <Section2 padding={paddingStyle}/>

          <Section3 padding={paddingStyle}/>

          <Section4 padding={paddingStyle}/>

          <Section5 padding={paddingStyle}/>

      </main>

      <div className={`fixed bottom-[4rem] right-[7rem] transition-opacity duration-200 ${
        showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <button 
          onClick={atBottom ? scrollToTop : scrollToBottom}
          className="bg-white rounded-full hover:opacity-75 p-3 shadow-md transition-all duration-200"
          aria-label={atBottom ? "Scroll to top" : "Scroll to bottom"}
        >
          <img 
            src={atBottom ? arrowUp : arrowDown} 
            alt={atBottom ? "Up arrow" : "Down arrow"} 
            className="w-[2rem] transition-transform duration-200 hover:scale-110"
          />
        </button>
      </div>
    </>
  );
}

export default App;