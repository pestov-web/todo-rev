import { Task, Category } from '../../types/api';
import { Icon } from '@iconify/react';
import ListSkeleton from './ListSkeleton';
import { AddEditModal, DeleteModal } from '../../types/modals';
import { useMemo } from 'react';

function List({
  data,
  categories,
  loading,
  onDeleteClick,
  openAddEditModal,
}: {
  data: Task[] | Category[];
  categories?: Category[];
  loading: boolean;
  onDeleteClick: (type: DeleteModal['type'], id: number) => void;
  openAddEditModal: (
    type: AddEditModal['type'],
    variant: AddEditModal['variant'],
    values?: AddEditModal['values']
  ) => void;
}) {
  // если есть категории, то это задачи, иначе категории
  const handleDelete = (id: number): void => {
    const type = categories ? 'task' : 'category';
    onDeleteClick(type, id);
  };

  const handleEdit = (values: AddEditModal['values']): void => {
    // если есть категории, то это задачи, иначе категории
    const type = categories ? 'task' : 'category';
    openAddEditModal(type, 'edit', values);
  };

  const categoriesData = useMemo(() => {
    return data.map((item) => {
      const category = categories?.find(
        (cat) => cat.id === (item as Task).categoryId
      );
      return { ...item, category };
    });
  }, [data, categories]);

  if (loading) return <ListSkeleton />;

  return (
    <>
      <ul className="list">
        {categoriesData.map((item) => {
          return (
            <li key={item.id} className="list__item">
              <div className="list-item">
                <div className="list-item__info">
                  <div className="list-item__header">
                    <h2 className="list-item__title">{item.name}</h2>
                    {item.category && (
                      <span className="list-item__category">
                        <Icon
                          icon="mdi:folder"
                          className="list-item__category-icon"
                        />
                        {item.category.name}
                      </span>
                    )}
                  </div>
                  <p className="list-item__description">{item.description}</p>
                </div>
                <div className="list-item__actions">
                  <button className="button list-item__button" type="button">
                    <Icon
                      icon="mdi:edit"
                      className="list-item__button-icon"
                      onClick={() => handleEdit(item as AddEditModal['values'])}
                    />
                  </button>
                  <button className="button list-item__button" type="button">
                    <Icon
                      icon="mdi:delete"
                      className="list-item__button-icon"
                      onClick={() => handleDelete(item.id)}
                    />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default List;
