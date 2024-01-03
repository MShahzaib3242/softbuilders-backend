import { body, ValidationChain } from 'express-validator';

export const contactValidation: ValidationChain[] = [
    body("name").notEmpty().withMessage('Full Name is required').isString().withMessage('Enter your full name.'),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email'),
    body("phone").notEmpty().withMessage('Phone Number is required').isNumeric().withMessage('Enter valid phone number'),
    body("subject").notEmpty().withMessage('Subject is required').isString().withMessage('Enter your subject'),
    body('message').notEmpty().withMessage('Message is Required')
]