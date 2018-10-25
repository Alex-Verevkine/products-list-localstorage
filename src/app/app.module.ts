import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatToolbarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { LocalStorageService } from './services/local-storage.service';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [{ path: '', redirectTo: 'Home', pathMatch: 'full' }, { path: 'Home', component: AppComponent }];
@NgModule({
    declarations: [AppComponent, ProductsTableComponent, ProductModalComponent],
    imports: [
    BrowserModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    ],
    providers: [LocalStorageService],
    bootstrap: [AppComponent],
    entryComponents: [ProductModalComponent],
    })
export class AppModule {}
