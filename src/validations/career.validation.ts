import { body, ValidationChain } from 'express-validator';

export const careerValidation: ValidationChain[] = [
    body("name").notEmpty().withMessage('Full Name is required').isString().withMessage('Enter your full name.'),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email'),
    body("department").notEmpty().withMessage('Department is required').isString().withMessage('Enter valid department'),
    body("phone").notEmpty().withMessage('Phone Number is required').isNumeric().withMessage('Enter valid phone number'),
    body("resume").custom((value, { req }) => {
        // Check if req.file exists
        if (!req.file) {
            throw new Error('Please upload a valid resume file');
        }
        // You can add additional checks here if needed (e.g., file type, size)
        return true;
    }),
    body('message').notEmpty().withMessage('Message is Required')
]