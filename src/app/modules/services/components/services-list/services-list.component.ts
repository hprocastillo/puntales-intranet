import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from "../../interfaces/service";

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent {
  @Input() listServices: Service[] = [];
  @Output() outTemplate = new EventEmitter<string>();
  @Output() serviceToDelete = new EventEmitter<Service>();
  @Output() serviceToEdit = new EventEmitter<Service>();

  getTemplate(template: string) {
    this.outTemplate.emit(template);
  }

  deleteService(service: Service) {
    this.serviceToDelete.emit(service);
  }

  editService(service: Service) {
    this.serviceToEdit.emit(service);
  }

}
