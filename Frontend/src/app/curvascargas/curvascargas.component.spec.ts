import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvascargasComponent } from './curvascargas.component';

describe('CurvascargasComponent', () => {
  let component: CurvascargasComponent;
  let fixture: ComponentFixture<CurvascargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurvascargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvascargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
