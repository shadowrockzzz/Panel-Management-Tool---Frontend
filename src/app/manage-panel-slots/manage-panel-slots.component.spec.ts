import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePanelSlotsComponent } from './manage-panel-slots.component';

describe('ManagePanelSlotsComponent', () => {
  let component: ManagePanelSlotsComponent;
  let fixture: ComponentFixture<ManagePanelSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePanelSlotsComponent]
    });
    fixture = TestBed.createComponent(ManagePanelSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
