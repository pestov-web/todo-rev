interface Modal {
  isOpen: boolean;
  type: 'task' | 'category' | null;
}

interface DeleteModal extends Modal {
  elementId: number | null;
}

interface AddEditModal extends Modal {
  variant: 'add' | 'edit' | null;
  values: {
    id?: number | null;
    name: string;
    categoryId?: number | null;
    description: string;
  };
}

export type { DeleteModal, AddEditModal };
