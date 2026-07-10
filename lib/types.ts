export type ListingType = "sale" | "rent";

export type HomeType =
  | "Nhà phố"
  | "Căn hộ"
  | "Biệt thự"
  | "Đất nền"
  | "Nhà cấp 4";

export interface Property {
  id: string;
  title: string;
  price: number; // giá bán (VND) hoặc giá thuê/tháng (VND)
  listingType: ListingType;
  homeType: HomeType;
  address: string;
  city: string;
  district: string;
  beds: number;
  baths: number;
  area: number; // m2
  lat: number;
  lng: number;
  images: string[];
  description: string;
  features: string[];
  yearBuilt: number;
  agent: {
    name: string;
    phone: string;
    company: string;
  };
  daysOnMarket: number;
  isNew?: boolean;
}
