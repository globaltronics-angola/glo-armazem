
>Munzambi Miguel
```ts
listDelete.forEach((dataShit: any) => {

    dataShit.movimentoId = resp.id
    dataShit.status = ServiceUtil.VALUE_AT_STATUS_ACTIVE

    this.store.createForceMyId(ServiceUtil.STORAGE_ITEM_MOVIMENTO, dataShit).then(() => {
      (<any>window).sentMessageSuccess.init('Foi inserido com sucesso obrigado!')
    }, err => {

    })
});
