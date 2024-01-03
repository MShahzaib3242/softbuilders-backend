import mongoose, { Schema, Document, InferSchemaType } from 'mongoose';
import { DOCUMENT_MODEL_NAME } from './document.model';

const { ObjectId } = Schema.Types;

export const CAREER_MODEL_NAME = "career";


const CareerFormSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: ObjectId, required: true, ref: "departments" },
    phone: { type: Number, required: true },
    resume: { type: String, ref: DOCUMENT_MODEL_NAME, required: true },
    message: { type: String, required: true }
});


interface Career extends InferSchemaType<typeof CareerFormSchema> {
    [x: string]: any;
}

const CareerModel = mongoose.model(CAREER_MODEL_NAME, CareerFormSchema);

export default CareerModel
export { Career }