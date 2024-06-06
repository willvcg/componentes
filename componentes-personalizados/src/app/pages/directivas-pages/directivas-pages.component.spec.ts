import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivasPagesComponent } from './directivas-pages.component';

describe('DirectivasPagesComponent', () => {
  let component: DirectivasPagesComponent;
  let fixture: ComponentFixture<DirectivasPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivasPagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectivasPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
