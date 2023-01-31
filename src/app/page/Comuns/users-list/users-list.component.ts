import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit{




  async ngOnInit() {
   
    this.initQuery();
  }

  private window = (<any>window);



  initQuery() {
    const permission = this.window.$('#permission');
 

    permission.select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
      try {
        e.target.value;
        
      } catch (e) {
      }
    })

  }
}

