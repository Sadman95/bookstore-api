import ApiError from '@/error-handlers/api-error';
import bookService from '@/services/book.service';
import catchAsync from '@/shared/catch-async';
import pick from '@/shared/pick';
import sendResponse from '@/shared/send-response';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

class BookController {
  /**
   * Fetches all books from the database.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly getAll = catchAsync(async (req: Request, res: Response) => {
    const filterableOptions = pick(req.query, ['searchTerm', 'title']);
    const paginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const { url, query, path } = req;

    const total = await bookService.getTotal();

    const options = {
      filterableOptions,
      paginationOptions,
      searchableFields: ['title'],
      url,
      query,
      path,
      total,
    };

    const books = await bookService.getAll(options);
    console.log('books-service:', books);
    if (!books || books.data.length === 0) {
      console.log('hit: No books found');
      throw new ApiError(httpStatus.NOT_FOUND, 'No books found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: books.data,
      meta: books.meta,
    });
  });

  /**
   * Fetches all books from the database.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly getAuthorBooks = catchAsync(async (req: Request, res: Response) => {
    const books = await bookService.getAuthorBooks(parseInt(req.params.authorId));
    if (!books || books.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No books found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: books,
    });
  });

  /**
   * Fetches a book by ID.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly getById = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = await bookService.getById(id);
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: book,
    });
  });

  /**
   * Add a new book
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly create = catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Validation error', errors.array());
    }
    const newBook = await bookService.create(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      data: newBook,
      message: 'Book created successfully',
    });
  });

  /**
   * update a book
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly update = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Validation error', errors.array());
    }
    const updatedBook = await bookService.update({ id, ...req.body });
    if (!updatedBook) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: updatedBook,
      message: 'Book updated successfully',
    });
  });

  /**
   * Delete a book by ID.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly delete = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deletedRows = await bookService.delete(id);
    if (!deletedRows) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully',
    });
  });
}

export default BookController;
