import { Request, Response, NextFunction } from 'express';
import { ValidationChain, matchedData } from 'express-validator';
import httpStatus from 'http-status';
import * as fs from 'fs';
import path from 'path';
import ApiError from '@/error-handlers/api-error';


// Extend Request to include file (optional)
interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}


export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: RequestWithFile, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        const error = new ApiError(
          httpStatus.BAD_REQUEST,
          'Validation Error! Try again later.',
          result.array()
        );
        error.name = 'ValidationError';

        if (req.file) {
          const filePath = path.join(
            __dirname,
            '..',
            '..',
            'public',
            req.file.fieldname,
            req.file.filename,
          );
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.log('Error while deleting the file:', unlinkErr);
            }
          });
        }

        return next(error); // Important to `return` after passing error
      }
    }

    const bearerToken = matchedData(req).authorization;

    if (bearerToken) {
      req.headers['authorization'] = bearerToken;
    }

    next();
  };
};
