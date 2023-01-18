````ts

getItems() {
    this.angularFirestore.collection('People', ref => ref
      .limit(5)
      .orderBy('timestamp', 'desc')
    ).snapshotChanges()
      .subscribe(response => {
        if (!response.docs.length) {
          console.log("No Data Available");
          return false;
        }
        this.firstInResponse = response.docs[0];
        this.lastInResponse = response.docs[response.docs.length - 1];
 
        this.tableData = [];
        for (let item of response) {
          this.tableData.push(item.doc.data());
        }
 
        // initialize values
        this.prev_strt_at = [];
        this.pagination_clicked_count = 0;
        this.disable_next = false;
        this.disable_prev = false;
 
        // push first item to use for Previous action
        this.push_prev_startAt(this.firstInResponse);
      }, error => {
        console.log(error);
      });
    }, error => {
        console.log(error);
    });
}


````
