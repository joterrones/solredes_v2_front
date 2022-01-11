import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoelementoComponent } from './tipoelemento.component';

describe('TipoelementoComponent', () => {
  let component: TipoelementoComponent;
  let fixture: ComponentFixture<TipoelementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoelementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoelementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
