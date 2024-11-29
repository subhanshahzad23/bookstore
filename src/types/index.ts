/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CardItem {
  id: string;
  image: string;
  title: string;
  price: string;
  quantity?: number;
  subTitle?: string;
  condition?: string;
  binding?: string;
  date?: string;
}

export interface Book {
  _id: {
    $oid: string;
  };
  nimi: string;
  tekija: string;
  kieli: string;
  paatuoteryhma: string;
  hinta: number;
  kunto: string;
  kustantaja: string;
  painovuosi: string;
  sivum: string;
  kuvat?: Array<{
    file_domain: string;
    file_path: string;
    file_sm: string;
    file_md: string;
    file_lg: string;
  }>;
  [key: string]: any; // for other potential properties
}

export interface SearchQuery {
  query: string;
  language: string;
  productGroup: string;
}
