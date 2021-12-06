import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarearegistroguardarComponent } from './tarearegistroguardar.component';

describe('TarearegistroguardarComponent', () => {
  let component: TarearegistroguardarComponent;
  let fixture: ComponentFixture<TarearegistroguardarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarearegistroguardarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarearegistroguardarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
