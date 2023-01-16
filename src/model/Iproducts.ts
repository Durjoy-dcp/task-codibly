export interface Iproducts {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data?: DataEntity[] | null;
  support: Support;
}
export interface DataEntity {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
export interface Support {
  url: string;
  text: string;
}
