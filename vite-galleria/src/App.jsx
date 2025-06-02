
import Header from './Components/Header'
import Gallery from './Components/Gallery'
import { ArtworkProvider } from './Components/context/ArtworkContext'
import Artwork from './Components/Artwork'


function App() {

  return (
    <ArtworkProvider>
      <Header />
      <Gallery />
      <Artwork />
    </ArtworkProvider>
  )
}

export default App
