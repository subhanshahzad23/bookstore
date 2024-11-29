/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
"use server";

import { Types } from "mongoose";
import { connectToDB } from "../db";
import { product } from "../modals/book.modal";
import getVendor from "../getVendor";
import { Groupe } from "../modals/group.modal";

// Helper function to map images (avoids repeating code)
function mapImages(images) {
  return images.map((image) => ({
    _id: new Types.ObjectId(image._id.$oid),
    pos: image.pos,
    process_id: new Types.ObjectId(image.process_id.$oid),
    file_domain: image.file_domain,
    file_path: image.file_path,
    file_sm: image.file_sm,
    file_md: image.file_md,
    file_lg: image.file_lg,
    filename: image.filename,
    filename_edit: image.filename_edit,
    filename_original: image.filename_original,
    created: new Date(image.created.$date),
    edited: image.edited ? new Date(image.edited) : null,
    resized: image.resized ? new Date(image.resized) : null,
    deleted: image.deleted ? new Date(image.deleted) : null,
  }));
}

// Helper function to process old data (avoids repeating code)
function mapOldData(oldData) {
  return {
    kuvat: Array.isArray(oldData.kuvat)
      ? mapImages(oldData.kuvat)
      : typeof oldData.kuvat === "string"
      ? JSON.parse(oldData.kuvat).map(mapImages)
      : [],
    lisaKuvat: Array.isArray(oldData.lisaKuvat)
      ? mapImages(oldData.lisaKuvat)
      : [],
    date: new Date(oldData.date.$date),
    asetukset: oldData.asetukset,
    piilotettu: oldData.piilotettu,
    kategoria: oldData.kategoria,
    tuoteryhmat: Array.isArray(oldData.tuoteryhmat)
      ? oldData.tuoteryhmat
      : oldData.tuoteryhmat
      ? JSON.parse(oldData.tuoteryhmat)
      : [],
    kustantajaHaku: oldData.kustantajaHaku,
    nimiHaku: oldData.nimiHaku,
    tekijaHaku: oldData.tekijaHaku,
    category: oldData.category,
    tarkistettu: oldData.tarkistettu,
    ver: oldData.ver,
  };
}

export async function getBooksAction() {
  await connectToDB();
  const vendor = await getVendor();
  const products = await product.find({ y_id: vendor?.antikvaari_id }).limit(5);
  return products;
}

export async function getAllBooks() {
  await connectToDB();
  const vendor = await getVendor();
  const products = await product.find({ y_id: vendor?.antikvaari_id });
  return products;
}

export async function getAllLanguages() {
  await connectToDB(); // Ensure database connection
  const vendor = await getVendor(); // Fetch vendor details

  if (!vendor?.antikvaari_id) {
    return []; // If vendor ID is missing, return empty array
  }

  // Query products using vendor's `antikvaari_id`
  const products = await product.find({ y_id: vendor.antikvaari_id });

  // Extract unique languages
  const languages = [...new Set(products.map((prod) => prod.kieli))];

  return languages;
}

export async function getAllGroups() {
  await connectToDB(); // Ensure database connection
  const vendor = await getVendor(); // Fetch vendor details

  if (!vendor?.antikvaari_id) {
    return []; // If vendor ID is missing, return empty array
  }

  // Query products using vendor's `antikvaari_id`
  const products = await product.find({ y_id: vendor.antikvaari_id });

  // Extract unique group IDs
  const GroupsId = [...new Set(products.map((prod) => prod.tuoteryhma))];

  // Query all groups using the extracted IDs
  const groups = await Groupe.find({ _id: { $in: GroupsId } });

  return groups; // Return the group details, not just the IDs
}

export async function getBookByIdAction({ id }) {
  try {
    await connectToDB();
    const data = await product.findById(id);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function createAndSaveProducts(data) {
  await connectToDB();
  const productPromises = data.map(async (item) => {
    const productInstance = new product({
      _id: new Types.ObjectId(item._id.$oid),
      myytyPvm: item.myytyPvm.map((date) => new Date(date)),
      hakusanat: item.hakusanat,
      tila: item.tila,
      nimi: item.nimi,
      tekija: item.tekija,
      paatuoteryhma: item.paatuoteryhma,
      myyntipaikka: item.myyntipaikka,
      tuotekoodi: item.tuotekoodi,
      kustantaja: item.kustantaja,
      isbn: item.isbn,
      y_id: item.y_id,
      ynimi: item.ynimi,
      ytila: item.ytila,
      pvm: new Date(item.pvm.$date),
      hylly: item.hylly,
      sidonta: item.sidonta,
      kunto: item.kunto,
      painovuosi: item.painovuosi,
      painos: item.painos,
      muuta: item.muuta,
      hinta: item.hinta,
      valuuttakoodi: item.valuuttakoodi,
      maara: item.maara,
      kieli: item.kieli,
      sivum: item.sivum,
      kuvatieto: item.kuvatieto,
      antikvaari_id: item.antikvaari_id,
      tuoteryhma: item.tuoteryhma,
      op: item.op,
      catalog_suggestions: [],
      hintaHaku: item.hintaHaku,
      varasto: new Types.ObjectId(item.varasto.$oid),
      kuvat: mapImages(item.kuvat),
      old_data: item.old_data.map(mapOldData),
      asetukset: item.asetukset,
      category: item.category,
      kategoria: item.kategoria,
      kustantajaHaku: item.kustantajaHaku,
      nimiHaku: item.nimiHaku,
      nimikeLisatiedot: item.nimikeLisatiedot,
      piilotettu: item.piilotettu,
      tarkistettu: item.tarkistettu ? new Date(item.tarkistettu) : null,
      tekijaHaku: item.tekijaHaku,
      tuoteryhmat: item.tuoteryhmat,
      ver: item.ver,
    });

    await productInstance.save();
  });

  // Use Promise.all to handle the product saving concurrently
  await Promise.all(productPromises);
}
