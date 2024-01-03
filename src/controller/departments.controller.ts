import express, { Router, Request, Response } from 'express';
import DepartmentsModel from '../models/departments.model';
import { apiResponse } from '../utils/apiResponse';


export const pushDepartments = async (req: Request, res: Response) => {

    try {
        const departments = req.body; // Assuming req.body is an array of department objects

        // Insert the departments into the database using insertMany
        const insertedDepartments = await DepartmentsModel.insertMany(departments);

        return apiResponse({
            res,
            message: "OK",
            data: insertedDepartments
        });
        
    } catch(error) {
        res.status(500).json({message: 'Internal Server Error'});
    }

};


export const allDepartments = async (req: Request, res: Response) => {
    try {
        const departments = await DepartmentsModel.find();
        console.log('departments', departments);
        
        return apiResponse({
            res,
            message: "OK",
            data: departments
        });
    } catch(error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
}