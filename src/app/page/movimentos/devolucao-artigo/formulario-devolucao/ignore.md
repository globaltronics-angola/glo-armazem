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
````
