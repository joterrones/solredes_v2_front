import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiadetalleeditarComponent } from './guiadetalleeditar.component';

describe('GuiadetalleeditarComponent', () => {
  let component: GuiadetalleeditarComponent;
  let fixture: ComponentFixture<GuiadetalleeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiadetalleeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiadetalleeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
