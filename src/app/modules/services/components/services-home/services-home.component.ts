import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Service} from "../../interfaces/service";
import {ServiceService} from "../../services/service.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-services-home',
  templateUrl: './services-home.component.html',
  styleUrls: ['./services-home.component.scss']
})
export class ServicesHomeComponent implements OnInit, OnDestroy {

  /** VARIABLES **/
  serviceSelected: Service = {} as Service;
  listServices: Service[] = [];
  template: string = 'LIST';
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    public authService: AuthService,
    private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this.serviceService.getServices()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.listServices = res;
      });
  }

  getTemplate(template: string) {
    this.template = template;
  }

  getEditService(service: Service) {
    this.serviceSelected = service;
    this.template = 'EDIT';
  }

  async getDeleteService(service: Service) {
    try {
      await this.serviceService.deleteService(service);
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
