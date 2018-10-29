import { Component, OnInit } from '@angular/core';
import { DataGridService } from '../shared/datasource.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-outer-grid-filter',
  templateUrl: './outer-grid-filter.component.html',
  styleUrls: ['./outer-grid-filter.component.css']
})
export class OuterGridFilterComponent implements OnInit {
  filterForm: FormGroup;
  id: FormControl;
  name: FormControl;
  idValues;
  nameValues;
  constructor(private dataGridService: DataGridService) { }

  ngOnInit() {
    this.id = new FormControl();
    this.name = new FormControl();
    this.filterForm = new FormGroup({
      id: this.id,
      name: this.name
    });


    console.log(this.idValues);
    this.idValues = this.dataGridService.getColumnValues('id');
    this.nameValues = this.dataGridService.getColumnValues('name');
  }

  public applyFilter(filterForm) {
    console.log(filterForm);
    this.dataGridService.filterData(filterForm);
  }

}
