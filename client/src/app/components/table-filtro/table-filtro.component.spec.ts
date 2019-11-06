import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFiltroComponent } from './table-filtro.component';

describe('TableFiltroComponent', () => {
  let component: TableFiltroComponent;
  let fixture: ComponentFixture<TableFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
