import { Component, OnInit } from '@angular/core';
import { Product } from '../../customer-registration/model/product.model';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.css'
})
export class ProductRegistrationComponent implements OnInit {

  products:Product[]=[];
  productform:FormGroup<any>;
  selectedFile:File;
  buttonName="Save";
  selectedProduct:Product;
  show=false;
  product:Product;


  constructor(private productService:ProductService, private router: Router, private fb: FormBuilder, private sanitizer:DomSanitizer ){}

  ngOnInit(): void {
    this.productform = this.fb.group({
      "name":"",
      "type":"",
      "qty":0,
      "cost":0,
      "unitPrice":0,
    });

    this.getProducts();
  }


  //create a form data and save as a form value
  saveProduct(){
    const formData = this.productform.value;
    this.product = new Product("",
    formData.name,
    formData.type,
    formData.qty,
    formData.cost,
    formData.unitPrice,
    this.selectedFile,
    formData.imageUrl,
    formData.BIdata);


    //this for save the product details to the database
    if(this.buttonName == "Save"){
      this.productService.saveProduct(this.product).subscribe(()=>{
      alert("Product Save");
      location.reload();
    })
    }

    if(this.buttonName == "Update"){
      this.productService.updateProduct(this.selectedProduct.code,this.product).subscribe(()=>{
        console.log(this.product);
        alert("Product Updated");
        
        location.reload();
      })
      
      
    }
   
  }

  //this function for select the image and save to the database
  onFileChange(event: any){
    this.selectedFile = event.target.files[0];
  }

  //this function for get all products from database
  private getProducts(){
    this.productService.get().subscribe(data=>{
      this.products = data;
      this.loadImages();
    });
  }

  reloadCurrentPage() {
    window.location.reload();
   }

  //  this will get the product images, create as a object url and then set to the image column
   private loadImages(){
    for(const product of this.products){
      this.productService.getImage(product.code).subscribe(image=>{
        product.BIdata=image;
        product.photo= this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(product.BIdata));
      });
    }
  }

/** product update method */
  selectProduct(p:Product){
    this.selectedProduct = p;
    this.buttonName="Update"

    this.productform.patchValue({
      name : this.selectedProduct.name,
      type:this.selectedProduct.type,
      qty:this.selectedProduct.qty,
      cost:this.selectedProduct.cost,
      unitPrice:this.selectedProduct.unitPrice,
    })
  }
  
/**delete method */
  deleteProduct(code:string){
    this.productService.deleteProduct(code).subscribe(()=>{
      alert("product deleted");
      location.reload();
    })
  }

}
