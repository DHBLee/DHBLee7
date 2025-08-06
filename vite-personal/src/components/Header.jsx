import React, { useState, useEffect } from 'react'
import moon from '../assets/images/icon-moon.svg'
import sun from '../assets/images/icon-sun.svg'
import menu from '../assets/images/icon-menu.svg'
import close from '../assets/images/icon-menu-close.svg'
import avatar from '../assets/images/image-avatar.jpg'
import { Link, useLocation } from 'react-router-dom';
// Define navigation items
const navigationItems = [
    { name: 'Home', path:'/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Newsletter', path: '/newsletter' }
];

const Header = ({ activePage, setActivePage }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const themeIcon = isDarkMode ? sun : moon;
    const menuIcon = isMobileMenuOpen ? close : menu;

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <>
            <header className='sticky bg-Neutral0 dark:bg-Neutral800 border-1 border-Neutral200 dark:border-Neutral700 flex items-center justify-between rounded-2xl p-3 transition-colors duration-300 ease-in-out'>
                <img src={avatar} alt="Avatar Image" className='rounded-xl w-10' />
        
                <nav className='hidden md:block'>
                    <ul className='flex items-center gap-4'>
                        {navigationItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path}
                                      className={`px-3 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
                                        location.pathname === item.path 
                                            ? 'bg-Neutral200 dark:bg-Neutral700' 
                                            : 'text-Neutral600 dark:text-Neutral400'
                                    }`}    
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button onClick={() => setIsDarkMode(!isDarkMode)} className='p-3 border-1 border-Neutral200 dark:border-Neutral700 rounded-xl transition-colors duration-300 ease-in-out'>
                                <img src={themeIcon} alt="theme" />
                            </button>
                        </li>
                    </ul>
                </nav>
                <nav className='md:hidden flex items-center gap-3 transition-colors duration-300 ease-in-out'>
                    <button className={`${menuIcon === close ? 'bg-Neutral900 dark:bg-Neutral100' : ''} p-3 rounded-xl transition-colors duration-300 ease-in-out`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <img src={menuIcon} alt="menu" className='dark:invert'/>
                    </button>
                    <button className="p-3 border-1 border-Neutral200 dark:border-Neutral700 rounded-xl transition-colors duration-300 ease-in-out" onClick={() => setIsDarkMode(!isDarkMode)}>
                        <img src={themeIcon} alt="theme" />
                    </button>
                </nav>
            </header>

            {isMobileMenuOpen && (
                <div className='h-auto mt-4 w-full bg-Neutral0 dark:bg-Neutral800 transition-colors duration-300 ease-in-out'>
                    <ul className='rounded-xl border-1 border-Neutral200 dark:border-Neutral700 shadow-b-Neutral900 flex flex-col items-start w-full gap-2 p-3 transition-colors duration-300 ease-in-out'>
                        {navigationItems.map((item, index) => (
                            <li key={index} className='w-full not:last-child:border-b-1 border-Neutral200 dark:border-Neutral700'>
                                <Link 
                                    to={item.path}
                                    className={`px-3 py-2 rounded-lg transition-colors duration-300 ease-in-out ${
                                        location.pathname === item.path 
                                            ? 'bg-Neutral200 dark:bg-Neutral700' 
                                            : 'text-Neutral600 dark:text-Neutral400'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default Header