import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import{FormsModule} from '@angular/forms'



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']

})

export class TaskListComponent implements OnInit {

  
  constructor(private http: HttpClient, private location: Location) { }

  private listofTask = [];
  private BlistofTask = [];

  taskText:string;
  taskComplete:boolean = false;

  upadateText: string;
  upadateTaskID:string = null;
  updateTaskBool:boolean = false;

  deleteTask(id)
  {
    var url ="http://localhost:3000/deletetask/"+id

    this.http.delete(url).subscribe((result:any) =>{
      this.getallTasks()
      this.listofTask.sort(function (a, b) {
        return a._id.localeCompare(b._id);
      });
    });

  }

  SortbyText()
  {
    this.listofTask.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });
  }

  getallTasks()
  {
    this.http.get('http://localhost:3000/readallTask').subscribe((result:any) =>{
      this.listofTask = result
    });

  }

  ngOnInit() 
  {
    this.getallTasks()
  }

  createNewTask()
  {
    var url='http://localhost:3000/createTask'
    var data = {
      "text": this.taskText,
      "completed": this.taskComplete
    }

    this.http.post(url, data).subscribe((result:any) =>
    {
      this.getallTasks()
      this.listofTask.sort(function (a, b) {
        return a._id.localeCompare(b._id);
      });

    });

  }

  
  getIDKeys(index)
  {
    return this.listofTask[index]._id
  }

  getTextkeys(index)
  {
    return this.listofTask[index].text
  }

  getTaskCompletion(index)
  {
    return this.listofTask[index].completed

  }

  SortbyDate()
  {
    this.listofTask.sort(function (a, b) {
      return a._id.localeCompare(b._id);
    });
  }

  updateTaskComplete(id,completed, index)
  {
    var url = 'http://localhost:3000/markTaskComplete/'+id
    var data ={"completed":!completed}

    this.http.put(url,data).subscribe((result:any) =>
    {
      this.getallTasks()
      this.listofTask.sort(function (a, b) {
        return a._id.localeCompare(b._id);
      });
    });
  }

  updateTask(id, index,text)
  {
    this.upadateTaskID = id
    this.updateTaskBool = true
    this.upadateText = text
  }

  submitupdateTask()
  {
    var url = 'http://localhost:3000/renametask/'+this.upadateTaskID
    var data = {"text":this.upadateText}

    this.http.put(url,data).subscribe((result:any) =>
    {
      this.getallTasks()
      this.listofTask.sort(function (a, b) {
        return a._id.localeCompare(b._id);
      });
    });
  }
  
    
}
