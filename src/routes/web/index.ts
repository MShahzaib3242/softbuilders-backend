import express, { Response, Router } from 'express';
import { apiResponse } from '../../utils/apiResponse';
import { CustomRequest } from '../../interface/CustomRequest';
import departmentRoutes from "./departments.routes";


const router: Router = express.Router();


router.get('/', (req: CustomRequest, res: Response) => {
    return apiResponse({
        res,
        message: "OK",
    });
});

router.use("/departments", departmentRoutes);

export default router;
