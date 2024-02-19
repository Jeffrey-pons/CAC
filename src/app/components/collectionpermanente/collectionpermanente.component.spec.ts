import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionpermanenteComponent } from './collectionpermanente.component';

describe('CollectionpermanenteComponent', () => {
  let component: CollectionpermanenteComponent;
  let fixture: ComponentFixture<CollectionpermanenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionpermanenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionpermanenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
