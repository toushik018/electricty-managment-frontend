import { IMeta } from "../common";




export interface IRequest {
  id: string;
  userId: string;
  flatId: string;
  moveInDate?: string;
  lengthOfStay?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  user: {
    id: string;
    username: string;
    profilePhoto?: string;
    contactNumber?: string;
  };
}




export interface SearchParams {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}