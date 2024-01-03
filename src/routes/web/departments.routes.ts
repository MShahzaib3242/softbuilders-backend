import express, { Response, Router } from 'express';
import { pushDepartments, allDepartments } from '../../controller/departments.controller';
const router: Router = express.Router();



router.post('/push', pushDepartments);

router.get('/all', allDepartments);


export default router;
