import {Timestamp} from "firebase/firestore";

export interface Service {
  id?: string;
  name: string;
  description: string;

  photoURL1: string;
  photoURL2: string;
  photoURL3: string;

  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
