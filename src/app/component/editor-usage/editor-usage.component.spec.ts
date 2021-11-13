import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorUsageComponent } from './editor-usage.component';

describe('EditorUsageComponent', () => {
  let component: EditorUsageComponent;
  let fixture: ComponentFixture<EditorUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
