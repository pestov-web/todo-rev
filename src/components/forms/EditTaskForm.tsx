import { Formik, Field, Form } from 'formik';
import { Category } from '../../types/category.ts';
import * as Yup from 'yup';
import { Task } from '../../types/task.ts';

type EditTaskProps = {
  categories: Category[];
  modalData: Task;
  closeModal: () => void;
  onSubmit: (values: Task) => void;
};

function EditTaskForm(props: EditTaskProps) {
  const { categories, modalData, closeModal, onSubmit } = props;
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required(),
    categoryId: Yup.string().nullable(),
    description: Yup.string().max(1536),
  });

  return (
    <div>
      <h2 className="modal__title">Редактирование задачи</h2>
      <Formik
        initialValues={{
          id: modalData.id,
          name: modalData.name,
          categoryId: modalData.categoryId || null,
          description: modalData.description || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values: Task) => {
          onSubmit({ ...values, categoryId: values.categoryId || null });
        }}
      >
        {({ errors, values }) => (
          <Form className="form">
            <label htmlFor="name" className="form__label">
              <Field
                id="name"
                name="name"
                placeholder="Введите имя задачи"
                className="form__input"
                autoComplete="true"
              />
              <span className="form__label-title">
                Название{' '}
                <span className="form__label-error">
                  {errors.name ? '*' : ''}
                </span>
              </span>
            </label>

            <label
              htmlFor="categoryId"
              className="form__label form__label-category"
            >
              <Field
                as="select"
                id="categoryId"
                name="categoryId"
                className={
                  values.categoryId
                    ? 'form__input form__input-select form__input-select_selected'
                    : 'form__input form__input-select'
                }
                value={undefined}
              >
                <option
                  className="form__input-option "
                  value={''}
                  defaultValue={''}
                  disabled
                  selected
                >
                  Выберите категорию
                </option>
                <option className="form__input-option" value={''}>
                  Без категории
                </option>

                {categories?.map((category: Category) => (
                  <option
                    key={category.id}
                    value={category.id || ''}
                    className="form__input-option"
                  >
                    {category.name}
                  </option>
                ))}
              </Field>
              <span className="form__label-title">
                Категория
                <span className="form__label-error">
                  {errors.categoryId ? '*' : ''}
                </span>
              </span>
            </label>
            <label
              htmlFor="description"
              className="form__label form__label-description"
            >
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Введите описание задачи"
                type="textarea"
                className="form__input form__input-textarea"
              />
              <span className="form__label-title">
                Описание{' '}
                <span className="form__label-error">
                  {errors.description ? '*' : ''}
                </span>
              </span>
            </label>

            <div className="form__buttons-container">
              <button className="button form__submit-btn" type="submit">
                Сохранить
              </button>
              <button
                className="button form__close-btn"
                onClick={closeModal}
                type="button"
              >
                Закрыть
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { EditTaskForm };
