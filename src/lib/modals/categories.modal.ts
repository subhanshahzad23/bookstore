import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  _id: number;
  description: {
    fi: string;
  };
  description_short: {
    fi: string;
  };
  images: {
    embeded: string;
    hero_lg: string;
    hero_sm: string;
  };
  label: {
    fi: string;
  };
  pos: number;
  properties: {
    ykl_additional_classes: string[];
    ykl: string[];
    udk: string[];
    legacy_groups: string[];
    other: string[];
    subjects: string[];
    subjects_clean: string[];
  };
  related_category: number | null;
  slug_fi: string;
  tier: number;
  title: {
    fi: string;
  };
  views: number;
  __v: number;
}

// Define the schema for Mongoose
const CategorySchema: Schema = new Schema({
  _id: { type: Number, required: true },
  description: {
    fi: { type: String, required: true },
  },
  description_short: {
    fi: { type: String, required: true },
  },
  images: {
    embeded: { type: String, default: "" },
    hero_lg: { type: String, default: "" },
    hero_sm: { type: String, default: "" },
  },
  label: {
    fi: { type: String, required: true },
  },
  pos: { type: Number, default: 0 },
  properties: {
    ykl_additional_classes: { type: [String], default: [] },
    ykl: { type: [String], default: [] },
    udk: { type: [String], default: [] },
    legacy_groups: { type: [String], default: [] },
    other: { type: [String], default: [] },
    subjects: { type: [String], default: [] },
    subjects_clean: { type: [String], default: [] },
  },
  related_category: { type: Number, default: null },
  slug_fi: { type: String, required: true },
  tier: { type: Number, required: true },
  title: {
    fi: { type: String, required: true },
  },
  views: { type: Number, default: 0 },
  __v: { type: Number, default: 0 },
});

// Export the model and schema
export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
