import {Timestamp} from "firebase/firestore";

export interface Product {
  id?: string;
  name: string;
  category: string;

  photoURL1: string;
  photoURL2: string;
  photoURL3: string;
  dataSheetURL: string

  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;
  feature6: string;
  feature7: string;
  feature8: string;
  feature9: string;
  feature10: string;

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
