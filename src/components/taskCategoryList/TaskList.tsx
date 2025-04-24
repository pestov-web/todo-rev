import { Task } from '../../types/task.ts';
import { Category } from '../../types/category.ts';
import { Icon } from '@iconify/react';
import { ListSkeleton } from './ListSkeleton.tsx';

import { useMemo } from 'react';

type TaskListProps = {
  data: Task[];
  categories: Category[];
  loading: boolean;
  openRemoveModal: (id: number) => void;
  openEditModal: (values: Task) => void;
};

function TaskList(props: TaskListProps) {
  const { data, categories, loading, openRemoveModal, openEditModal } = props;

  const tasksWithCategories = useMemo(() => {
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
      <ul className="task-list">
        {tasksWithCategories.map((item) => {
          return (
            <li key={item.id} className="task-list__item">
              <div className="task-list__item-info">
                <div className="task-list__item-header">
                  <h2 className="task-list__item-title">{item.name}</h2>
                  {item.category && (
                    <span className="task-list__item-category">
                      <Icon
                        icon="mdi:folder"
                        className="task-list__item-category-icon"
                      />
                      {item.category.name}
                    </span>
                  )}
                </div>
                <p className="task-list__item-description">
                  {item.description}
                </p>
              </div>
              <div className="task-list__item-actions">
                <button className="button task-list__item-button" type="button">
                  <Icon
                    icon="mdi:edit"
                    className="task-list__item-button-icon"
                    onClick={() => openEditModal(item)}
                  />
                </button>
                <button className="button task-list__item-button" type="button">
                  <Icon
                    icon="mdi:delete"
                    className="task-list__item-button-icon"
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

export { TaskList };
