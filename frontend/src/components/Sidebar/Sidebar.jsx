import { memo, useState, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const navigationItems = {
  admin: [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: 'fas fa-chart-line'
    },
    {
      path: '/admin/products',
      name: 'Products',
      icon: 'fas fa-box'
    },
    {
      path: '/admin/orders',
      name: 'Orders',
      icon: 'fas fa-shopping-cart'
    },
    {
      path: '/admin/settings',
      name: 'Settings',
      icon: 'fas fa-cog'
    }
  ],
  quick: [
    {
      path: '/admin/messages',
      name: 'Messages',
      icon: 'fas fa-envelope',
      badge: '3'
    },
    {
      path: '/admin/notifications',
      name: 'Notifications',
      icon: 'fas fa-bell',
      badge: '5'
    }
  ]
};

const NavItem = memo(({ path, name, icon, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <li className="px-3 mb-1 text-gray-800">
      <NavLink
        to={path}
        className={`
          flex items-center px-4 py-3 rounded-lg transition-all duration-200
          hover:bg-gray-300 group
          ${isActive 
            ? 'bg-gray-800 text-white shadow-md'
            : 'text-gray-800'}
        `}
      >
        <i className={`${icon} text-lg ${isActive ? 'text-white' : 'text-gray-800 group-hover:text-gray-800'}`} />
        <span className="ml-3 font-medium">{name}</span>
        {badge && (
          <span className={`
            ml-auto px-2 py-1 text-xs rounded-full font-bold
            ${isActive ? 'bg-white text-gray-800' : 'bg-gray-300 text-white'}
          `}>
            {badge}
          </span>
        )}
      </NavLink>
    </li>
  );
});

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  badge: PropTypes.string
};

NavItem.displayName = 'NavItem';

const NavigationSection = memo(({ title, items }) => (
  <div className="mb-6 hidebar">
    <h6 className="px-6 text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">
      {title}
    </h6>
    <ul>
      {items.map(item => (
        <NavItem key={item.path} {...item} />
      ))}
    </ul>
  </div>
));

NavigationSection.displayName = 'NavigationSection';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      <nav className={`
        hidebar
        md:left-0 md:block md:fixed md:top-0 md:bottom-0
        md:overflow-y-auto md:flex-row md:flex-nowrap
        md:w-72 bg-white text-gray-800 shadow-lg
        flex flex-wrap items-center justify-between
        relative z-10 py-4 px-2
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Brand */}
          <div className="px-6 py-4 mb-6">
            <NavLink to="/" className="flex items-center">
              <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" className="h-8 w-auto" />
              <span className="ml-3 text-xl font-bold text-gray-800">Your Brand</span>
            </NavLink>
          </div>

      \
          <div className="hidebar md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none relative flex-1">
            <NavigationSection title="Admin Dashboard" items={navigationItems.admin} />
          </div>

     
          {/* <div className="px-6 mt-auto">
            <div className="bg-[#FFDBB5] rounded-xl p-4 mb-6">
              <h6 className="text-sm font-semibold text-gray-800 mb-2">Need Help?</h6>
              <p className="text-xs text-gray-800 mb-3">Contact our support team</p>
              <button className="w-full bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Contact Support
              </button>
            </div>
          </div> */}
        </div>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        type="button"
        className="md:hidden fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg z-50"
        onClick={toggleSidebar}
        aria-label="Toggle Navigation"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default memo(Sidebar);
