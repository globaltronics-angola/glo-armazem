````ts

private
getQuerysListing(keyDisplay
:
string = ""
)
{


  let queryConditions: QueryConstraint[] = []

  queryConditions.push(orderBy(this.fielderOrder, this.typeOrder))

  if (keyDisplay) {
    queryConditions.push(startAt(keyDisplay))
  }

  queryConditions.push(limit(this.offset + 1))

  if (this.fieldSearch && this.fieldContextSearch) {
    queryConditions.push(where(this.fieldSearch, ">=", this.fieldContextSearch))
    queryConditions.push(where(this.fieldSearch, "<=", this.fieldContextSearch + '\uf8ff'))
  }

  const q = query(this.reference, ...queryConditions);
  return getDocs(q)
}

onSnapshot(q, (s) => {
  this.list(s.docs)
})
````
