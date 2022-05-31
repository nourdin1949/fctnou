import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { VerificarEmailComponent } from './verificar-email.component';

describe('VerificarEmailComponent', () => {
  let component: VerificarEmailComponent;
  let fixture: ComponentFixture<VerificarEmailComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const routerStub = () => ({ navigateByUrl: string => ({}) });
    const sharedServiceStub = () => ({
      verificarEmail: obejto => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [VerificarEmailComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Router, useFactory: routerStub },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(VerificarEmailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`incorrecto has default value`, () => {
    expect(component.incorrecto).toEqual(false);
  });

  it(`verificado has default value`, () => {
    expect(component.verificado).toEqual(false);
  });

  describe('verificarEmail', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(sharedServiceStub, 'verificarEmail').and.callThrough();
      component.verificarEmail();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(sharedServiceStub.verificarEmail).toHaveBeenCalled();
    });
  });
});
