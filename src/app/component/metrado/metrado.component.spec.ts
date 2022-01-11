import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetradoComponent } from './metrado.component';

describe('MetradoComponent', () => {
  let component: MetradoComponent;
  let fixture: ComponentFixture<MetradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
