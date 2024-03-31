import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextexpositionDetailsComponent } from './nextexposition-details.component';

describe('NextexpositionDetailsComponent', () => {
  let component: NextexpositionDetailsComponent;
  let fixture: ComponentFixture<NextexpositionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextexpositionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextexpositionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
