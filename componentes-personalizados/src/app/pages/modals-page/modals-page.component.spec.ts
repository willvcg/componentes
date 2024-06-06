import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsPageComponent } from './modals-page.component';

describe('ModalsPageComponent', () => {
  let component: ModalsPageComponent;
  let fixture: ComponentFixture<ModalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
