import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarearegistroComponent } from './tarearegistro.component';

describe('TarearegistroComponent', () => {
  let component: TarearegistroComponent;
  let fixture: ComponentFixture<TarearegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarearegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarearegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
