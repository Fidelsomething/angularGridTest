import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaliNavbarComponent } from './mali-navbar/mali-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatChipsModule,
  MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBar, MatSnackBarModule
} from '@angular/material';
import { OuterGridFilterComponent } from './outer-grid-filter/outer-grid-filter.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { DataGridDataSourceService } from './shared/dataGridDataSource.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MaliNavbarComponent,
    OuterGridFilterComponent,
    DatagridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [DataGridDataSourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
