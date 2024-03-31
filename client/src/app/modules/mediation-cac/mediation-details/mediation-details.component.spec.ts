import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediationDetailsComponent } from './mediation-details.component';

describe('MediationDetailsComponent', () => {
  let component: MediationDetailsComponent;
  let fixture: ComponentFixture<MediationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
