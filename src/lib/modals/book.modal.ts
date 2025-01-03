import mongoose, { Schema, Types } from "mongoose";

const productSchema = new Schema({
  _id: { type: Types.ObjectId, required: true },
  myytyPvm: [Date],
  hakusanat: [String],
  tila: Boolean,
  nimi: String,
  tekija: String,
  paatuoteryhma: String,
  myyntipaikka: String,
  tuotekoodi: String,
  kustantaja: String,
  isbn: String,
  y_id: Number,
  ynimi: String,
  ytila: Number,
  pvm: Date,
  hylly: String,
  sidonta: String,
  kunto: String,
  painovuosi: String,
  painos: String,
  muuta: String,
  hinta: Number,
  valuuttakoodi: String,
  maara: Number,
  kieli: String,
  sivum: String,
  kuvatieto: String,
  antikvaari_id: Number,
  tuoteryhma: Number,
  op: String,
  catalog_suggestions: [{ type: Types.ObjectId, ref: "CatalogSuggestion" }],
  hintaHaku: Number,
  varasto: { type: Types.ObjectId, ref: "Varasto" },
  kuvat: [
    {
      _id: { type: Types.ObjectId, required: true },
      pos: Number,
      process_id: { type: Types.ObjectId, required: true },
      file_domain: String,
      file_path: String,
      file_sm: String,
      file_md: String,
      file_lg: String,
      filename: String,
      filename_edit: String,
      filename_original: String,
      created: Date,
      edited: Date,
      resized: Date,
      deleted: Date,
    },
  ],
  old_data: [
    {
      kuvat: [
        {
          _id: { type: Types.ObjectId, required: true },
          pos: Number,
          process_id: { type: Types.ObjectId, required: true },
          file_domain: String,
          file_path: String,
          file_sm: String,
          file_md: String,
          file_lg: String,
          filename: String,
          filename_edit: String,
          filename_original: String,
          created: Date,
          edited: Date,
          resized: Date,
          deleted: Date,
        },
      ],
      lisaKuvat: [
        {
          _id: { type: Types.ObjectId, required: true },
          pos: Number,
          process_id: { type: Types.ObjectId, required: true },
          file_domain: String,
          file_path: String,
          file_sm: String,
          file_md: String,
          file_lg: String,
          filename: String,
          filename_edit: String,
          filename_original: String,
          created: Date,
          edited: Date,
          resized: Date,
          deleted: Date,
        },
      ],
      date: Date,
    },
  ],
  asetukset: {
    tiedot_teokselta: Boolean,
  },
  category: Number,
  kategoria: Number,
  kustantajaHaku: String,
  nimiHaku: String,
  nimikeLisatiedot: String,
  piilotettu: Boolean,
  tarkistettu: Date,
  tekijaHaku: String,
  tuoteryhmat: [Number],
  ver: String,
});
export const product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
