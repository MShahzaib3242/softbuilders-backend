import { Request, Response, NextFunction } from 'express';
import { MulterFile } from '../utils/googleCloud';

import Multer from 'multer';
import util from 'util';

const isImage = (req: Request, file: MulterFile, callback: (error: Error | null, acceptFile: boolean) => void): void => {
    file.mimetype.startsWith('image')
        ? callback(null, true)
        : callback(new Error('Only image is allowed...'), false);
};

const multerFilter = (req: Request, file: MulterFile, callback: (error: Error | null, acceptFile: boolean) => void): void => {
    isImage(req, file, callback);
};

const limit = {
    files: 20, // allow only 20 files per request
    fileSize: 1024 * 1024 * 2, // 2MB
};

const processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: limit,
}).single('images');

export default util.promisify(processFile);
