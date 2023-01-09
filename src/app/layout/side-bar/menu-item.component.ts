import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-menu-item',
  template: `
    <div class="menu-item">
      <!--begin:Menu link-->
      <a class="menu-link " routerLink="{{ routerLink}}"
        routerLink="{{ routerLinkTo}}"
       routerLinkActive="active">
        <span class="menu-bullet">
          <span class="bullet bullet-dot"></span>
        </span>
        <span class="menu-title">{{ name }}</span>
      </a>
      <!--end:Menu link-->
    </div>
  `,
  styles: []
})
export class MenuItemComponent {
  @Input() name = 'Not define';
  @Input() icon = `
    <span class="menu-bullet">
      <span class="bullet bullet-dot"></span>
    </span>
  `;
  @Input() routerLink = '#'
  @Input() routerLinkTo = '#'
}
