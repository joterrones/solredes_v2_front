import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaproyectoeditComponent } from './bolsaproyectoedit.component';

describe('BolsaproyectoeditComponent', () => {
  let component: BolsaproyectoeditComponent;
  let fixture: ComponentFixture<BolsaproyectoeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaproyectoeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaproyectoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
