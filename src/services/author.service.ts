import AuthorModel from '@/models/author.model';
import { CreateAuthorPayload, UpdateAuthorPayload } from '@/types';

class AuthorService {
  /* get all authors */
  async getAll() {
    const authors = await AuthorModel.getAll();
    return authors;
  }

  /* get author by id */
  async getById(id: number) {
    const author = await AuthorModel.getById(id);
    return author;
  }

  /* create author */
  async create(payload: CreateAuthorPayload) {
    const newAuthor = await AuthorModel.create(payload);
    return newAuthor;
  }

  /* update author */
    async update(payload: UpdateAuthorPayload) {
    const updatedAuthor = await AuthorModel.update(payload);
    return updatedAuthor;
  }

  /* delete author */
  async delete(id: number) {
    const deletedRows = await AuthorModel.delete(id);
    return deletedRows;
  }
}

export default new AuthorService();
