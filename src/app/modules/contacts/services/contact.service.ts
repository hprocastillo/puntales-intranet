import {Injectable} from '@angular/core';
import {
  collection,
  Firestore,
  CollectionReference,
  query,
  orderBy,
  collectionData, doc, docData, updateDoc, deleteDoc, addDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Contact} from "../interfaces/contact";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.contactsCollection = collection(this.firestore, 'contacts');
  }

  getContacts() {
    const q = query(this.contactsCollection, orderBy('createdAt', 'desc'));
    return collectionData(q, {idField: 'id'}) as Observable<Contact[]>;
  }

  getContactById(contact: Contact) {
    const contactDocumentReference = doc(this.firestore, `contacts/${contact.id}`);
    return docData(contactDocumentReference, {idField: 'id'});
  }

  addContact(contact: Contact) {
    return addDoc(this.contactsCollection, contact);
  }

  updateContact(contact: Contact) {
    const contactDocumentReference = doc(this.firestore, `contacts/${contact.id}`);
    return updateDoc(contactDocumentReference, {...contact});
  }

  deleteContact(contact: Contact) {
    const contactDocumentReference = doc(this.firestore, `contacts/${contact.id}`);
    return deleteDoc(contactDocumentReference);
  }
}
