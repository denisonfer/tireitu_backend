import multer, { StorageEngine } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const tempFolder = resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 'diskLocal' | 'firebaseStorage' | 'awsS3';
  directory: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    firebaseStorage: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: tempFolder,
  uploadsFolder: resolve(tempFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename: (req, file, callback) => {
        const fileHash = randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    firebaseStorage: {
      bucket: 'gs://tireitu-62815.appspot.com',
    },
  },
} as IUploadConfig;
