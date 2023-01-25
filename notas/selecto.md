> Munzambi Ntemo Miguel
> Os components no angular são identificados no selector
>
>> veja o codigo abaixo
>
>inserido o component abaixo
>><app-side-bar></app-side-bar>

````ts
import {serverTimestamp } from 'firebase/firestore';

ref.update({ updatedAt: serverTimestamp() })

import { Timestamp } from '@firebase/firestore-types';

var now: Timestamp = Timestamp.now()


var goQuery = docRef.where("name", "==", name)
  .where("valid", "==", true)
  .orderBy(firebase.firestore.FieldPath.documentId())
  .startAfter("id0070")
  .limit(LIMIT);

````

