import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { Injectable, ViewChild } from '@angular/core';

// TODO: Replace this with your own data model type
export interface DatagridItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DatagridItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];

/**
 * Data source for the Datagrid view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

@Injectable()
export class DataGridService implements DataSource<DatagridItem> {
  data: DatagridItem[] = EXAMPLE_DATA;
  private paginator: MatPaginator;
  private sort: MatSort;
  private table: MatTable<any>;

  // Observable _filter source
  private _filterSource = new BehaviorSubject<DatagridItem>({id: null, name: null});

  filter$ = this._filterSource.asObservable();

  setPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
    console.log('added paginator');
  }

  setSort(sort: MatSort) {
    this.sort = sort;
    console.log('added sort');
  }

  setTable(table: MatTable<any>) {
    this.table = table;
    console.log('added table');
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DatagridItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.filter$,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.tableFilterData(this._filterSource.value, this.getPagedData(this.getSortedData([...this.data])));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DatagridItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DatagridItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  public getColumnValues(column: string) {

/*    return this.data.map(function(d) {
     return d[column];
   }); */

   return this.data.map(d => d[column]);


  }

  public filterData( filter: DatagridItem) {
    // let filteredData = this.data.filter( d => (!filter.id || d.id === +filter.id) && (!filter.name || d.name === filter.name));
    this._filterSource.next(filter);
  }

  private tableFilterData( filter: DatagridItem, data: DatagridItem[]) {
    return data.filter( d => (!filter.id || d.id === +filter.id) && (!filter.name || d.name === filter.name));
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
