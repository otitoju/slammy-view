import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListsComponent } from './service-lists.component';

describe('ServiceListsComponent', () => {
  let component: ServiceListsComponent;
  let fixture: ComponentFixture<ServiceListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
