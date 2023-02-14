import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import {AddProductDialogComponent} from '../add-product-dialog/add-product-dialog.component'


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

    constructor(
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
        // data: {name: this.name, animal: this.animal}
        height: '400px',
        width: '900px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });

  }

}

