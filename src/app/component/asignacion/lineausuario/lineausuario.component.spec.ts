import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineausuarioComponent } from './lineausuario.component';

describe('LineausuarioComponent', () => {
  let component: LineausuarioComponent;
  let fixture: ComponentFixture<LineausuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineausuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
