interface Category {
  id: number;
  name: string;
  description: string;
}

interface Task extends Category {
  categoryId: number | null;
}

export type { Category, Task };
