import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean = false;

  setLoading(loading: boolean) {
    console.log(this.setLoading);
    this.loading = loading;
    console.log(this.setLoading);
  }

  getLoading(): boolean {
    console.log(this.getLoading);
    return this.loading;
  }
}
