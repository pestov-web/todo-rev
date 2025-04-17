import { useLocation } from 'react-router';
import { NavMenu } from './NavMenu';

type HeaderProps = {
  openAddTaskModal: () => void;
  openAddCategoryModal: () => void;
};

function Header(props: HeaderProps) {
  const { openAddTaskModal, openAddCategoryModal } = props;
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">ToDo List</h1>
        <NavMenu />
        {pathname === '/categories' ? (
          <button
            className="button header__button"
            onClick={openAddCategoryModal}
            type="button"
          >
            Добавить категорию
          </button>
        ) : (
          <button
            className="button header__button"
            onClick={openAddTaskModal}
            type="button"
          >
            Добавить задачу
          </button>
        )}
      </div>
    </header>
  );
}

export { Header };
