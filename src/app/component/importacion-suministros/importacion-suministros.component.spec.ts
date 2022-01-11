import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacionSuministrosComponent } from './importacion-suministros.component';

describe('ImportacionSuministrosComponent', () => {
  let component: ImportacionSuministrosComponent;
  let fixture: ComponentFixture<ImportacionSuministrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportacionSuministrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionSuministrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
