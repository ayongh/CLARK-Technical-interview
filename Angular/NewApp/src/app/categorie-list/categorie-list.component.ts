import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule} from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})

export class CategorieListComponent implements OnInit {
  private categList = []

  categorieId:string;
  categorieName:string;
  categorieTask:string[];
  categFlag:boolean=false;
  createcategorieName:string;
  categorieSearch:string;

  //search
  addTaskID:string;
  listofTask=[];
  index

  //flag
  updateFlag:boolean = false
  myVar:boolean = false

  constructor(private http: HttpClient, private location: Location) {}

  getallCateg()
  {
this.getallCategorie()
  }

  createCategorie()
  {
    var data= {"name":this.createcategorieName}
    this.http.post("http://localhost:3000/createCategorie", data).subscribe(result=>{
      this.getallCategorie()
    })
  }

  lookupCateg()
  {
    var url = "http://localhost:3000/getCategorie/"+this.categorieSearch

    this.http.get(url).subscribe(result=>{
      this.categList.length = 0;
      this.categList[0] = result
    },
    error => {
      alert("No Catergorie with such id exists")
    })    
  }
  moreInfo(id,index, name)
  {
  
    this.categorieId=id
    this.categorieName=name
    this.categorieTask= this.categList[index].tasks
    this.categFlag = true
    this.index = index
  }

  addTaskToCategorie()
  {
    var url="http://localhost:3000/addTasktoCategorie/"+this.categorieId
    var data = {"taskIDlist":this.listofTask}
    this.http.put(url,data).subscribe(result=>{
      this.http.get('http://localhost:3000/getCategories').subscribe((result:any)=>{
        this.categList = result
        this.categorieTask= this.categList[this.index].tasks
        this.listofTask.length = 0
      });
    })
  }

  deletTask( categorieID, index, taskID, categName)
  {
    var url = 'http://localhost:3000/removeTaskfromCateg/'+categorieID
    var data = {"task":[taskID]}

    this.http.put(url,data).subscribe((result:any)=>{
      this.http.get('http://localhost:3000/getCategories').subscribe((result:any)=>{
        this.categList = result
        this.categorieTask= this.categList[this.index].tasks
      });
    })
  }

  

  ngOnInit() {
    this.getallCategorie()
  }

  searchTask()
  {
    this.listofTask.push(this.addTaskID)
  }

  removetaskfromList(index)
  {
    this.listofTask = this.listofTask.filter(item => item != this.listofTask[index]);

  }

  getallCategorie()
  {
    this.http.get('http://localhost:3000/getCategories').subscribe((result:any)=>{
      this.categList = result
      console.log(result)
    });
  }

  updateName()
  {
    var url = "http://localhost:3000/updateCategorie/"+this.categorieId
    var data = {"name":this.categorieName}

    this.http.put(url,data).subscribe(result=>{
      this.getallCategorie()
      
    })
  }

  deleteCateg()
  {
    var url="http://localhost:3000/deleteCategorie/"+this.categorieId

    this.http.delete(url).subscribe(result=>{
      console.log(result)
      location.reload()
    })
  }

}
