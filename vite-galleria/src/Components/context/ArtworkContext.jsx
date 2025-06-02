import { createContext, useState, useContext, } from 'react';

const ArtworkContext = createContext({
    isSlideshowOpen: false,
    setIsSlideshowOpen: () => {},
    currentIndex: 0,
    setCurrentIndex: () => {},
})

export const ArtworkProvider = ({ children }) => {
    const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <ArtworkContext.Provider
            value={{
                isSlideshowOpen,
                setIsSlideshowOpen,
                currentIndex,
                setCurrentIndex
            }}
        >
            {children}
        </ArtworkContext.Provider>
    )
}

export const useArtwork = () => {
    return useContext(ArtworkContext)
}