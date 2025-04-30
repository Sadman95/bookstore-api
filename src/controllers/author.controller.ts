import ApiError from '@/error-handlers/api-error';
import authorService from '@/services/author.service';
import catchAsync from '@/shared/catch-async';
import sendResponse from '@/shared/send-response';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

/**
 * @class AuthorController
 * @classdesc Controller to handle author-related API endpoints
 */
class AuthorController {
  /**
   * Fetches all authors from the database.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly getAll = catchAsync(async (req: Request, res: Response) => {
    const authors = await authorService.getAll();
    if (!authors || authors.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No authors found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: authors,
    });
  });

  /**
   * Fetches a author by ID.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly getById = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const author = await authorService.getById(id);
    if (!author) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: author,
    });
  });

  /**
   * Add a new author
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly create = catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Validation error', errors.array());
    }
    const newAuthor = await authorService.create(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      data: newAuthor,
      message: 'Author created successfully',
    });
  });

  /**
   * update author
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly update = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Validation error', errors.array());
    }
    const updatedAuthor = await authorService.update({id, ...req.body});
    if (!updatedAuthor) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update author');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: updatedAuthor,
      message: 'Author updated successfully',
    });
  });

  /**
   * Delete a auhtor by ID.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  public static readonly delete = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deletedRows = await authorService.delete(id);
    if (!deletedRows) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author deleted successfully',
    });
  });
}

export default AuthorController;
