import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesEditComponent } from './services-edit.component';

describe('ServicesEditComponent', () => {
  let component: ServicesEditComponent;
  let fixture: ComponentFixture<ServicesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesEditComponent]
    });
    fixture = TestBed.createComponent(ServicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
