import multer from 'multer'
// import fs from 'fs'
import { JwtPayload } from 'jsonwebtoken'
import path from 'path'

// const dir = './Public'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    
   let dest = `./public/${file.fieldname}`;

    callback(null, dest)
  },
  filename: function (req, file, callback) {
    const { userId } = req.user as JwtPayload
    callback(
      null,
      '/' +
        `${
          userId}.${path.basename(
                file.originalname,
                path.extname(file.originalname)
              )
        }` +
        path.extname(file.originalname)
    )
  },
})

export const upload = multer({
  limits: {
    fileSize: 5242880,
  },
  storage: storage,
})
