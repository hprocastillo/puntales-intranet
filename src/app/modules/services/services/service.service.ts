import {Injectable} from '@angular/core';
import {
  collection,
  Firestore,
  CollectionReference,
  query,
  orderBy,
  collectionData, doc, docData, addDoc, updateDoc, deleteDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Service} from "../interfaces/service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  servicesCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.servicesCollection = collection(this.firestore, 'services');
  }

  getServices() {
    const q = query(this.servicesCollection, orderBy('createdAt', 'desc'));
    return collectionData(q, {idField: 'id'}) as Observable<Service[]>;
  }

  getServiceById(service: Service) {
    const serviceDocumentReference = doc(this.firestore, `services/${service.id}`);
    return docData(serviceDocumentReference, {idField: 'id'});
  }

  addService(service: Service) {
    return addDoc(this.servicesCollection, service);
  }

  updateService(service: Service) {
    const serviceDocumentReference = doc(this.firestore, `services/${service.id}`);
    return updateDoc(serviceDocumentReference, {...service});
  }

  deleteService(service: Service) {
    const serviceDocumentReference = doc(this.firestore, `services/${service.id}`);
    return deleteDoc(serviceDocumentReference);
  }
}
