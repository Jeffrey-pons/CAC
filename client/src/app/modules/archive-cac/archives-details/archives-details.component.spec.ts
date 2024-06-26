import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesDetailsComponent } from './archives-details.component';

describe('ArchivesDetailsComponent', () => {
  let component: ArchivesDetailsComponent;
  let fixture: ComponentFixture<ArchivesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
