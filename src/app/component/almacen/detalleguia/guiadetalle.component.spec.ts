import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiadetalleComponent } from './guiadetalle.component';

describe('GuiadetalleComponent', () => {
  let component: GuiadetalleComponent;
  let fixture: ComponentFixture<GuiadetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiadetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
