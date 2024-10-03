import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient)
  private token: string | undefined

  get isAuthenticated(): boolean {
    return !!this.token; // Transforme le token en booleen
  }

  async login(email:string, password: string){

      try{
        
        const req = this.http.post<{access_token:string}>('https://api.escuelajs.co/api/v1/auth/login', {email, password})
        const response = await lastValueFrom(req)
        this.token = `Bearer ${response.access_token}`
        console.log('success', this.token)
        
      } 
      catch (e) {
        console.error('Login failed', e)
      }
 
  }

  logout(): void {
    this.token = undefined;
  }
}
