import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, userData, setUserData } = useContext(ShopContext);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isOther = !isHome;

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    setToken('')
    setUserData({ name: '', email: '' })
    setCartItems({})
  }

  const tagColor = 'text-gray-300';
  const tagHover = 'text-black';

  const bgClass = isHome ? 'bg-transparent' : 'bg-white shadow-sm';

  return (
    <div className={`z-50 flex items-center justify-between pb-5 pt-[10px] font-medium ${isHome ? 'fixed top-0 left-0 w-full px-[8px] z-50' : 'relative -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-[8px]'} ${bgClass} transition-colors duration-300`}
    >
      <div className='flex items-center relative'>
        <img onClick={() => setVisible(!visible)} src={assets.menu_icon} className='w-6 cursor-pointer invert hover:opacity-80 transition-opacity relative z-[101]' alt="Menu" />

        
        <div className={`absolute left-10 top-1/2 -translate-y-1/2 flex items-center justify-between w-[240px] sm:w-[320px] md:w-[400px] text-[10px] sm:text-xs md:text-sm font-serif tracking-widest text-gray-200 mix-blend-difference px-2 transition-all duration-500 z-[100] ${visible ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
          <NavLink onClick={() => setVisible(false)} className='hover:text-[#c8a06e] transition-colors' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='hover:text-[#c8a06e] transition-colors' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='hover:text-[#c8a06e] transition-colors' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='hover:text-[#c8a06e] transition-colors' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
      <div className='flex items-center gap-6 ml-auto'>
        <img onClick={() => { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer invert' alt="" />
        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer invert' src={assets.profile_icon} alt="" />
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className='flex flex-col gap-2 w-48 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                <div className='border-b border-gray-300 pb-2 mb-1'>
                  <p className='font-bold text-black'>{userData?.name}</p>
                  <p className='text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap'>{userData?.email}</p>
                </div>
                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          )}
        </div>
        <Link to='/cart' className='relative group/cart'>
          <img src={assets.cart_icon} className='w-5 min-w-5 invert' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-white text-black aspect-square rounded-full text-[8px] font-bold'>{getCartCount()}</p>
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
