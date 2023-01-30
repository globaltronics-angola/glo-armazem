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
