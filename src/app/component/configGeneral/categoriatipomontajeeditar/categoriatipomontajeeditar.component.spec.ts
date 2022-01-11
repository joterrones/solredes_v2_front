import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriatipomontajeeditarComponent } from './categoriatipomontajeeditar.component';

describe('CategoriatipomontajeeditarComponent', () => {
  let component: CategoriatipomontajeeditarComponent;
  let fixture: ComponentFixture<CategoriatipomontajeeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriatipomontajeeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriatipomontajeeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
