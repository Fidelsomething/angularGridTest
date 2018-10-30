import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataGridDataSourceService, DatagridFilter } from '../shared/dataGridDataSource.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-outer-grid-filter',
  templateUrl: './outer-grid-filter.component.html',
  styleUrls: ['./outer-grid-filter.component.css']
})
export class OuterGridFilterComponent implements OnInit {
  filterForm: FormGroup;
  // id: FormControl;
  // name: FormControl;
  filterObject: DatagridFilter;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  idCtrl = new FormControl();
  nameCtrl = new FormControl();
  symbolCtrl = new FormControl();
  filteredIds: Observable<string[]>;
  filteredNames: Observable<string[]>;
  filteredSymbols: Observable<string[]>;
  ids: string[] = [];
  names: string[] = [];
  symbols: string[] = [];
  idValues: string[] = [];
  nameValues: string[] = [];
  symbolValues: string[] = [];

  @ViewChild('idInput') idInput: ElementRef<HTMLInputElement>;
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('symbolInput') symbolInput: ElementRef<HTMLInputElement>;
  @ViewChild('idAuto') idAutocomplete: MatAutocomplete;
  @ViewChild('nameAuto') nameAutocomplete: MatAutocomplete;
  @ViewChild('symbolAuto') symbolAutocomplete: MatAutocomplete;

  constructor(private dataGridService: DataGridDataSourceService, public snackBar: MatSnackBar) {
    this.filteredIds = this.idCtrl.valueChanges.pipe(
      startWith(null),
      map((id: string | null) => id ? this._idFilter(id) : this.idValues.slice())
    );
    this.filteredNames = this.nameCtrl.valueChanges.pipe(
      startWith(null),
      map((name: string | null) => name ? this._nameFilter(name) : this.nameValues.slice())
    );
    this.filteredSymbols = this.symbolCtrl.valueChanges.pipe(
      startWith(null),
      map((symbol: string | null) => symbol ? this._symbolFilter(symbol) : this.symbolValues.slice())
    );
  }

  ngOnInit() {
    this.filterForm = new FormGroup({
      id: this.idCtrl,
      name: this.nameCtrl,
      symbol: this.symbolCtrl
    });

    this.filterObject = {
      id: null,
      name: null,
      symbol: null
    };


    console.log(this.idValues);
    this.idValues = this.dataGridService.getColumnValues('id');
    this.nameValues = this.dataGridService.getColumnValues('name');
    this.symbolValues = this.dataGridService.getColumnValues('symbol');
  }


  addId(event: MatChipInputEvent): void {
    // Add ID only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.idAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add the id
      if ((value || '').trim() && this.idValues.some(id => id === value)) {
        this.ids.push(value.trim());
      } else if (value !== '') {
        this.snackBar.open(value + ' is not a valid filter criteria for ID', null, {
          duration: 2000,
          panelClass: ['orange-snackbar']
        });
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.idCtrl.setValue(null);
    }
  }

  addName(event: MatChipInputEvent): void {
    // Add ID only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.nameAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add the id
      if ((value || '').trim() && this.nameValues.some(name => name === value)) {
        this.names.push(value.trim());
      } else if (value !== '') {
        this.snackBar.open(value + ' is not a valid filter criteria for Name', null, {
          duration: 2000,
          panelClass: ['orange-snackbar']
        });
      }


      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.nameCtrl.setValue(null);
    }
  }

  addSymbol(event: MatChipInputEvent): void {
    // Add ID only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.symbolAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add the id
      if ((value || '').trim() && this.symbolValues.some(symbol => symbol === value)) {
        this.symbols.push(value.trim());
      } else if (value !== '') {
        this.snackBar.open(value + ' is not a valid filter criteria for Symbol', null, {
          duration: 2000,
          panelClass: ['orange-snackbar']
        });
      }


      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.symbolCtrl.setValue(null);
    }
  }

  removeId(id: string ) {
    const index = this.ids.indexOf(id);

    if (index >= 0) {
      this.ids.splice(index, 1);
    }
  }

  removeName(name: string ) {
    const index = this.names.indexOf(name);

    if (index >= 0) {
      this.names.splice(index, 1);
    }
  }

  removeSymbol(symbol: string ) {
    const index = this.symbols.indexOf(symbol);

    if (index >= 0) {
      this.symbols.splice(index, 1);
    }
  }

  selectedId(event: MatAutocompleteSelectedEvent): void {
    this.ids.push(event.option.viewValue);
    this.idInput.nativeElement.value = '';
    this.idCtrl.setValue(null);
  }

  selectedName(event: MatAutocompleteSelectedEvent): void {
    this.names.push(event.option.viewValue);
    this.nameInput.nativeElement.value = '';
    this.nameCtrl.setValue(null);
  }

  selectedSymbol(event: MatAutocompleteSelectedEvent): void {
    this.symbols.push(event.option.viewValue);
    this.symbolInput.nativeElement.value = '';
    this.symbolCtrl.setValue(null);
  }

  public applyFilter(filterForm) {
    this.filterObject = {
      id: this.ids,
      name: this.names,
      symbol: this.symbols
    };
    console.log(this.filterObject);
    this.dataGridService.filterData(this.filterObject);
  }

  private _idFilter(value: string): string[] {
    const idFilterValue = ('' + value).toLowerCase();

    return this.idValues.filter(id => ('' + id).toLowerCase().indexOf(idFilterValue) === 0);
  }

  private _nameFilter(value: string): string[] {
    const nameFilterValue = ('' + value).toLowerCase();

    return this.nameValues.filter(name => ('' + name).toLowerCase().indexOf(nameFilterValue) === 0);
  }

  private _symbolFilter(value: string): string[] {
    const symbolFilterValue = ('' + value).toLowerCase();

    return this.symbolValues.filter(symbol => ('' + symbol).toLowerCase().indexOf(symbolFilterValue) === 0);
  }
}
