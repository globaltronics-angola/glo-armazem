

```html

<form id="kt_modal_new_target_form" class="form fv-plugins-bootstrap5 fv-plugins-framework">
    <div class="row">
      <div class="row">
        <div class="col-sm-9">
          <div class="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
            <!--begin::Label-->
            <label class="d-flex align-items-center fs-6 fw-bold mb-2">
              <span class="required">Designação</span>
            </label>
            <!--end::Label-->
            <input type="text" [(ngModel)]="article.Article.name" name="description"
              class="form-control form-control-sm" placeholder="insira a descrição longa">
            <div class="fv-plugins-message-container invalid-feedback"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
            <!--begin::Label-->
            <label class="d-flex align-items-center fs-6 fw-bold mb-2">
              <span class="">Modelo</span>
            </label>
            <!--end::Label-->
            <div class="input-group input-group-sm flex-nowrap">
              <select class="form-select form-select-sm rounded-end-0" id="model" data-control="select2"
                data-placeholder="Select an option">
                <option></option>
                <option *ngFor="let model of listModel| async" [value]="model.id">
                  {{ model.name }}
                </option>
              </select>
              <button class="input-group-text btn-primary" id="new_modelos_basic_button">
                <i class="bi bi-plus fs-4"></i> Nova
              </button>
            </div>
            <div class="fv-plugins-message-container invalid-feedback"></div>
          </div>
        </div>
        <div class="col-12 col-sm-8">
          <div class="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
            <!--begin::Label-->
            <label class="d-flex align-items-center fs-6 fw-bold mb-2">
              <span class="">Categorias</span>
            </label>
            <!--end::Label-->

            <div class="input-group input-group-sm flex-nowrap">
              <select class="form-select form-select-sm rounded-end-0" id="categories" data-control="select2" multiple
                data-placeholder="Select an option">
                <option></option>
                <option [value]="cate.id" *ngFor="let cate of listCategories | async">
                  {{ cate.name }}
                </option>
              </select>

              <button class="input-group-text btn-primary" id="new_categorias_basic_button">
                <i class="bi bi-plus fs-4"></i> Nova
              </button>
            </div>

            <div class="fv-plugins-message-container invalid-feedback"></div>
          </div>
        </div>

      </div>
      <div class="row">


        <div class="col-sm-12">
          <div class="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
            <!--begin::Label-->
            <label class="d-flex align-items-center fs-6 fw-bold mb-2">
              <span class="required">Ficha técnica</span>
            </label>
            <!--end::Label-->
            <textarea type="text" class="form-control form-control-sm h-100px" rows="10"
              placeholder="Enter Target Title" [(ngModel)]="article.Article.details" name="datasheet"></textarea>
            <div class="fv-plugins-message-container invalid-feedback"></div>
          </div>

        </div>
      </div>
    </div>
    <div class="col-12 mt-2 mb-4">
      <div class="input-group text-right justify-content-end">
        <button type="button" class="btn btn-sm btn-primary mr-2" (click)="save()">
          Guardar a informação
        </button>
      </div>
    </div>
  </form>
