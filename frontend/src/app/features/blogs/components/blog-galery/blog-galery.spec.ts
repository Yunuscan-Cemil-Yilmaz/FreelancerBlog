import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogGalery } from './blog-galery';

describe('BlogGalery', () => {
  let component: BlogGalery;
  let fixture: ComponentFixture<BlogGalery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogGalery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogGalery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
