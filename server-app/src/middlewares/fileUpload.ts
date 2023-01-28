// top level imports
import { Request } from 'express';
import type { Express } from 'express';

import multer from 'multer';
import * as fs from 'node:fs';
import * as path from 'node:path';

let crypto: any = null;
try {
    crypto = require('node:crypto');
} catch (err) {
    console.error('crypto support is disabled!');
}
// console.log(path.join(__dirname, '../../public/uploads'))
// define a path to hold files via diskStorage engine
const storage = multer.diskStorage({
    destination: function(req: Request, file: Express.Multer.File, cb: any) {
        const { visibility = 'public' } = req.body;

        const storageDirs = visibility === 'private' ? 'storage' : 'public';

        const destinationPath = path.join(__dirname, '../../' + storageDirs + '/uploads');

        // create the directory if it doesn't already exists
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },

    filename: function(req, file, cb) {
        cb(null, `${(new Date()).getTime()}${crypto?.randomBytes(3)?.toString('hex')}`);
    }
});

function fileFilter(req: Request, file: Express.Multer.File, cb: any): any {
    if (!file.mimetype.includes('image')) {
        cb(null, false);
        req.body.attachmentValidationError = 'Only image files are allowed';
        return;
    }
    cb(null, true);
}

export const fileUpload = multer({
    storage,
    fileFilter
});
