import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Menu, Home, PlusCircle, BookmarkCheck, LogIn, LogOut, UtensilsCrossed, X } from 'lucide-react';

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.removeItem('userID');
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-[#150207]/95 backdrop-blur-xl shadow-2xl border-b border-[#FF6B00]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-[#FF6B00] to-[#FFD166] text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-200 shadow-[0_0_15px_rgba(255,107,0,0.3)]">
                <UtensilsCrossed size={24} />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFD166]">AapliRecipe</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={<Home size={18} />} text="Discover" active={isActive('/')} />
            <NavLink to="/create-recipe" icon={<PlusCircle size={18} />} text="Create" active={isActive('/create-recipe')} />
            <NavLink to="/saved-recipes" icon={<BookmarkCheck size={18} />} text="Saved" active={isActive('/saved-recipes')} />
            
            <div className="w-px h-6 bg-white/10 mx-4"></div>
            
            {!cookies.access_token ? (
              <Link
                to="/auth"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors shadow-md border border-white/5"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            ) : (
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-saffron-500 hover:bg-white/5 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute w-full bg-[#150207] border-b border-[#FF6B00]/20 shadow-2xl transition-all duration-300 origin-top ${
        isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          <MobileNavLink to="/" text="Discover" active={isActive('/')} onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/create-recipe" text="Create Recipe" active={isActive('/create-recipe')} onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/saved-recipes" text="Saved Recipes" active={isActive('/saved-recipes')} onClick={() => setIsMenuOpen(false)} />
          <div className="border-t border-white/10 pt-2 mt-2"></div>
          {!cookies.access_token ? (
            <MobileNavLink to="/auth" text="Sign In" active={isActive('/auth')} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <button
              onClick={() => { logout(); setIsMenuOpen(false); }}
              className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text, active }: { to: string; icon: React.ReactNode; text: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileNavLink = ({ to, text, active, onClick }: { to: string; text: string; active: boolean; onClick: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
      active
        ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30'
        : 'text-gray-400 hover:bg-white/5'
    }`}
  >
    <span>{text}</span>
  </Link>
);