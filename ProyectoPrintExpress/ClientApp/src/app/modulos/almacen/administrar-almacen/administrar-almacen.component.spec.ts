import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarAlmacenComponent } from './administrar-almacen.component';

describe('AdministrarAlmacenComponent', () => {
  let component: AdministrarAlmacenComponent;
  let fixture: ComponentFixture<AdministrarAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
