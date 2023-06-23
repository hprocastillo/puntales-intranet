import {Timestamp} from "firebase/firestore";

export interface Contact {
  id?: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  
  createdAt: Timestamp;
}
