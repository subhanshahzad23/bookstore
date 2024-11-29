"use server";

import { headers } from "next/headers";
import vendors from "@/vendors.json";

export default async function getVendor() {
  const headersList = await headers();
  const domain = await headersList.get("host");
  const vendor = vendors.find((vendor) => vendor.domain === domain);
  return vendor;
}
