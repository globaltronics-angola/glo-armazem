import { isDevMode, NgModule } from '@angular/core';
// @ts-ignore
import { ORIGIN as FUNCTIONS_ORIGIN, NEW_ORIGIN_BEHAVIOR } from '@angular/fire/compat/functions';

@NgModule({
  // ... Existing configuration
  providers: [
    // ... Existing Providers
    { provide: NEW_ORIGIN_BEHAVIOR, useValue: true },
    { provide: FUNCTIONS_ORIGIN, useFactory: () => isDevMode() ? undefined : location.origin },
  ]
})
export class AppModule { }
