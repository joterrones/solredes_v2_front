import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallemetradoComponent } from './detallemetrado.component';

describe('DetallemetradoComponent', () => {
  let component: DetallemetradoComponent;
  let fixture: ComponentFixture<DetallemetradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallemetradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallemetradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
