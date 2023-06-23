import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../../services/auth.service";
import {Contact} from "../../interfaces/contact";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contacts-home',
  templateUrl: './contacts-home.component.html',
  styleUrls: ['./contacts-home.component.scss']
})
export class ContactsHomeComponent implements OnInit, OnDestroy {
  /** VARIABLES **/
  listContacts: Contact[] = [];
  template: string = 'LIST';
  private unsubscribe$ = new Subject<boolean>();

  constructor(public authService: AuthService, private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.contactService.getContacts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.listContacts = res;
      });
  }

  getTemplate(template: string) {
    this.template = template;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
