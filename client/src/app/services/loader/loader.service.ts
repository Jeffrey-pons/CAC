import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean = false;

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
