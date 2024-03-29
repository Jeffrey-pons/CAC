import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoaderComponent {
   constructor(public loader: LoaderService, public router: Router) {

  }
}
