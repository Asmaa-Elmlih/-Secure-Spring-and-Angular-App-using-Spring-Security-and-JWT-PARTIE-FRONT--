import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

	// ============================================
	// Controles pagination
	// ============================================
  customers:InterfaceCustomers[]=[];
  displayedColumns: string[] = ["Id", "name", "email", "actions"];
  constructor(private router:Router,private service:CustomersService,public authService:AuthService) { }

  ngOnInit() {
    this.getAll()
  }
 
	

  add(){
    return this.router.navigate(["/admin/add-customers"])
  }
  Details(id:any){
    return this.router.navigate(["/bmh/details-animal/",id])
  }
  Modifier(id:any){
    return this.router.navigate(["/bmh/update-animal/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.customers=res;
        console.log(res)
      },err=>{
        console.log(err)
      }
      )
  }
  handleLogOut(){
    this.authService.handleLogOut();
    this.router.navigateByUrl("/login")
  }
  // delete(id:any){
  //   Swal.fire({
	// 		title: ' ',
	// 		text: "voulez-vous vraiment supprimer ce  entrées de stock  ?",
	// 		icon: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonColor: '#3085d6',
	// 		cancelButtonColor: '#d33',
	// 		confirmButtonText: 'Supprimer',
	// 		cancelButtonText: 'Fermer'
	  
	// 	  }).then((result) => {
	// 		 if (result.isConfirmed) {
	// 			this.service.delete(id).subscribe(res=>{
	// 			this.ngOnInit();
	// 			Swal.fire({
	// 			  title: 'entrées de stock à été   supprimé avec succès !',
	// 			  icon: 'success',
	// 			});
	// 		  },err=>{
	// 			console.log(err)
	// 		  })
	// 		}
	// 	  })
  // }

}
export interface InterfaceCustomers{
  id:number;
  name:string;
  email:string;
}