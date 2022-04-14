import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAnexoVComponent } from './modificar-anexo-v.component';

describe('ModificarAnexoVComponent', () => {
  let component: ModificarAnexoVComponent;
  let fixture: ComponentFixture<ModificarAnexoVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAnexoVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAnexoVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
