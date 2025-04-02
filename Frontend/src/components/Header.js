import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaRegUserCircle, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import ROLE from '../common/role';
import { ReactComponent as Logo } from '../assets/logo.svg';
import Context from '../context';
import CartDropdown from './CartDropDown';


const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log('user header', user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const menuRef = useRef(null);
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });

    if (fetchData.ok) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuDisplay(false);
      }
    };

    if (menuDisplay) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDisplay]);

    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const [isCartOpen, setIsCartOpen] = useState(false); 

    const toggleCart = () => {
      setIsCartOpen(!isCartOpen);
    }

    const handleSearch = (e) => {
        const { value } = e.target;

        if (value) {
            navigate(`/search?q=${encodeURIComponent(value)}`); // Redirige con el término de búsqueda
        } else {
            navigate('/'); // Redirige a la página principal si el input está vacío
        }
    };

  return (
    <header className="h-16 bg-[#F6F6F6] sticky top-0 z-50">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="flex-shrink-0">
          <Link to={'/'}>
            <Logo className="w-32 md:w-40 lg:w-48" />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-7">
          <div className="hidden sm:flex items-center p-2 h-10 rounded bg-slate-50 outline-1 outline outline-zinc-300">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              className="w-full border-none bg-transparent px-2 md:px-4 py-1 text-gray-900 outline-none focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
            <span className="text-gray-500">
              <FaSearch />
            </span>
          </div>

          <div
            className="sm:hidden text-gray-700 cursor-pointer"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <FaSearch className="text-2xl" />
          </div>

          {user?._id && (
            <div>
              <button onClick={toggleCart} className="text-2xl relative">
                  <span className="text-gray-700">
                      <FaShoppingCart />
                  </span>
                  <div className="bg-blue-600 w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                      <p className="text-sm text-white font-semibold">{context?.accountCartProduct}</p>
                  </div>
              </button>

              {isCartOpen && <CartDropdown />}
            </div>
          )}

          {user?._id && (
            <div className="relative group flex justify-center" ref={menuRef}>
              <div
                className="text-3xl relative flex justify-center text-gray-700 cursor-pointer"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                <FaRegUserCircle />
              </div>
              {menuDisplay && (
                <div className="absolute bg-white bottom-0 top-11 h-fit p-3 shadow-lg rounded">
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={'admin-panel'}
                        className="block whitespace-nowrap hover:bg-slate-200 p-2"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuDisplay(false);
                      }}
                      className="block whitespace-nowrap hover:bg-slate-200 p-2"
                    >
                      Cerrar sesión
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}

          <div>
            {user?._id ? (
              <button className="hidden">Cerrar sesión</button>
            ) : (
              <Link
                to={'/login'}
                className="px-2 py-1 md:px-3 md:py-2 rounded-md text-[#262626] text-sm md:text-lg font-semibold hover:outline hover:outline-2 hover:outline-gray-100 font-roboto"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>

      {isSearchVisible && (
        <div className="sm:hidden p-2 bg-slate-50">
          <div className="flex items-center p-2 h-10 rounded bg-slate-50 outline-1 outline outline-zinc-300">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              className="w-full border-none bg-transparent px-2 py-1 text-gray-900 outline-none focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
            <span className="text-gray-500">
              <FaSearch />
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
