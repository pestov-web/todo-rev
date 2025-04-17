import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Category } from '../../types/category';

type CategoryFormProps = {
  modalData: Category;
  closeModal: () => void;
  onSubmit: (values: Category) => void;
};

function EditCategoryForm(props: CategoryFormProps) {
  const { modalData, closeModal, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required(),
    description: Yup.string().max(512),
  });

  return (
    <div>
      <h2 className="modal__title">Редактирование категории</h2>
      <Formik
        initialValues={{
          id: modalData.id || null,
          name: modalData.name || '',
          description: modalData.description || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values: Category) => {
          onSubmit(values);
        }}
      >
        {({ errors }) => (
          <Form className="form">
            <label htmlFor="name" className="form__label form__label_category">
              <Field
                id="name"
                name="name"
                placeholder="Введите имя категории"
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
              htmlFor="description"
              className="form__label form__label-description"
            >
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Введите описание категории"
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

export { EditCategoryForm };
