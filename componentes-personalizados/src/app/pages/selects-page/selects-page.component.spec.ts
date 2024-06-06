import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectsPageComponent } from './selects-page.component';

describe('SelectsPageComponent', () => {
  let component: SelectsPageComponent;
  let fixture: ComponentFixture<SelectsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
