import { Component, OnInit } from '@angular/core';
import { DataGridService } from '../shared/datagrid-datasource';

@Component({
  selector: 'app-outer-grid-filter',
  templateUrl: './outer-grid-filter.component.html',
  styleUrls: ['./outer-grid-filter.component.css']
})
export class OuterGridFilterComponent implements OnInit {

  idValues;
  nameValues;
  constructor(private dataGridService: DataGridService) { }

  ngOnInit() {
    console.log(this.idValues);
    this.idValues = this.dataGridService.getColumnValues('id');
    this.nameValues = this.dataGridService.getColumnValues('name');
  }

}
