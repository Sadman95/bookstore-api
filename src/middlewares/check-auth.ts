import envConfig from '@/config/env.config'
import ApiError from '@/error-handlers/api-error'
import { JwtHelpers } from '@/helpers/jwt-helpers'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'

export const checkAuth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refresh_token, access_token } = req.cookies
      const accessToken =
        req.headers.authorization?.split(' ')[1] ?? access_token

      const token = refresh_token ?? accessToken
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You aren't authorized")
      }
      let verifiedUser = null
      const secret =
        token === refresh_token
          ? envConfig.JWT_REFRESH_SECRET
          : envConfig.JWT_SECRET
      verifiedUser = JwtHelpers.verifyToken(token, secret as Secret)

      //check role
      if (
        requiredRoles.length &&
        verifiedUser.roles.some((role: string) => !requiredRoles.includes(role))
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }

      req.user = verifiedUser

      next()
    } catch (error) {
      next(error)
    }
  }

