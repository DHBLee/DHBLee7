import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
  fetch("http://test-react-integration-with-wordpress.local/wp-json/wp/v2/posts")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      try {
        setMenuItems(data);
      } catch (error) {
        error("bombardino crocodillo")
      }
    });
  }, []);

  if (!menuItems) return <p>Loading...</p>;

  return (
    <>
      {menuItems.map((menuItem) => (
        <div key={menuItem.title.rendered}>
          <h1>{menuItem.title.rendered}</h1>
          <div>{menuItem.acf.price}</div>
        </div>
      ))}
        
    </>
  )
}

export default App
