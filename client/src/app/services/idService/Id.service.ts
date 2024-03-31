import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  setId(id: string) {
    localStorage.setItem('Id', id);
  }

  getId(): string {
    return localStorage.getItem('Id') || '';
  }
}