import mongoose, { Schema, Document, InferSchemaType } from 'mongoose';


export const CONTACT_MODEL_NAME = "contact";

const ContactFormSchema: Schema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: Number, required: true},
    subject: { type: String, required: true},
    message: { type: String, required: true}
});


interface Contact extends InferSchemaType<typeof ContactFormSchema> {
    [x: string]: any;
  }

const ContactModel = mongoose.model(CONTACT_MODEL_NAME, ContactFormSchema);

export default ContactModel
export { Contact }


