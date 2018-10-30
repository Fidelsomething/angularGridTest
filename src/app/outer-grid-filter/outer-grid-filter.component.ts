import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataGridService, DatagridFilter } from '../shared/datasource.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
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
  filteredIds: Observable<string[]>;
  filteredNames: Observable<string[]>;
  ids: string[] = [];
  names: string[] = [];
  idValues: string[] = [];
  nameValues: string[] = [];

  @ViewChild('idInput') idInput: ElementRef<HTMLInputElement>;
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('idAuto') idAutocomplete: MatAutocomplete;
  @ViewChild('nameAuto') nameAutocomplete: MatAutocomplete;

  constructor(private dataGridService: DataGridService) {
    this.filteredIds = this.idCtrl.valueChanges.pipe(
      startWith(null),
      map((idz: string | null) => idz ? this._idFilter(idz) : this.idValues.slice())
    );
    this.filteredNames = this.nameCtrl.valueChanges.pipe(
      startWith(null),
      map((name: string | null) => name ? this._nameFilter(name) : this.nameValues.slice())
    );
  }

  addId(event: MatChipInputEvent): void {
    // Add ID only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.idAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add the id
      if ((value || '').trim()) {
        this.ids.push(value.trim());
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
      if ((value || '').trim()) {
        this.names.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.nameCtrl.setValue(null);
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

  ngOnInit() {
    this.filterForm = new FormGroup({
      id: this.idCtrl,
      name: this.nameCtrl
    });

    this.filterObject = {
      id: null,
      name: null
    };


    console.log(this.idValues);
    this.idValues = this.dataGridService.getColumnValues('id');
    this.nameValues = this.dataGridService.getColumnValues('name');
  }

  public applyFilter(filterForm) {
    this.filterObject = {
      id: this.ids,
      name: this.names
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

}
