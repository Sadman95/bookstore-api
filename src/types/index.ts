export interface Book {
  id?: number;
  title: string;
  description?: string;
  published_date: string; // ISO date string
  author_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  birthdate: string; // ISO date string
  created_at?: Date;
  updated_at?: Date;
}

export type CreateAuthorPayload = Pick<Author, 'name' | 'bio' | 'birthdate'>;

export type UpdateAuthorPayload = Partial<CreateAuthorPayload> & { id: number };

export type CreateBookPayload = Pick<
  Book,
  'title' | 'description' | 'published_date' | 'author_id'
>;

export type UpdateBookPayload = Partial<CreateBookPayload> & { id: number };

export type PaginationType = { page: number; limit: number; sortBy: string; sortOrder: string };

export type QueryOptions = {
  filterableOptions: Record<string, unknown>;
  paginationOptions: Partial<PaginationType>;
  searchableFields: string[];
  url: string;
  query: Record<string, any>;
  path: string;
  total: number;
};
