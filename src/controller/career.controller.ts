import express, { Router, Request, Response } from 'express';
import CareerModel from '../models/career.model';
import { apiResponse } from '../utils/apiResponse';
import { MulterFile, uploadFileToGC } from '../utils/googleCloud';
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

export const postCareer = async (req: Request, res: Response) => {

    try {
        const formData = req.body;
        const resumeFile:any = req.file;

        const uploadedFile: any = await uploadFileToGC(formData.name, resumeFile);
        
        if(resumeFile) {
            await unlinkAsync(resumeFile.path)
        }
        
        // return res.status(200).json({
        //     path: uploadedFile.url,
        //     name: uploadedFile.name,
        //     size: uploadedFile.size,
        //     type: uploadedFile.type?.slice(1) || null,
        //     message: 'File uploaded successfully',
        // });

        const careerData = await CareerModel.create({
            name: formData.name,
            email: formData.email,
            department: formData.department,
            phone: formData.phone,
            resume: uploadedFile?.url,
            message: formData.message
        });

        const career = await CareerModel.findById(careerData._id).populate("department")

        return apiResponse({
            res,
            message: "OK",
            data: career
        });

    } catch (error) {
        console.error('Error submitting contact form: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}; 