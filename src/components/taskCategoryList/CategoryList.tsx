import { Category } from '../../types/category.ts';
import { Icon } from '@iconify/react';
import { ListSkeleton } from './ListSkeleton.tsx';
import { useMemo } from 'react';

type CategoryListProps = {
  data: Category[];
  loading: boolean;
  openRemoveModal: (id: number) => void;
  openEditModal: (values: Category) => void;
};

function CategoryList(props: CategoryListProps) {
  const { data, loading, openRemoveModal, openEditModal } = props;

  const categoriesData = useMemo(() => {
    return data;
  }, [data]);

  if (loading) return <ListSkeleton />;

  return (
    <>
      <ul className="category-list">
        {categoriesData.map((item) => {
          return (
            <li key={item.id} className="category-list__item">
              <div className="category-list__item-info">
                <h2 className="category-list__item-title">{item.name}</h2>
                <p className="category-list__item-description">
                  {item.description}
                </p>
              </div>
              <div className="category-list__item-actions">
                <button
                  className="button category-list__item-button"
                  type="button"
                >
                  <Icon
                    icon="mdi:edit"
                    className="category-list__item-button-icon"
                    onClick={() => openEditModal(item)}
                  />
                </button>
                <button
                  className="button category-list__item-button"
                  type="button"
                >
                  <Icon
                    icon="mdi:delete"
                    className="category-list__item-button-icon"
                    onClick={() => openRemoveModal(item.id as number)}
                  />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export { CategoryList };
