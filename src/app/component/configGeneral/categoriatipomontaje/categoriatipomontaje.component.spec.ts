import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriatipomontajeComponent } from './categoriatipomontaje.component';

describe('CategoriatipomontajeComponent', () => {
  let component: CategoriatipomontajeComponent;
  let fixture: ComponentFixture<CategoriatipomontajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriatipomontajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriatipomontajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
