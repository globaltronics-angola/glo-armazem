import {Component} from '@angular/core';

@Component({
  selector: 'app-searching',
  template: `
    <div class="d-flex flex-column fv-row fv-plugins-icon-container">
      <label class="d-flex align-items-center fs-6 fw-bold">
        <span class="required">Armazém</span>
      </label>
      <div class="d-flex align-items-center position-relative ">
        <span class="svg-icon svg-icon-1 position-absolute ms-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1"
                  transform="rotate(45 17.0365 15.1223)" fill="currentColor"/>
            <path
              d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
              fill="currentColor"/>
          </svg>
        </span>
        <input type="text" data-kt-customer-table-filter="search" name="docRefAt"
               class="form-control form-control-solid w-100 ps-15"
               placeholder="Digite a referencia do documento"/>
      </div>
      <span class="fs-7 text-gray-600 mx-5">Tecla &lt;<span class="fw-bold">ENTER</span>&gt; para realizar a
        pesquisa</span>
    </div>
  `,
  styles: []
})
export class SearchingComponent {

}
