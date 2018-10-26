import { Component, OnInit } from '@angular/core';
import { DataGridService } from '../shared/datagrid-datasource';

@Component({
  selector: 'app-outer-grid-filter',
  templateUrl: './outer-grid-filter.component.html',
  styleUrls: ['./outer-grid-filter.component.css']
})
export class OuterGridFilterComponent implements OnInit {

  constructor(private dataGridService: DataGridService) { }

  ngOnInit() {
  }

}
