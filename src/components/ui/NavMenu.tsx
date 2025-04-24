import { NavLink } from 'react-router';
import { navMenuItems } from '../../utils/data-placeholder';
function NavMenu() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navMenuItems.map((item) => (
          <li key={item.id} className="nav__list-item">
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? 'nav__list-item-link nav__list-item-link_active'
                  : 'nav__list-item-link'
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { NavMenu };
