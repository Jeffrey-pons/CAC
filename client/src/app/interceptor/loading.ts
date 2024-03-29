import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    public loadingService: LoaderService
  ) {}

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    this.loadingService.setLoading(true);


    return next.handle(request).pipe(
      finalize(() => {
          this.loadingService.setLoading(false);
      })
    );
  }
}
