import mongoose, { Schema, Document, InferSchemaType } from 'mongoose';

export interface DepartmentsForm extends Document {
    name: string;
}

export const Departments_MODEL_NAME = "departments";

const DepartmentsFormSchema: Schema = new Schema({
    name: { type: String, required: true},
});


interface Departments extends InferSchemaType<typeof DepartmentsFormSchema> {
    [x: string]: any;
  }

const DepartmentsModel = mongoose.model(Departments_MODEL_NAME, DepartmentsFormSchema);

export default DepartmentsModel
export { Departments }


