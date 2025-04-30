import db from "@/db/knex";
import { CreateAuthorPayload, UpdateAuthorPayload } from "@/types";
import { Model, RelationMappings } from "objection";
import Book from "./book.model";



export default class Author extends Model {
  id!: number;
  name!: string;
  bio?: string;
  birthdate!: string;

  static tableName = 'authors';

  created_at!: string;
  updated_at!: string;
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static async getAll(): Promise<Author[]> {
    return db('authors').select('*');
  }

  static async getById(id: number): Promise<Author | undefined> {
    return db('authors').where({ id }).first();
  }

  static async create(author: CreateAuthorPayload): Promise<Author> {
    const [newAuthor] = await db('authors').insert(author).returning('*');
    return newAuthor;
  }

  static async update(payload: UpdateAuthorPayload): Promise<Author | undefined> {
    const { id, ...rest } = payload;
    const [updatedAuthor] = await db('authors').where({ id }).update(rest).returning('*');
    return updatedAuthor;
  }

  static async delete(id: number): Promise<number> {
    return db('authors').where({ id }).del();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'birthdate'],
      properties: {
        id: { type: 'integer' },
        bio: { type: 'text' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        birthdate: { type: 'string' },
      },
    };
  }

  static relationMappings: RelationMappings = {
    books: {
      relation: Model.HasManyRelation,
      modelClass: Book,
      join: {
        from: 'authors.id',
        to: 'books.author_id',
      },
    },
  };
}
