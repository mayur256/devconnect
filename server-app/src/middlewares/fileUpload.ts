import multer from 'multer';

export const fileUpload = multer({ dest: '/tmp/uploads' });
