import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundedComponent } from './page-not-founded.component';

describe('PageNotFoundedComponent', () => {
  let component: PageNotFoundedComponent;
  let fixture: ComponentFixture<PageNotFoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFoundedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
