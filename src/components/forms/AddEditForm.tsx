import { Formik, Field, Form } from 'formik';
import { Category } from '../../types/api';
import * as Yup from 'yup';
import { AddEditModal } from '../../types/modals';

function AddEditForm({
  categories,
  modalData,
  closeModal,
  onSubmit,
}: {
  categories: Category[];
  modalData: AddEditModal;
  closeModal: () => void;
  onSubmit: (values: AddEditModal['values']) => void;
}) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required(),
    categoryId: Yup.string().nullable(),
    description: Yup.string().max(modalData.type == 'task' ? 1536 : 512),
  });
  const handleSubmit = (values: AddEditModal['values']) => {
    onSubmit(values);
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div>
      <h2 className="modal__title">
        {`${modalData.variant === 'edit' ? 'Редактирование' : 'Добавление'} ${
          modalData.type === 'task' ? 'задачи' : 'категории'
        }`}
      </h2>
      <Formik
        initialValues={{
          id: modalData.values.id || null,
          name: modalData.values.name || '',
          categoryId: modalData.values.categoryId || null,
          description: modalData.values.description || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values: AddEditModal['values']) => {
          handleSubmit({
            id: (values.id as number) || null,
            name: values.name || '',
            categoryId: values.categoryId || null,
            description: values.description || '',
          });
        }}
      >
        {({ errors, values }) => (
          <Form className="form">
            <label
              htmlFor="name"
              className={
                modalData.type === 'task'
                  ? 'form__label'
                  : 'form__label form__label_category'
              }
            >
              <Field
                id="name"
                name="name"
                placeholder={
                  modalData.type === 'task'
                    ? 'Введите имя задачи'
                    : 'Введите имя категории'
                }
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
            {modalData.type === 'task' && (
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
                    value=""
                    disabled
                    selected
                  >
                    Выберите категорию
                  </option>
                  <option className="form__input-option" value={''}>
                    Без категории
                  </option>

                  {categories.map((category: Category) => (
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
            )}
            <label
              htmlFor="description"
              className="form__label form__label-description"
            >
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder={
                  modalData.type === 'task'
                    ? 'Введите описание задачи'
                    : 'Введите описание категории'
                }
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
                {modalData.variant === 'edit' ? 'Сохранить' : 'Создать'}
              </button>
              <button
                className="button form__close-btn"
                onClick={handleClose}
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

export default AddEditForm;
