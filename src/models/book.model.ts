import db from '@/db/knex';
import { CreateBookPayload } from '@/types';
import { Model, RelationMappings } from 'objection';
import Author from './author.model';

class Book extends Model {
  id!: number;
  title!: string;
  description?: string;
  published_date!: string;
  author_id!: number;

  static tableName = 'books';

  created_at!: string;
  updated_at!: string;
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static async getTotal(): Promise<number> {
    const total = await db('books').select('*');
    return total.length;
  }

  static async getAll(restOptions: Record<string, unknown> = {}): Promise<Book[]> {
    console.log('restOptions-service:', restOptions);
    const query = db('books').select('*').where(restOptions);    
    return query;
  }

  static async getAuthorBooks(authorId: number, restOptions: Record<string, unknown> = {}): Promise<Book[]> {
    const query = db('books').select('*').where({ author_id : authorId, ...restOptions });    
    return query;
  }

  static async getById(id: number): Promise<Book | undefined> {
    return db('books').where({ id }).first();
  }

  static async create(book: CreateBookPayload): Promise<Book> {
    const [newBook] = await db('books').insert(book).returning('*');
    return newBook;
  }

  static async update(id: number, book: Partial<Book>): Promise<Book | undefined> {
    const [updatedBook] = await db('books').where({ id }).update(book).returning('*');
    return updatedBook;
  }

  static async delete(id: number): Promise<number> {
    return db('books').where({ id }).del();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'published_date', 'author_id'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'text' },
        description: { type: 'text' },
        published_date: { type: 'string' },
        author_id: { type: 'string' },
      },
    };
  }

  static relationMappings: RelationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: Author,
      join: {
        from: 'books.author_id',
        to: 'authors.id',
      },
    },
  };
}

export default Book;
