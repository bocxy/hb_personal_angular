import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { OfficeModule } from './office-data/office-data.module';
import { LeaveModule } from './leave/leave.module';
import { EmpDetModule } from './employee-details/employee-details.module';
import { StaffStrengthModule } from './staff-strength/staff-strength.module';
import { EmpTenureModule } from './emp-tenure/emp-tenure.module';
import { EmpPromotionModule } from './emp-promotion/emp-promotion.module';
import { EmpPayModule } from './emp-pay/emp-pay.module';
import { CellCaseModule } from './cell-case/cell-case.module';
import { CellFileModule } from './cell-file/cell-file.module';
import { EmpAssetModule } from './emp-asset/emp-asset.module';
import { DirectRecruitmentModule } from './direct-recruitment/direct-recruitment.module';
import { CgaDetailsModule } from './cga-details/cga-details.module';
import { CgaRegisterModule } from './cga-register/cga-register.module';
import { NocDetailsModule } from './noc-details/noc-details.module';
import { AssetDetailsModule } from './asset-details/asset-details.module';
import { ExamHistoryModule } from './exam-history/exam-history.module';
import { EmpNominiModule } from './emp-nomini/emp-nomini.module';
import { FamilyDetailsModule } from './family-details/family-details.module';
import { StaffreportComponent } from './staffreport/staffreport.component';
import { StaffreportModule } from './staffreport/staffreport.module';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', loadChildren: () => (import('./auth/auth.module')).then((m) => m.AuthModule) },
  { path: 'office-data', loadChildren: () => (import('./office-data/office-data.module')).then((m) => m.OfficeModule) },
  { path: 'leave', loadChildren: () => (import('./leave/leave.module')).then((m) => m.LeaveModule) },
  { path: 'employee', loadChildren: () => (import('./employee-details/employee-details.module')).then((m) => m.EmpDetModule) },
  { path: 'staff-strength', loadChildren: () => (import('./staff-strength/staff-strength.module')).then((m) => m.StaffStrengthModule) },
  { path: 'emp-tenure', loadChildren: () => (import('./emp-tenure/emp-tenure.module')).then((m) => m.EmpTenureModule) },
  { path: 'emp-promotion', loadChildren: () => (import('./emp-promotion/emp-promotion.module')).then((m) => m.EmpPromotionModule) },
  { path: 'emp-pay', loadChildren: () => (import('./emp-pay/emp-pay.module')).then((m) => m.EmpPayModule) },
  { path: 'cell-case', loadChildren: () => (import('./cell-case/cell-case.module')).then((m) => m.CellCaseModule) },
  { path: 'cell-file', loadChildren: () => (import('./cell-file/cell-file.module')).then((m) => m.CellFileModule) },
  { path: 'emp-asset', loadChildren: () => (import('./emp-asset/emp-asset.module')).then((m) => m.EmpAssetModule) },
  { path: 'direct-recruitment', loadChildren: () => (import('./direct-recruitment/direct-recruitment.module')).then((m) => m.DirectRecruitmentModule) },
  { path: 'cga-details', loadChildren: () => (import('./cga-details/cga-details.module')).then((m) => m.CgaDetailsModule) },
  { path: 'cga-register', loadChildren: () => (import('./cga-register/cga-register.module')).then((m) => m.CgaRegisterModule) },
  { path: 'noc-details', loadChildren: () => (import('./noc-details/noc-details.module')).then((m) => m.NocDetailsModule) },
  { path: 'asset-details', loadChildren: () => (import('./asset-details/asset-details.module')).then((m) => m.AssetDetailsModule) },
  { path: 'exam-history', loadChildren: () => (import('./exam-history/exam-history.module')).then((m) => m.ExamHistoryModule) },
  { path: 'emp-nomini', loadChildren: () => (import('./emp-nomini/emp-nomini.module')).then((m) => m.EmpNominiModule) },
  { path: 'family-details', loadChildren: () => (import('./family-details/family-details.module')).then((m) => m.FamilyDetailsModule) },
  { path: 'staffreport', loadChildren: () => (import('./staffreport/staffreport.module')).then((m) => m.StaffreportModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule, OfficeModule, LeaveModule, EmpDetModule, StaffStrengthModule, EmpTenureModule, 
    EmpPromotionModule, EmpPayModule, CellCaseModule, CellFileModule, EmpAssetModule, DirectRecruitmentModule,
     CgaDetailsModule, CgaRegisterModule, NocDetailsModule, AssetDetailsModule, ExamHistoryModule, EmpNominiModule, FamilyDetailsModule,StaffreportModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }


