import mongoose, { Document, Schema } from "mongoose";

export interface TGroupe extends Document {
  _id: number;
  paatuoteryhma: string;
  nimi: string;
  kuvaus: string | null;
  __v: number;
}

const ItemSchema: Schema = new Schema({
  _id: { type: Number, required: true },
  paatuoteryhma: { type: String, required: true },
  nimi: { type: String, required: true },
  kuvaus: { type: String, default: null },
  __v: { type: Number, default: 0 },
});

export const Groupe =
  mongoose.models.Groupe || mongoose.model<TGroupe>("Groupe", ItemSchema);
