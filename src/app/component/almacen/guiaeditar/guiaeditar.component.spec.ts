import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaeditarComponent } from './guiaeditar.component';

describe('GuiaeditarComponent', () => {
  let component: GuiaeditarComponent;
  let fixture: ComponentFixture<GuiaeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
