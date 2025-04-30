import { queryHelper } from '@/helpers/query-helper';
import BookModel from '@/models/book.model';
import { CreateBookPayload, QueryOptions, UpdateBookPayload } from '@/types';

class BookService {
  /* get total count */
  async getTotal() {
    const total = await BookModel.getTotal();
    return total;
  }

  /* get all books */
  async getAll(options: QueryOptions) {
    const { filterableOptions, paginationOptions, query, url, path } = options;

    // Step 2: Prepare the actual query
    const { search, applyFilters, sortConditions, skip, limit, pagination, links } = queryHelper({
      filterableOptions,
      paginationOptions,
      searchableFields: ['title'], // support title-based search
      query,
      url,
      path,
      total: await this.getTotal(),
    });

    console.log('query-helper:', {
      search,
      applyFilters,
      sortConditions,
      skip,
      limit,
      pagination,
      links,
    });

    const books = await BookModel.query()
      //  .modify(search)
      //  .modify(applyFilters)
      //  .modify((qb) => {
      //    Object.entries(sortConditions).forEach(([field, order]) => {
      //      qb.orderBy(field, order as 'asc' | 'desc');
      //    });
      //  })

      .offset(skip)
      .limit(limit);

    console.log('books-service:', books);

    return {
      meta: {
        total: await this.getTotal(),
        page: pagination.current,
        limit,
        totalPages: pagination.totalPages,
        links,
      },
      data: books,
    };
  }

  /* get all books of an author */
  async getAuthorBooks(authorId: number, restOptions: Record<string, unknown> = {}) {
    const books = await BookModel.getAuthorBooks(authorId, restOptions);
    return books;
  }

  /* get book by id */
  async getById(id: number) {
    const book = await BookModel.getById(id);
    return book;
  }

  /* create book */
  async create(payload: CreateBookPayload) {
    const newBook = await BookModel.create(payload);
    return newBook;
  }

  /* update book */
  async update(payload: UpdateBookPayload) {
    const { id, ...rest } = payload;
    const updatedBook = await BookModel.update(id, rest);
    return updatedBook;
  }

  /* delete book */
  async delete(id: number) {
    const deletedRows = await BookModel.delete(id);
    return deletedRows;
  }
}

export default new BookService();
