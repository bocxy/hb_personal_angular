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

export class StaffreportComponent {

  fields: Field[] = [];
  officeData: string[] = [];
  selectedFields: Field[] = [];
  records: any[] = [];
  selectedDataType: string = 'staff';
  selectedOfficeNames: { [key: string]: boolean } = {};
  filterValues: { [key: string]: any } = {};
  tenureFieldExtract: any;
  extractedTenureData: any;
  allKeys: { name: string; checked: boolean; }[];
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
      // this.records = data;
      this.records = [
        {
          "Basic_Pay": "10000",
          "Regular_Retirement_Pension_Sanction_Date": null,
          "date_of_relieved": "2023-12-14",
          "Loss_Of_Pay_Without_Medical_Certificate": 0,
          "Office_Code": "AA",
          "Unauthorised_Absence": null,
          "Pan_Number": "KN123AS",
          "Blood_Group": "A",
          "Adoption_Leave_Availed": 0,
          "Employee_Name": "Raga",
          "Father_Name": null,
          "Abroad_Employment_Leave_Availed": 0,
          "Initial_Appointment_Cadre": "2",
          "Unearned_Leave_Private_Availed": 0,
          "Loss_Of_Pay_With_Medical_Certificate": 0,
          "date_of_joined": "2023-12-13",
          "mode_of_transfer": "Transfer",
          "Employee_Unblemished_Service": null,
          "Mother_Tongue": "Tamil",
          "joining_time_el_credit": 3,
          "Study_Leave_Availed": 0,
          "Qualification": null,
          "Provisional_Pension_Sanction_Date": null,
          "transfer_office_code": null,
          "Present_Address": "K.K.Nagar",
          "Community": "22",
          "Cadre_Category": "Managerial",
          "Group": null,
          "Date_Of_Retirement": null,
          "Medical_Leave_Availed": 0,
          "Earned_Leave_Availed": 0,
          "Restricted_Holidays_Availed": 0,
          "Identification_Mark_1": null,
          "Date_Of_Regularization": null,
          "Family_Planning_Leave_Availed": 0,
          "Maternity_Leave_Availed": 0,
          "Identification_Mark_2": null,
          "Charges_Pending": null,
          "Date_Of_Joining_Service": "2021-08-10",
          "Casual_Leave_Availed": 0,
          "Whether_Regularized": "1",
          "Scale_Of_Pay": "11",
          "Unblemished_Order_Date": null,
          "Level_As_Per_Pay_Matrix": "11",
          "Gender": "Female",
          "Permanent_Address": "Ramapuram",
          "FBF_Sanctioned_Date": null,
          "date_of_transfer_order": "2023-09-12",
          "transfer_office_name": null,
          "Cadre_Code": "123",
          "Disability_Percentage": "22",
          "Differently_Abled_Category": "22",
          "Mobile_Number": "9993355647",
          "Date_Of_Birth": "2000-09-17",
          "Disability_Leave_Availed": 0,
          "Mode_Of_Retirement": null,
          "Mother_Name": null,
          "Special_Casual_Leave_Availed": 0,
          "Provisional_Admin_Approval_Date": null,
          "Date_Of_Appointment": "2022/10/10",
          "Regular_Retirement_Admin_Approval_Date": null,
          "Cadre_Name": "Admin",
          "Place_Of_Birth": "Chennai",
          "Retirement_Permitted_Status": null,
          "Mode_Of_Appointment": "1",
          "n_id": 214,
          "Aadhaar_Number": "987654321",
          "Office_Name": "K.K.Nagar",
          "Employee_ID": "16",
          "Email_ID": "nivetha@gmail.com",
          "FBF_Sanctioned_Amount": null,
          "Abortion_Leave_Availed": 0,
          "Sub_Caste": "22",
          "Date_Of_Probation_Declaration": "2021/01/01",
          "Increment_Due_Date": "2023-10-10",
          "Differently_Abled": "No",
          "Spouse_Name": null,
          "LTC_Availed": 0,
          "Religion": "Hindu",
          "Cell_As_Per_Pay_Matrix": "111"
        },
        {
          "Basic_Pay": "10000",
          "Regular_Retirement_Pension_Sanction_Date": null,
          "date_of_relieved": "2023-12-14",
          "Loss_Of_Pay_Without_Medical_Certificate": 0,
          "Office_Code": "AA",
          "Unauthorised_Absence": null,
          "Pan_Number": "KN123AS",
          "Blood_Group": "A",
          "Adoption_Leave_Availed": 0,
          "Employee_Name": "Raga",
          "Father_Name": null,
          "Abroad_Employment_Leave_Availed": 0,
          "Initial_Appointment_Cadre": "2",
          "Unearned_Leave_Private_Availed": 0,
          "mode_of_transfer": "",
          "Loss_Of_Pay_With_Medical_Certificate": 0,
          "date_of_joined": "2023-12-13",
          "Employee_Unblemished_Service": null,
          "joining_time_el_credit": 2,
          "Mother_Tongue": "Tamil",
          "Study_Leave_Availed": 0,
          "Qualification": null,
          "Provisional_Pension_Sanction_Date": null,
          "transfer_office_code": null,
          "Present_Address": "K.K.Nagar",
          "Community": "22",
          "Cadre_Category": "Managerial",
          "Group": null,
          "Date_Of_Retirement": null,
          "Medical_Leave_Availed": 0,
          "Earned_Leave_Availed": 0,
          "Restricted_Holidays_Availed": 0,
          "Identification_Mark_1": null,
          "Date_Of_Regularization": null,
          "Family_Planning_Leave_Availed": 0,
          "Maternity_Leave_Availed": 0,
          "Identification_Mark_2": null,
          "Charges_Pending": null,
          "Date_Of_Joining_Service": "2021-08-10",
          "Casual_Leave_Availed": 0,
          "Whether_Regularized": "1",
          "Scale_Of_Pay": "11",
          "Unblemished_Order_Date": null,
          "Level_As_Per_Pay_Matrix": "11",
          "Gender": "Female",
          "Permanent_Address": "Ramapuram",
          "FBF_Sanctioned_Date": null,
          "date_of_transfer_order": "2023-09-12",
          "transfer_office_name": null,
          "Cadre_Code": "123",
          "Disability_Percentage": "22",
          "Differently_Abled_Category": "22",
          "Mobile_Number": "9993355647",
          "Date_Of_Birth": "2000-09-17",
          "Disability_Leave_Availed": 0,
          "Mode_Of_Retirement": null,
          "Mother_Name": null,
          "Special_Casual_Leave_Availed": 0,
          "Provisional_Admin_Approval_Date": null,
          "Date_Of_Appointment": "2022/10/10",
          "Regular_Retirement_Admin_Approval_Date": null,
          "Cadre_Name": "Admin",
          "Place_Of_Birth": "Chennai",
          "Retirement_Permitted_Status": null,
          "Mode_Of_Appointment": "1",
          "n_id": 214,
          "Aadhaar_Number": "987654321",
          "Office_Name": "K.K.Nagar",
          "Employee_ID": "16",
          "Email_ID": "nivetha@gmail.com",
          "FBF_Sanctioned_Amount": null,
          "Abortion_Leave_Availed": 0,
          "Sub_Caste": "22",
          "Date_Of_Probation_Declaration": "2021/01/01",
          "Increment_Due_Date": "2023-10-10",
          "Differently_Abled": "No",
          "Spouse_Name": null,
          "LTC_Availed": 0,
          "Religion": "Hindu",
          "Cell_As_Per_Pay_Matrix": "111"
        },
        {
          "Basic_Pay": "10000",
          "Regular_Retirement_Pension_Sanction_Date": null,
          "date_of_relieved": "2023-12-14",
          "Loss_Of_Pay_Without_Medical_Certificate": 0,
          "Office_Code": "AA",
          "Unauthorised_Absence": null,
          "Pan_Number": "KN123AS",
          "Blood_Group": "A",
          "Adoption_Leave_Availed": 0,
          "Employee_Name": "Raga",
          "Father_Name": null,
          "Abroad_Employment_Leave_Availed": 0,
          "Initial_Appointment_Cadre": "2",
          "Unearned_Leave_Private_Availed": 0,
          "Loss_Of_Pay_With_Medical_Certificate": 0,
          "date_of_joined": "2023-12-13",
          "mode_of_transfer": "Transfer",
          "joining_time_el_credit": 6,
          "Employee_Unblemished_Service": null,
          "Mother_Tongue": "Tamil",
          "Study_Leave_Availed": 0,
          "Qualification": null,
          "Provisional_Pension_Sanction_Date": null,
          "transfer_office_code": null,
          "Present_Address": "K.K.Nagar",
          "Community": "22",
          "Cadre_Category": "Managerial",
          "Group": null,
          "Date_Of_Retirement": null,
          "Medical_Leave_Availed": 0,
          "Earned_Leave_Availed": 0,
          "Restricted_Holidays_Availed": 0,
          "Identification_Mark_1": null,
          "Date_Of_Regularization": null,
          "Family_Planning_Leave_Availed": 0,
          "Maternity_Leave_Availed": 0,
          "Identification_Mark_2": null,
          "Charges_Pending": null,
          "Date_Of_Joining_Service": "2021-08-10",
          "Casual_Leave_Availed": 0,
          "Whether_Regularized": "1",
          "Scale_Of_Pay": "11",
          "Unblemished_Order_Date": null,
          "Level_As_Per_Pay_Matrix": "11",
          "Gender": "Female",
          "Permanent_Address": "Ramapuram",
          "FBF_Sanctioned_Date": null,
          "date_of_transfer_order": "2023-09-12",
          "transfer_office_name": null,
          "Cadre_Code": "123",
          "Disability_Percentage": "22",
          "Differently_Abled_Category": "22",
          "Mobile_Number": "9993355647",
          "Date_Of_Birth": "2000-09-17",
          "Disability_Leave_Availed": 0,
          "Mode_Of_Retirement": null,
          "Mother_Name": null,
          "Special_Casual_Leave_Availed": 0,
          "Provisional_Admin_Approval_Date": null,
          "Date_Of_Appointment": "2022/10/10",
          "Regular_Retirement_Admin_Approval_Date": null,
          "Cadre_Name": "Admin",
          "Place_Of_Birth": "Chennai",
          "Retirement_Permitted_Status": null,
          "Mode_Of_Appointment": "1",
          "n_id": 214,
          "Aadhaar_Number": "987654321",
          "Office_Name": "K.K.Nagar",
          "Employee_ID": "16",
          "Email_ID": "nivetha@gmail.com",
          "FBF_Sanctioned_Amount": null,
          "Abortion_Leave_Availed": 0,
          "Sub_Caste": "22",
          "Date_Of_Probation_Declaration": "2021/01/01",
          "Increment_Due_Date": "2023-10-10",
          "Differently_Abled": "No",
          "Spouse_Name": null,
          "LTC_Availed": 0,
          "Religion": "Hindu",
          "Cell_As_Per_Pay_Matrix": "111"
        },
        {
          "Basic_Pay": "10000",
          "Regular_Retirement_Pension_Sanction_Date": null,
          "date_of_relieved": "2023-12-14",
          "Loss_Of_Pay_Without_Medical_Certificate": 0,
          "Office_Code": "AA",
          "Unauthorised_Absence": null,
          "Pan_Number": "KN123AS",
          "Blood_Group": "A",
          "Adoption_Leave_Availed": 0,
          "Employee_Name": "Raga",
          "Father_Name": null,
          "Abroad_Employment_Leave_Availed": 0,
          "Initial_Appointment_Cadre": "2",
          "Unearned_Leave_Private_Availed": 0,
          "Loss_Of_Pay_With_Medical_Certificate": 0,
          "date_of_joined": "2023-12-13",
          "Cadre_Code": "22",
          "mode_of_transfer": "Transfer",
          "Employee_Unblemished_Service": null,
          "Mother_Tongue": "Tamil",
          "Study_Leave_Availed": 0,
          "joining_time_el_credit": 1,
          "Qualification": null,
          "Provisional_Pension_Sanction_Date": null,
          "transfer_office_code": null,
          "Present_Address": "K.K.Nagar",
          "Community": "22",
          "Cadre_Category": "Managerial",
          "Group": null,
          "Date_Of_Retirement": null,
          "Medical_Leave_Availed": 0,
          "Earned_Leave_Availed": 0,
          "Restricted_Holidays_Availed": 0,
          "Identification_Mark_1": null,
          "Date_Of_Regularization": null,
          "Family_Planning_Leave_Availed": 0,
          "Maternity_Leave_Availed": 0,
          "Identification_Mark_2": null,
          "Charges_Pending": null,
          "Date_Of_Joining_Service": "2021-08-10",
          "Casual_Leave_Availed": 0,
          "Whether_Regularized": "1",
          "Scale_Of_Pay": "11",
          "Unblemished_Order_Date": null,
          "Level_As_Per_Pay_Matrix": "11",
          "Gender": "Female",
          "Permanent_Address": "Ramapuram",
          "FBF_Sanctioned_Date": null,
          "date_of_transfer_order": "2023-09-12",
          "transfer_office_name": null,
          "Disability_Percentage": "22",
          "Differently_Abled_Category": "22",
          "Mobile_Number": "9993355647",
          "Date_Of_Birth": "2000-09-17",
          "Disability_Leave_Availed": 0,
          "Mode_Of_Retirement": null,
          "Mother_Name": null,
          "Special_Casual_Leave_Availed": 0,
          "Provisional_Admin_Approval_Date": null,
          "Date_Of_Appointment": "2022/10/10",
          "Regular_Retirement_Admin_Approval_Date": null,
          "n_id": 219,
          "Cadre_Name": "Admin",
          "Place_Of_Birth": "Chennai",
          "Retirement_Permitted_Status": null,
          "Mode_Of_Appointment": "1",
          "Aadhaar_Number": "987654321",
          "Office_Name": "K.K.Nagar",
          "Employee_ID": "17",
          "Email_ID": "nivetha@gmail.com",
          "FBF_Sanctioned_Amount": null,
          "Abortion_Leave_Availed": 0,
          "Sub_Caste": "22",
          "Date_Of_Probation_Declaration": "2021/01/01",
          "Increment_Due_Date": "2023-10-10",
          "Differently_Abled": "No",
          "Spouse_Name": null,
          "LTC_Availed": 0,
          "Religion": "Hindu",
          "Cell_As_Per_Pay_Matrix": "111"
        },
        {
          "Basic_Pay": "10000",
          "Regular_Retirement_Pension_Sanction_Date": null,
          "date_of_relieved": "2023-12-14",
          "Loss_Of_Pay_Without_Medical_Certificate": 0,
          "Office_Code": "AA",
          "Unauthorised_Absence": null,
          "Pan_Number": "KN123AS",
          "Blood_Group": "A",
          "Adoption_Leave_Availed": 0,
          "Father_Name": null,
          "Abroad_Employment_Leave_Availed": 0,
          "Initial_Appointment_Cadre": "2",
          "Unearned_Leave_Private_Availed": 0,
          "Loss_Of_Pay_With_Medical_Certificate": 0,
          "date_of_joined": "2023-12-13",
          "mode_of_transfer": "Transfer",
          "Employee_Unblemished_Service": null,
          "Mother_Tongue": "Tamil",
          "Study_Leave_Availed": 0,
          "joining_time_el_credit": 1,
          "Qualification": null,
          "Provisional_Pension_Sanction_Date": null,
          "transfer_office_code": null,
          "Present_Address": "K.K.Nagar",
          "Community": "22",
          "Cadre_Category": "Managerial",
          "Group": null,
          "Date_Of_Retirement": null,
          "Medical_Leave_Availed": 0,
          "Earned_Leave_Availed": 0,
          "Restricted_Holidays_Availed": 0,
          "Identification_Mark_1": null,
          "Date_Of_Regularization": null,
          "Family_Planning_Leave_Availed": 0,
          "Maternity_Leave_Availed": 0,
          "Identification_Mark_2": null,
          "Charges_Pending": null,
          "Date_Of_Joining_Service": "2021-08-10",
          "Casual_Leave_Availed": 0,
          "Whether_Regularized": "1",
          "Scale_Of_Pay": "11",
          "Unblemished_Order_Date": null,
          "Level_As_Per_Pay_Matrix": "11",
          "Gender": "Female",
          "Permanent_Address": "Ramapuram",
          "FBF_Sanctioned_Date": null,
          "date_of_transfer_order": "2023-09-12",
          "transfer_office_name": null,
          "Cadre_Code": "123",
          "Disability_Percentage": "22",
          "Differently_Abled_Category": "22",
          "Mobile_Number": "9993355647",
          "Date_Of_Birth": "2000-09-17",
          "Disability_Leave_Availed": 0,
          "Mode_Of_Retirement": null,
          "Mother_Name": null,
          "Special_Casual_Leave_Availed": 0,
          "Provisional_Admin_Approval_Date": null,
          "Date_Of_Appointment": "2022/10/10",
          "Regular_Retirement_Admin_Approval_Date": null,
          "n_id": 220,
          "Cadre_Name": "Admin",
          "Place_Of_Birth": "Chennai",
          "Retirement_Permitted_Status": null,
          "Mode_Of_Appointment": "1",
          "Aadhaar_Number": "987654321",
          "Office_Name": "K.K.Nagar",
          "Employee_ID": "18",
          "Email_ID": "nivetha@gmail.com",
          "FBF_Sanctioned_Amount": null,
          "Abortion_Leave_Availed": 0,
          "Sub_Caste": "22",
          "Date_Of_Probation_Declaration": "2021/01/01",
          "Increment_Due_Date": "2023-10-10",
          "Differently_Abled": "No",
          "Spouse_Name": null,
          "LTC_Availed": 0,
          "Employee_Name": "RRRR",
          "Religion": "Hindu",
          "Cell_As_Per_Pay_Matrix": "111"
        }
      ]
      this.formatDate();
      this.updateDynamicFields()
      // this.updatedTenureFields()
    });
  }

  // updatedTenureFields() {
  //   this.extractedTenureData = this.records.map(tenure => ({
  //     mode_of_transfer: tenure.mode_of_transfer,
  //     date_of_joined: tenure.date_of_joined,
  //     date_of_relieved: tenure.date_of_relieved,
  //     date_of_transfer_order: tenure.date_of_transfer_order,
  //     joining_time_el_credit: tenure.joining_time_el_credit,
  //     transfer_office_code: tenure.transfer_office_code,
  //     transfer_office_name: tenure.transfer_office_name
  //   }));
  //   console.log(this.extractedTenureData)
  // }

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

    // Specify the keys you want separately
    const separateKeys = [
      'date_of_joined',
      'date_of_relieved',
      'date_of_transfer_order',
      'joining_time_el_credit',
      'mode_of_transfer',
      'transfer_office_code',
      'transfer_office_name',
    ];

    // Get all keys except the specified ones
    const otherKeys = Object.keys(firstRecord)
      .filter((fieldName) => !separateKeys.includes(fieldName))
      .map((fieldName) => ({
        name: fieldName,
        checked: false,
      }));
    this.fields = otherKeys;
    // Get the specified keys separately
    const specifiedKeys = separateKeys.map((fieldName) => ({
      name: fieldName,
      checked: false,
    }));
    console.log(specifiedKeys)
    this.tenureFieldExtract = specifiedKeys;
    // Combine all keys
    const allKeys = [...otherKeys, ...specifiedKeys].sort((a, b) => a.name.localeCompare(b.name));
    this.allKeys = allKeys;
    this.filterValues = {};
    allKeys.forEach(field => {
      this.filterValues[field.name] = '';
    });

    // Now, 'allKeys' contains all keys with specified ones separated
    // 'filterValues' is an object with all keys initialized to empty strings
    console.log(allKeys);
    this.updateSelectedFields();
  }

  updateSelectedFields() {
    this.selectedFields = this.allKeys.filter((field) => field.checked);
    console.log('Selected Fields:', this.selectedFields, this.filteredRecords);
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