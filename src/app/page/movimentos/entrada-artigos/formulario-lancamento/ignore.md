````ts
 matcher: (params: any, data: any) => {
  // @ts-ignore
  if ($.trim(params.term) === '') {
    return data;
  }
  if (data.text.indexOf(params.term) < 3) {
    this.dataSelect = this.searchArticle.findName(params.term)

    data = this.dataSelect.map(e => {
      let Adata: any = {id: '', text: ''};
      Adata.id = e;
      Adata.text = e.name
      return Adata
    })
    let modifiedData: any[] = [];
    data.forEach((a: any) => {
      // @ts-ignore
      modifiedData.push($.extend({}, a, true))
    })


    // You can return modified objects from here
    // This includes matching the `children` how you want in nested data sets

    return modifiedData;
  }


  return null
}

matcher: (params: any, data: any) => {
  //@ts-ignore
  let filteredChildren: any[] = [];

  if (params.term.length > 4) {

    this.dataSelect = this.searchArticle.findName(params.term)
    filteredChildren = this.dataSelect.map((e: any) => {
      let Adata: any = {id: '', text: ''};
      Adata.id = JSON.stringify(e);
      Adata.text = e.name
      return Adata
    })

    data = filteredChildren[-1]

    if (filteredChildren.length) {
      //@ts-ignore
      let modifiedData = $.extend({}, data, true);
      modifiedData.children = filteredChildren;

      return modifiedData;
    }
  }

  return null;

}
````

````ts
this.window.$('#selectedProduct').on('keyup', async (e: any) => {
  if (e.target.value.length > 3) {
    this.window.$('#listProduct').removeClass('d-none')

    let queryConditions: QueryConstraint[] = []
    queryConditions.push(where('name', ">=", e.target.value))
    queryConditions.push(where('name', "<=", e.target.value + '\uf8ff'))
    const q = query(collection(getFirestore(), ServiceArticles.STORAGE_ARTICLES), ...queryConditions);

    onSnapshot(q, (s) => {
      this.tempArticles = s.docs.map(at => {
        return at.data()
      })
    })

  } else {
    this.window.$('#listProduct').addClass('d-none')
  }
})

this.tempArticles.forEach(e => {
  this.window.$('#' + e.id).on('click', (e: any) => {
    console.log(e.target.value)
  })
})
````
````html
  <div class="w-100 p-0 m-0 position-absolute">
                      <input type="text" class="form-control form-control-sm " placeholder="Pesquisar o Artigo"
                             name="financialCost" id="selectedProduct">
                      <div class="position-absolute w-100 p-5 z-index-3 bg-white overflow-auto d-none"
                           style="max-height: 350px;" id="listProduct">

                        <ul id="elementClicked">
                          <li class="d-flex align-items-center p-3
                          rounded-3 border-hover border border-dashed border-gray-300 cursor-pointer mb-1 "
                              [id]="ats.id "
                              data-kt-search-element="customer" *ngFor="let ats of this.tempArticles"
                              [value]="ats|json">

                            <!--begin::Avatar-->
                            <div class="symbol symbol-20px symbol-circle me-3">
                              <span
                                class="symbol-label bg-light-warning text-warning fw-semibold">{{ ats.name.slice(0, 1) }}</span>
                            </div>

                            <div class="fw-semibold">
                              <span class="fs-6 text-gray-800 me-2">{{ ats.name}}</span>
                              <span class="badge badge-light">{{ ats.model }}</span> &nbsp;
                              <span class="badge badge-light-success">{{ ats.category_id[0] }}</span>
                            </div>

                          </li>

                        </ul>
                      </div>
                    </div>
````
