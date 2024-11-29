/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Document, Schema } from "mongoose";

interface IReaction {
  date: Date;
  reaction_id: number;
  user_id: mongoose.Schema.Types.ObjectId;
}

interface IFeeling {
  id: number;
  group: string;
  name: string;
  value: string;
  emoji?: string;
  disabled?: boolean;
}

interface ITargetGroup {
  id: number;
  group: string;
  name: string;
  value: string;
}

interface IUpdate {
  date: Date;
  session_id: string;
  session_ip: string;
}

export interface ICatalog extends Document {
  catalog_id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  feelings: IFeeling[];
  rating: number;
  reactions: IReaction[];
  review: string;
  suggestion: boolean;
  subjects: string[];
  accepted: boolean | null;
  created: Date;
  deleted: Date | null;
  published: Date | null;
  temp: any;
  updated: IUpdate[];
  user_nickname: string;
  target_groups: ITargetGroup[];
}

const CatalogSchema: Schema = new Schema<ICatalog>({
  catalog_id: { type: Schema.Types.ObjectId, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  feelings: [
    {
      id: Number,
      group: String,
      name: String,
      value: String,
      emoji: { type: String, required: false },
      disabled: { type: Boolean, required: false },
    },
  ],
  rating: { type: Number, required: true },
  reactions: [
    {
      date: Date,
      reaction_id: Number,
      user_id: Schema.Types.ObjectId,
    },
  ],
  review: { type: String, required: true },
  suggestion: { type: Boolean, required: true },
  subjects: [{ type: String }],
  accepted: { type: Boolean, default: null },
  created: { type: Date, default: Date.now },
  deleted: { type: Date, default: null },
  published: { type: Date, default: null },
  temp: { type: Schema.Types.Mixed, default: null },
  updated: [
    {
      date: Date,
      session_id: String,
      session_ip: String,
    },
  ],
  user_nickname: { type: String, required: true },
  target_groups: [
    {
      id: Number,
      group: String,
      name: String,
      value: String,
    },
  ],
});

export default mongoose.models.Catalog ||
  mongoose.model<ICatalog>("Catalog", CatalogSchema);
