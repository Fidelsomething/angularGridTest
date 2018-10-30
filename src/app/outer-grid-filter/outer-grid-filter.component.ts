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
  id: FormControl;
  name: FormControl;
  // idValues;
  nameValues;
  filterObject: DatagridFilter;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  idCtrl = new FormControl();
  filteredIds: Observable<string[]>;
  ids: string[] = [];
  names: string[] = [];
  idValues: string[] = [];

  @ViewChild('idInput') idInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private dataGridService: DataGridService) {
    this.filteredIds = this.idCtrl.valueChanges.pipe(
      startWith(null),
      map((idz: string | null) => idz ? this._idFilter(idz) : this.idValues.slice())
    );
  }

  addId(event: MatChipInputEvent): void {
    // Add ID only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
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

  removeId(id: string ) {
    const index = this.ids.indexOf(id);

    if (index >= 0) {
      this.ids.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ids.push(event.option.viewValue);
    this.idInput.nativeElement.value = '';
    this.idCtrl.setValue(null);
  }

  ngOnInit() {
    this.id = new FormControl();
    this.name = new FormControl();
    this.filterForm = new FormGroup({
      id: this.id,
      name: this.name
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
    // console.log(filterForm);
    // this.names.push(this.name.value);
    if (this.name.value) {
      this.names.push(this.name.value);
    }
    this.filterObject = {
      id: this.ids,
      name: this.names
    };
    console.log(this.filterObject);
    this.dataGridService.filterData(this.filterObject);
    this.names.length = 0;
    // this.ids.length = 0;
    this.name.reset();
  }

  private _idFilter(value: string): string[] {
    const idFilterValue = ('' + value).toLowerCase();

    return this.idValues.filter(id => ('' + id).toLowerCase().indexOf(idFilterValue) === 0);
  }

}
