import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import {AddProductDialogComponent} from '../add-product-dialog/add-product-dialog.component'

// export interface products {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// const ELEMENT_DATA: products[] = [
//   // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements AfterViewInit, OnInit{

  products:[]|any= [];
  displayedColumns: string[] = ['image', 'title', 'price', 'action'];
    dataSource = new MatTableDataSource(this.products);

    @ViewChild(MatSort)sort!: MatSort;

    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }

    constructor(public authService: AuthenticationService,
      private _liveAnnouncer: LiveAnnouncer,
      private router: ActivatedRoute,
      private prodServ: ProductService,
      public dialog: MatDialog
      ) {}

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }


  loginStatus = this.authService.checkLoginStatus();

  logOut() {
    this.authService.logOut();
  }



  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.prodServ.getAllProducts().subscribe((res:any)=>{
      console.log(res.data[0].title);
      this.products = res.data;
    },error=>{console.log("Error");})
  }

  animal: string="";
  name: string="";
  openModel(){
      const dialogRef = this.dialog.open(AddProductDialogComponent, {
        data: {name: this.name, animal: this.animal},
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });

  }

}

