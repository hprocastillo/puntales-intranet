import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contact} from "../../interfaces/contact";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {
  @Input() listContacts: Contact[] = [];
  @Output() outTemplate = new EventEmitter<string>();

  getTemplate(template: string) {
    this.outTemplate.emit(template);
  }
}
