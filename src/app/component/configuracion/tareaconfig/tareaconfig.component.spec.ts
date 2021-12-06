import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaconfigComponent } from './tareaconfig.component';

describe('TareaconfigComponent', () => {
  let component: TareaconfigComponent;
  let fixture: ComponentFixture<TareaconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
