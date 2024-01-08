import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

interface Field {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-staffreport',
  templateUrl: './staffreport.component.html',
  styleUrls: ['./staffreport.component.scss']
})

export class StaffreportComponent  {

  fields: Field[] = [];
  officeData: string[] = [];
  selectedFields: Field[] = [];
  records: any[] = [];
  selectedDataType: string = 'staff';
  selectedOfficeNames: { [key: string]: boolean } = {};
  filterValues: { [key: string]: any } = {};

  constructor(private dataService: EmployeeService) {
       this.fields.forEach(field => {
      this.filterValues[field.name] = '';
    });
  }

  ngOnInit() {
    this.loadApiData();
    this.loadOfficeData();
  }


  loadApiData() {
    this.dataService.getApiData().subscribe((data) => {
      this.records = data;
      this.formatDate();
      this.updateDynamicFields()

    });
  }

  private formatDate() {
    if (this.records && this.records.length > 0) {
      this.records.forEach((record) => {
        const retirementDate = new Date(record.Date_Of_Retirement);
        const day = retirementDate.getUTCDate();
        const month = retirementDate.getUTCMonth() + 1; 
        const year = retirementDate.getUTCFullYear();
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        record.Date_Of_Retirement = formattedDate;
      });
    }
  }

  loadOfficeData() {
    this.dataService.getAllOfficeNames().subscribe(
      (officeData) => {
        this.officeData = [
          ...officeData.HeadOffice,
          ...officeData.CircleOffice,
          ...officeData.DivisionOffice,
        ];
      },
      (error) => {
        console.error('Error fetching office data', error);
      }
    );
  }

  updateDynamicFields() {
    const firstRecord = this.records.length > 0 ? this.records[0] : {};
    this.fields = Object.keys(firstRecord).map((fieldName) => ({
      name: fieldName,
      checked: false,
    }));
    this.fields = [...this.fields].sort((a, b) => a.name.localeCompare(b.name));
    this.filterValues = {};
    this.fields.forEach(field => {
    this.filterValues[field.name] = '';
  });

    this.updateSelectedFields();
  }

  updateSelectedFields() {

    this.selectedFields = this.fields.filter((field) => field.checked);
    console.log('Selected Fields:', this.selectedFields);
  }

  updateSelectedOfficeNames() {
    this.selectedOfficeNames = Object.keys(this.selectedOfficeNames)
    .filter(officename => this.selectedOfficeNames[officename])
    .reduce((acc, officename) => {
        acc[officename] = true;
        return acc;
      }, {});
    console.log('Selected Office Names:', this.selectedOfficeNames);
  }

  isSelected(officename: string): boolean {
    return this.selectedOfficeNames[officename] || false;
  }


  toggleOfficeSelection(officename: string) {
    this.selectedOfficeNames[officename] = !this.selectedOfficeNames[officename];
    this.updateSelectedOfficeNames();
  }


  get filteredRecords() {
    return this.records.filter(record => {
      return this.selectedFields.every(field => {
        const filterValue = this.filterValues[field.name];
        if (filterValue !== '') {
          return record[field.name] === filterValue;
        } else if (this.selectedDataType === 'office') {
          const officeName = record['Office_Name'];
          return this.selectedOfficeNames[officeName];
        }
        return true;
      });
    });
  }

clearFilters() {
    this.fields.forEach(field => {
      this.filterValues[field.name] = '';
    });

  }

}