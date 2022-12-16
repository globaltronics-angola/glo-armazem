>Munzambi Ntemo Miguel 
>
> Pode voltar a inserir na linha 240 caso for necessario 
```html
<div class="col-12 col-sm-6  col-lg-4 w-100 pt-2 justify-content-end bg-light-danger d-none">

        <div class="col-6 mb-4 float-end {{ listOption[3].isselected?'': 'd-none'}}">
          <div class="d-flex flex-column fv-row fv-plugins-icon-container">
            <!--begin::Label-->
            <label class="d-flex align-items-center fs-6 mb-2 mt-2">
              <span class="">Armazem</span>
            </label>
            <div class="input-group input-group-sm input-group-solid flex-nowrap">
              <!--end::Label-->
              <div class="overflow-hidden flex-grow-1">
                <select class="form-select form-select-sm selector rounded-end-0" data-control="select2"
                        data-allow-clear="true"
                        data-placeholder="Selecciona o modelo" id="selectArmazemRequisition">
                  <option></option>
                  <option [value]="pro.id" *ngFor="let pro of listArmazem">
                    {{ pro.name }}
                  </option>
                </select>
              </div>

              <button class="input-group-text" id="new_type_requisition_basic_button"><i class="fa fa-plus"></i>
                &nbsp;
                Novo
              </button>
            </div>
            <!--end::Label-->

            <div class="fv-plugins-message-container invalid-feedback"></div>
            <div class="fv-plugins-message-container text-muted small">
              Selecione o armazam destinatario ...
            </div>
            <!--  <span class="mt-3 text-muted font-italic ml-5">Selecciona o produto para configurar o codigo de barra</span> -->
          </div>
        </div>
      </div>
