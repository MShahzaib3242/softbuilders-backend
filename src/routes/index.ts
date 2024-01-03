import express, { Router } from 'express';

import web from './web'
import admin from './admin'
import adminAuthMiddleware from '../middlewares/admin.auth.middleware';
import { postContact } from '../controller/contact.controller';
import { contactValidation } from '../validations/contact.validation';
import { validationCheck } from '../middlewares/validationCheck';
import { careerValidation } from '../validations/career.validation';
import { postCareer } from '../controller/career.controller';
import upload from '../middlewares/multer.middleware';
import { uploadFileToGC } from '../utils/googleCloud';
const router: Router = express.Router();


router.use('/web', web)
router.use('/admin', adminAuthMiddleware, admin)

router.post('/contact', contactValidation, validationCheck, postContact);
router.post('/career', upload.single('resume'), careerValidation, validationCheck, postCareer);


export default router;