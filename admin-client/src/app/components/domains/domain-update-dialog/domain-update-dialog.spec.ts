import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainUpdateDialog } from './domain-update-dialog';

describe('DomainUpdateDialog', () => {
  let component: DomainUpdateDialog;
  let fixture: ComponentFixture<DomainUpdateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainUpdateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainUpdateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
