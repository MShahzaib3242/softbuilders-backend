import express, { Router, Request, Response } from 'express';
import ContactModel from '../models/contact.model';
import { apiResponse } from '../utils/apiResponse';


export const postContact = async (req: Request, res: Response) => {

    try {
        const formData = req.body;

        const contactData = await ContactModel.create({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.subject
        });

        return apiResponse({
            res,
            message: "OK",
            data: contactData
        });

    } catch(error) {
        console.error('Error submitting contact form: ', error);
        res.status(500).json({message: 'Internal Server Error'});
    }

}; 