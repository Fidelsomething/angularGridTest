import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTab, MatTable } from '@angular/material';
import { DataGridService } from '../shared/datasource.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css'],
})
export class DatagridComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  filter: DatagridComponent;
  filterSubscription: Subscription;

  constructor(public dataSource: DataGridService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource.setPaginator(this.paginator);
    this.dataSource.setSort(this.sort);
    this.dataSource.setTable(this.table);
    this.filterSubscription = this.dataSource.filter$.subscribe(filter => this.filter);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.filterSubscription.unsubscribe();
  }

}
