import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IProduct } from '../../interfaces/IProduct';
import { CATEGORIES } from '../data/select-options';
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'app-product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.scss'],
    })
export class ProductModalComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ProductModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { content: any; targetObj: IProduct }) {}

    readonly CATEGORIES = CATEGORIES;

    ngOnInit() {
        this.data.targetObj.category = this.data.targetObj.category || CATEGORIES[0];
    }

    onSave() {
        this.data.targetObj.creationDate = this.data.targetObj.creationDate || new Date();
        this.data.targetObj.id = this.data.targetObj.id || UUID.UUID();
        return this.data.targetObj;
    }

    onClose() {
        this.dialogRef.close();
    }
}
