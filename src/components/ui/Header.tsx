import { useLocation } from 'react-router';
import NavMenu from './NavMenu';
import { AddEditModal } from '../../types/modals';
import { useCallback } from 'react';

function Header({
  openAddEditModal,
}: {
  openAddEditModal: (
    type: AddEditModal['type'],
    variant: AddEditModal['variant']
  ) => void;
}) {
  const { pathname } = useLocation();

  const handleAddClick = useCallback(() => {
    openAddEditModal(pathname === '/' ? 'task' : 'category', 'add');
  }, [pathname, openAddEditModal]);
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">ToDo List</h1>
        <NavMenu />
        <button
          className="button header__button"
          onClick={handleAddClick}
          type="button"
        >
          {pathname === '/' ? 'Добавить задачу' : 'Добавить категорию'}
        </button>
      </div>
    </header>
  );
}

export default Header;
