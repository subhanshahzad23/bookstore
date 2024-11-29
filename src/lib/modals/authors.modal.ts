import mongoose, { Schema, Document } from "mongoose";

interface Details {
  firstname: string;
  lastname: string;
  fullname: string;
  born: Date | null;
  died: Date | null;
  nationality: string;
  description: string;
  fictional: boolean;
  nonreal: boolean | null;
}

interface CreatedUpdated {
  date: Date;
}

interface IAuthor extends Document {
  awards: string[];
  catalog: string[];
  details: Details;
  genres: string[];
  images: string[];
  kirjaverkko_id: number;
  name: string;
  namesake: string[];
  roles: string[];
  slug: string;
  subjects: string[];
  views: number;
  created: CreatedUpdated;
  deleted: Date | null;
  updated: CreatedUpdated;
  name_clean: string;
  name_sort: string;
}

// Define the schema
const DataSchema: Schema = new Schema({
  awards: [{ type: String }],
  catalog: [{ type: String }],
  details: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullname: { type: String },
    born: { type: Date, default: null },
    died: { type: Date, default: null },
    nationality: { type: String },
    description: { type: String },
    fictional: { type: Boolean, default: false },
    nonreal: { type: Boolean, default: null },
  },
  genres: [{ type: String }],
  images: [{ type: String }],
  kirjaverkko_id: { type: Number, required: true },
  name: { type: String, required: true },
  namesake: [{ type: String }],
  roles: [{ type: String }],
  slug: { type: String, required: true },
  subjects: [{ type: String }],
  views: { type: Number, default: 0 },
  created: {
    date: { type: Date, required: true },
  },
  deleted: { type: Date, default: null },
  updated: {
    date: { type: Date, required: true },
  },
  name_clean: { type: String, required: true },
  name_sort: { type: String, required: true },
});

export default mongoose.models.Data ||
  mongoose.model<IAuthor>("Author", DataSchema);
