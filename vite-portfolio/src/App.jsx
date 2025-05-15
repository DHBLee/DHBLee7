
import Header from './components/Header';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';

const paddingStyle = 'px-[clamp(1rem,-1.684859154929577rem+11.455399061032862vw,8.625rem)]';

function App() {

  return (
    <>
      <Header padding={paddingStyle}/>
      <main>
        <Section1 padding={paddingStyle}/>
        <Section2 padding={paddingStyle}/>
        <Section3 padding={paddingStyle}/>
        <Section4 padding={paddingStyle}/>
      </main>
    </>
  )
}

export default App
