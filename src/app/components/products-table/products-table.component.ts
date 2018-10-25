import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { IProduct } from '../../interfaces/IProduct';
import { MatTableDataSource, MatDialog, MatSort, Sort } from '@angular/material';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
    selector: 'app-products-table',
    templateUrl: './products-table.component.html',
    styleUrls: ['./products-table.component.scss'],
    })
export class ProductsTableComponent implements OnInit {
    constructor(private localStorageService: LocalStorageService, private dialog: MatDialog) {}
    dataSource: MatTableDataSource<IProduct>;
    DISPLAYED_COLUMNS: string[] = ['name', 'category', 'price', 'creationDate', 'operations'];
    @ViewChild(MatSort)
    sort: MatSort;
    ngOnInit() {
        const res = this.localStorageService.getFromStorage('products');
        this.dataSource = new MatTableDataSource(res ? res : []);
        this.dataSource.sort = this.sort;
    }

    /**
     * @desc A method that opens edit product modal and saves it to local storage on save.
     * @param  {} currProduct Current product object ref.
     */
    onEditProduct(currProduct) {
        const dialogRef = this.dialog.open(ProductModalComponent, {
            width: '250px',
            data: {
                content: {
                    title: 'Edit Product',
                },
                targetObj: Object.assign({}, currProduct),
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                for (const key in currProduct) {
                    if (result.hasOwnProperty(key)) {
                        currProduct[key] = result[key];
                    }
                }
                this.localStorageService.setToStorage('products', this.dataSource.data);
            }
        });
    }

    /**
     * @desc A method that deletes requested product from local storage.
     * @param  {} event Element event
     * @param  {} currIndex Current product index.
     * @param  {} currProduct Current product ref.
     */
    deleteProduct(event, currIndex, currProduct) {
        event.stopPropagation();
        this.dataSource.data.splice(currIndex, 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.localStorageService.setToStorage('products', this.dataSource.data);
    }

    /**
     * A method that opens create new product modal and saves it to local storage on save.
     */
    onAddProduct() {
        const dialogRef = this.dialog.open(ProductModalComponent, {
            width: '250px',
            data: {
                content: {
                    title: 'Add Product',
                },
                targetObj: { name: '', category: null, price: '' },
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource = new MatTableDataSource([...this.dataSource.data, result]);
                this.localStorageService.setToStorage('products', this.dataSource.data);
            }
        });
    }

    /**
     * @desc A method that sorts current products and saves sorted result in local storage.
     * @param  {Sort} sort Sort object.
     */
    onSortData(sort: Sort) {
        let data = this.dataSource.data.slice();
        if (sort.active && sort.direction !== '') {
            data = data.sort((a: IProduct, b: IProduct) => {
                const isAsc = sort.direction === 'asc';
                switch (sort.active) {
                    case 'name':
                        return this.compare(a.name, b.name, isAsc);
                    case 'category':
                        return this.compare(+a.category, +b.category, isAsc);
                    case 'price':
                        return this.compare(+a.price, +b.price, isAsc);
                    case 'creationDate':
                        return this.compare(+a.creationDate, +b.creationDate, isAsc);
                    default:
                        return 0;
                }
            });
        }
        this.dataSource = new MatTableDataSource(data);
        this.localStorageService.setToStorage('products', data);
    }

    /**
     * @desc A sort method.
     * @param  {} a First target element
     * @param  {} b Second target elelemnt
     * @param  {} isAsc Sorting strategy.
     */
    private compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    /**
     * @desc Triggers filter on current products.
     * @param  {string} filterValue Filter obj.
     */
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
