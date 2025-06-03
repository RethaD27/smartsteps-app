import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional: for icons

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinkStyle =
    'text-white hover:text-yellow-300 transition px-3 py-2 rounded-md';
  const activeStyle = 'bg-blue-800';

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <Link to="/">SmartSteps</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/dashboard" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ''}`}>Dashboard</NavLink>
          <NavLink to="/lesson/8/Algebra" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ''}`}>Lessons</NavLink>
          <NavLink to="/progress" className={({ isActive }) => `${navLinkStyle} ${isActive ? activeStyle : ''}`}>Progress</NavLink>

          {user && (
            <div className="text-sm text-white">
              {user.displayName || user.email}
            </div>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2">
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className={({ isActive }) => `${navLinkStyle} block ${isActive ? activeStyle : ''}`}>Dashboard</NavLink>
          <NavLink to="/lesson/8/Algebra" onClick={() => setMenuOpen(false)} className={({ isActive }) => `${navLinkStyle} block ${isActive ? activeStyle : ''}`}>Lessons</NavLink>
          <NavLink to="/progress" onClick={() => setMenuOpen(false)} className={({ isActive }) => `${navLinkStyle} block ${isActive ? activeStyle : ''}`}>Progress</NavLink>
          
          {user && (
            <div className="text-sm text-white px-3">{user.displayName || user.email}</div>
          )}

          {user && (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 mx-3 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}