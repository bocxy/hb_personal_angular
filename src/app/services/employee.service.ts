import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

interface OfficeDataResponse {
  HeadOffice: string[];
  CircleOffice: string[];
  DivisionOffice: string[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:5000';
  // private baseUrl ='https://personnelapi.aocxy.com'
  apiUrl: string;

  constructor(private http: HttpClient) { }

  getApiData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/info`);
  }

  getAllOfficeNames(): Observable<OfficeDataResponse> {
    return this.http.get<OfficeDataResponse>(`${this.baseUrl}/getAllOfficeNames`);
  }

  getAllTenureHistory(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id: id };
    console.log(body)
    return this.http.post(`${this.baseUrl}/getAllTenureHistory`, body,{ headers });
  }

  getTenureRecordBynId(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody =  {nId: id };
    console.log(requestBody);
    return this.http.post(`${this.baseUrl}/getTenureRecordBynId`, requestBody,{ headers });
  }


  getTenureRecord(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody =  {mId: id };
    console.log(requestBody);
    return this.http.post(`${this.baseUrl}/getTenureRecord`, requestBody,{ headers });
  }

  // getCadreNameCategory(id: number): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const requestBody =  {cadreCode: id };
  //   console.log(requestBody);
  //   return this.http.post(`${this.baseUrl}/getCadreNameCategory`, requestBody,{ headers });
  // }

  getCadreNameCategory(id: number): Observable<any> {

    const url = `${this.baseUrl}/getCadreNameCategory`;
    const requestBody = { cadreCode: id };
    return this.http.post<any>(url, requestBody);

  }

  getOfficeName(id: number): Observable<any> {

    const url = `${this.baseUrl}/getOfficeName`;
    const requestBody = { officeCode: id };
    return this.http.post<any>(url, requestBody);


  }

  getAllOfficeCode(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id: id };
    console.log(body)
    return this.http.post(`${this.baseUrl}/getAllOfficeCode`, body,{ headers });
  }

  getAllCadreCode(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id: id };
    console.log(body)
    return this.http.post(`${this.baseUrl}/getAllCadreCode`, body,{ headers });
  }


  getAllSanctionRecord(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id: id };
    console.log(body)
    return this.http.post(`${this.baseUrl}/getAllSanctionRecord`, body,{ headers });
  }

  saveSanction(employeeSanction: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/saveSanction`, employeeSanction, {headers});
  }

  saveCircleOffice(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/saveCircleOffice`, data, { headers });
  }

  saveDivisionsOffice(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/saveDivisionsOffice`, data, { headers });
  }

  saveHeadOffice(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/saveHeadOffice`, data, { headers });
  }

  getDivisionOffice(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: id };
     console.log(id);
    return this.http.post<any>(`${this.baseUrl}/getDivisionsOffice`, requestBody,{ headers });
  }
  getCircleOffice(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: id };
     console.log(id);
    return this.http.post<any>(`${this.baseUrl}/getCircleOffice`, requestBody,{ headers });
  }
  getHeadOffice(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: id };
     console.log(id);
    return this.http.post<any>(`${this.baseUrl}/getHeadOffice`, requestBody,{ headers });
  }

  deleteCircleOffice(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: id };
     console.log(id);
    return this.http.post<any>(`${this.baseUrl}/deleteCircleOffice`, requestBody,{ headers });
  }

  // deleteEmpFamilyDetails(id: number): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const requestBody = { id: id };
  //    console.log(id);
  //   return this.http.post<any>(`${this.baseUrl}/deleteEmpFamilyDetails`, requestBody,{ headers });
  // }

  deleteDirectRecruitment(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: id };
     console.log(id);
    return this.http.post<any>(`${this.baseUrl}/deleteDirectRecruitment`, requestBody,{ headers });
  }

  deleteDivisionOffice(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: id };
     console.log(id);
    return this.http.post<any>(`${this.baseUrl}/deleteDivisionOffice`, requestBody,{ headers });
  }
  deleteHeadOffice(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { id: id };
     console.log(id);
    return this.http.post<any>(`${this.baseUrl}/deleteHeadOffice`, requestBody,{ headers });
  }

  getAllCircleOffices(id: number): Observable<any> {
    const url = `${this.baseUrl}/getAllCircleOffices`;
    const requestBody = { id: id };
    return this.http.post<any>(url, requestBody,{responseType:'json'});
  }
  getAllDivisions(id: number): Observable<any> {
    const url = `${this.baseUrl}/getAllDivisions`;

    return this.http.post<any>(url, id);
  }

  getAllHeadOffice(id: number): Observable<any> {
    const url = `${this.baseUrl}/getAllHeadOffice`;
    const requestBody = { id: id };
    return this.http.post<any>(url, requestBody);
  }

  saveEmpExamHistory(data: any): Observable<any> {
    console.log("Working2");
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      console.log("Working3");
      return this.http.post<any>(`${this.baseUrl}/saveEmpExamHistory`, data, { headers });
      console.log("Working4");
  }



  getAllEmpExamHistory(id: number): Observable<any> {
    const url = `${this.baseUrl}/getAllEmpExamHistory`;
    const requestBody = { id: id };
    return this.http.post<any>(url, requestBody);
  }


  getEmpExamHistoryById(id: number): Observable<any> {
    debugger
    console.log("Working1");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { nId: id };
    console.log("Working");
     console.log(id);
    return this.http.post<any>(`${this.baseUrl}/getEmpExamHistoryById`, requestBody,{ headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        // Handle the error, show an error message, etc.
        throw error; // Rethrow the error to propagate it to the component that called this function.
      })
    );
  }

  // getEmpExamHistoryById(id: number): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.baseUrl}/getEmpExamHistoryById`;
  //   const requestBody = { nId:id };
  //   console.log(id);

  //   return this.http.post(url, requestBody,{ headers });
  // }


  deleteEmpExamHistory(id: number) {
    const url = `${this.baseUrl}/deleteEmpExamHistory/${id}`;
    return this.http.post<any>(url, id);
  }


  saveEmpMovable(data: any): Observable<any> {
         const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
           return this.http.post<any>(`${this.baseUrl}/saveEmpMovable`, data, { headers });

  }


  getAllEmployeeMovableDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/getAllEmployeeMovableDetails`;
    const requestBody = { id: id };
    return this.http.post<any>(url, requestBody);
  }

  saveEmpImmovable(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(`${this.baseUrl}/saveEmpImmovable`, data, { headers });

}

getAllEmployeeImmovableDetails(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllEmployeeImmovableDetails`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);

}

// getImmovableDetailsOfOneEmployee(id: number): Observable<any> {
//   debugger
//    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//   const requestBody = { mId: id };
//   console.log("Working");
//    console.log(id);
//   return this.http.post<any>(`${this.baseUrl}/getImmovableDetailsOfOneEmployee`, requestBody,{ headers }).pipe(
//     catchError((error) => {
//       console.error('Error:', error);
//       // Handle the error, show an error message, etc.
//       throw error; // Rethrow the error to propagate it to the component that called this function.
//     })
//   );
// }

getImmovableDetailsOfOneEmployee(id: number): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const requestBody =  {mId: id };
   console.log(id);
  return this.http.post<any>(`${this.baseUrl}/getImmovableDetailsOfOneEmployee`, requestBody,{ headers });
}

getImmovableDetailsBynId(id: number): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const requestBody =  {nId: id };
   console.log(id);
  return this.http.post<any>(`${this.baseUrl}/getImmovableDetailsBynId`, requestBody,{ headers });
}

getMovableDetailsOfOneEmployee(id: number): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const requestBody =  {mId: id };
   console.log(id);
  return this.http.post<any>(`${this.baseUrl}/getMovableDetailsOfOneEmployee`, requestBody,{ headers });
}

getMovableDetailsBynId(id: number): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const requestBody =  {nId: id };
   console.log(id);
  return this.http.post<any>(`${this.baseUrl}/getMovableDetailsBynId`, requestBody,{ headers });
}


deleteEmpImmovable(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteEmpImmovable`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}

deleteEmpMovable(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteEmpMovable`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}


getSanctionEmployeeById(id: number): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const requestBody =  {nId: id };
   console.log(id);
  return this.http.post<any>(`${this.baseUrl}/getSanctionEmployeeById`, requestBody,{ headers });
}

deleteSanctionById(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteSanctionById`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}



postingATransfer(data: any): Observable<any> {
  console.log(data);

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/postingATransfer`, data, { headers });

}



deleteTenureRecord(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteTenureRecord`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}

saveEmployeeDataTabs(data: any): Observable<any> {
  const url = `${this.baseUrl}/savetabs`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}


getEmployee(id: number): Observable<any> {
  const url = `${this.baseUrl}/getEmployee`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}


getAllEmployeeDetails(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAll`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

getCommonDetails(id: number): Observable<any> {
  debugger
  const url = `${this.baseUrl}/getCommonDetails`;
  const requestBody = { empId: id };
  return this.http.post<any>(url, requestBody);


}

saveDCellFile(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveDCellFile`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

getAllDCellCaseFile(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllDCellCaseFile`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}


getDCellFileById(id: number): Observable<any> {
  const requestPayload = { id };
  return this.http.post(`${this.baseUrl}/getDCellFileById`, requestPayload);
}

deleteDCellFile(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteDCellFile`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}

saveEmpFile(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveEmpFile`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}


getAllEmpFile(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllEmpFile`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

getEmpFileDetailOfOne(id: number): Observable<any> {
  const url = `${this.baseUrl}/getEmpFileDetailOfOne`;
  const requestBody = { mId: id };
  return this.http.post<any>(url, requestBody);
}

getEmpFileDetailBynId(id: number): Observable<any> {
  const url = `${this.baseUrl}/getEmpFileDetailBynId`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}


deleteEmpFile(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteEmpFile`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}

savePromotion(data: any): Observable<any> {
  const url = `${this.baseUrl}/savePromotion`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

deletePromotion(id: number): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const requestBody = { id: id };
   console.log(id);
  return this.http.post<any>(`${this.baseUrl}/deletePromotion`, requestBody,{ headers });
}

getAllPromotionHistory(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllPromotionHistory`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

getPromotionRecord(id: number): Observable<any> {
  const url = `${this.baseUrl}/getPromotionRecord`;
  const requestBody = { mId: id };
  return this.http.post<any>(url, requestBody);
}

getPromotionRecordBynId(id: number): Observable<any> {
  const url = `${this.baseUrl}/getPromotionRecordBynId`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}

savePayFixation(data: any): Observable<any> {
  const url = `${this.baseUrl}/savePayFixation`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}


getAllPay(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllPay`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

getPayFixationRecord(id: number): Observable<any> {
  const url = `${this.baseUrl}/getPayFixationRecord`;
  const requestBody = { mId: id };
  return this.http.post<any>(url, requestBody);
}

getPayFixationRecordBynId(id: number): Observable<any> {
  const url = `${this.baseUrl}/getPayFixationRecordBynId`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}

deletePayFixation(id: number): Observable<any> {
  const url = `${this.baseUrl}/deletePayFixation`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}

saveDirectRecruitment(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveDirectRecruitment`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

getAllDirectRecruitment(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllDirectRecruitment`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

getDirectRecruitmentBynId(id: number): Observable<any> {
  const url = `${this.baseUrl}/getDirectRecruitmentBynId`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}


saveEmpNOC(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveEmpNOC`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

getAllEmpNOC(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllEmpNOC`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}


// (id: number): Observable<any> {
//   const url = `${this.baseUrl}/getNOCDetailsById`;
//   const requestBody = { id: id };
//   return this.http.post<any>(url, requestBody);
// }

getNOCDetailsBynId(id: number): Observable<any> {

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const requestBody = { nId: id };

   console.log(id);
  return this.http.post<any>(`${this.baseUrl}/getNOCDetailsBynId`, requestBody,{ headers }).pipe(

  );
}

deleteEmpNOC(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteEmpNOC`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}

saveCgaDetails(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveCgaDetails`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

getCgaDetailsById(id: number): Observable<any> {
  const url = `${this.baseUrl}/getCgaDetailsById`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}

getAllCgaDetails(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllCgaDetails`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

deleteCgaDetails(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteCgaDetails`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}

applyForLeave(data: any): Observable<any> {
  const url = `${this.baseUrl}/applyForLeave`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

getAllLeaveRecord(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllLeaveRecord`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

getLeaveRecordBynId(id: number): Observable<any> {
  const url = `${this.baseUrl}/getLeaveRecordBynId`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}


saveCgaRegister(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveCgaRegister`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

deleteCgaRegister(id: number) {
  const url = `${this.baseUrl}/deleteCgaRegister/${id}`;
  return this.http.post<any>(url, id);
}

getAllCgaRegister(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllCgaRegister`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

getCgaRegisterById(id: number): Observable<any> {
  const url = `${this.baseUrl}/getCgaRegisterById`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}



saveEmpNomination(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveEmpNomination`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

getNominationOfOneEmployee(id: number): Observable<any> {
  const url = `${this.baseUrl}/getNominationOfOneEmployee`;
  const requestBody = { mId: id };
  return this.http.post<any>(url, requestBody);
}

getNominationBynId(id: number): Observable<any> {
  const url = `${this.baseUrl}/getNominationBynId`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}

getAllEmpNomination(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllEmpNomination`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

deleteEmpNomination(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteEmpNomination`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}


saveCellCase(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveCellCase`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}


saveDCellCase(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveDCellCase`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

getAllEmpDCellCase(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllEmpDCellCase`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

getDCellCaseDetailOfOne(id: number): Observable<any> {
  const url = `${this.baseUrl}/getDCellCaseDetailOfOne`;
  const requestBody = { mId: id };
  return this.http.post<any>(url, requestBody);
}

getDCellCaseDetailBynId(id: number): Observable<any> {
  const url = `${this.baseUrl}/getDCellCaseDetailBynId`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}


deleteDCellCase(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteDCellCase`;
  const requestBody = { id: id };
  return this.http.post<any>(url, requestBody);
}

deleteAnEmployeeDetail(id: number): Observable<any> {
  const url = `${this.baseUrl}/deleteAnEmployeeDetail`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}

saveEmpFamilyDetails(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveEmpFamilyDetails`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}


getAllEmpFamilyDetails(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllEmpFamilyDetails`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}

// getAllEmpFamilyDetails(id: number): Observable<any> {
//   const url = `${this.baseUrl}/getAllEmpFamilyDetails`;
//   const requestBody = { id: id };
//   return this.http.post(url, requestBody);
// }

getAllEmployeesInfo(id: number): Observable<any> {
  const url = `${this.baseUrl}/getAllEmployeesInfo`;
  const requestBody = { id: id };
  return this.http.post(url, requestBody);
}



deleteEmpFamilyDetails(id: number) {
  const url = `${this.baseUrl}/deleteEmpFamilyDetails/${id}`;
  return this.http.post<any>(url, id);
}



saveEmployeePersonal(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveEmployeePersonal`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

saveAppointmentInfo(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveAppointmentInfo`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

saveCurrentPayInfo(data: any): Observable<any> {
  const url = `${this.baseUrl}/saveCurrentPayInfo`;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(url, data, { headers });
}

getEmpFamilyDetailsById(id: number): Observable<any> {
  const url = `${this.baseUrl}/getEmpFamilyDetailsById`;
  const requestBody = { mId: id };
  return this.http.post<any>(url, requestBody);
}


getEmpFamilyDetailsBynId(id: number): Observable<any> {
  const url = `${this.baseUrl}/getEmpFamilyDetailsBynId`;
  const requestBody = { nId: id };
  return this.http.post<any>(url, requestBody);
}

uniqueEmployeeId(id: number): Observable<any> {
  const url = `${this.baseUrl}/uniqueEmployeeId`;
  const requestBody = { empId: id };
  return this.http.post<any>(url, requestBody);
}


uniqueCadreCode(id: number): Observable<any> {
  const url = `${this.baseUrl}/uniqueCadreCode`;
  const requestBody = { cadreCode: id };
  return this.http.post<any>(url, requestBody);
}

getRetirementDate(id: number): Observable<any> {
  const url = `${this.baseUrl}/getRetirementDate`;
  const requestBody = { dob: id };
  return this.http.post<any>(url, requestBody);
}


getMLAndEL(doj: string, dateOfRegularisation: string, regularised: string): Observable<any> {
  const url = `${this.baseUrl}/getMLAndEL`;
  const requestBody = { doj, dateOfRegularisation, regularised };
  return this.http.post<any>(url, requestBody);
}

uniqueOfficeCode(id: number): Observable<any> {
  const url = `${this.baseUrl}/uniqueOfficeCode`;
  const requestBody = { officeCode: id };
  return this.http.post<any>(url, requestBody);
}

uniqueDivisionCode(id: number): Observable<any> {
  const url = `${this.baseUrl}/uniqueDivisionCode`;
  const requestBody = { divisionCode: id };
  return this.http.post<any>(url, requestBody);
}

  deleteFamilyData(nid: number) {
    const url = `${this.baseUrl}/deleteFamilyData`;
    const requestBody = { nid : nid };
    return this.http.post<any>(url, requestBody);
  }


}
