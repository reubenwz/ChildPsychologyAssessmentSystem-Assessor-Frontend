import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AdminUser } from '../models/admin-user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminStateService {
  private readonly tokenKeyName = 'USER_TOKEN';
  private readonly userKeyName = 'USER_DATA';
  public readonly loggedInUserStateChange$: Subject<boolean> =
    new Subject<boolean>();
  public readonly loggedInUser$: BehaviorSubject<AdminUser | null> =
    new BehaviorSubject<AdminUser | null>(null);

  constructor(private storageService: StorageService) {}

  public hasToken(): Observable<boolean> {
    return this.getToken().pipe(
      first(),
      map<string | null, boolean>((token) => {
        return token !== null && token !== '';
      })
    );
  }

  public hasNoToken(): Observable<boolean> {
    return this.getToken().pipe(
      first(),
      map<string | null, boolean>((token) => {
        return token === null || token === '';
      })
    );
  }

  public setToken(token: string): void {
    this.storageService.storeData(this.tokenKeyName, token);
  }

  public clearToken(): void {
    this.storageService.removeData(this.tokenKeyName);
  }

  /**
   * Retrieve the authentication token
   *
   * @private
   */
  public getToken(): Observable<string | null> {
    return of(this.storageService.retrieveData(this.tokenKeyName));
  }

  public storeUserData(admin: AdminUser): void {
    this.storageService.storeJsonData<AdminUser>(this.userKeyName, admin);
    this.loggedInUser$.next(admin);
    this.loggedInUserStateChange$.next(true);
  }

  public retrieveUserData(): AdminUser {
    const adminUser = this.storageService.retrieveJsonData<AdminUser>(
      this.userKeyName
    );
    if (adminUser && adminUser.adminId) {
      this.loggedInUser$.next(adminUser);
    } else {
      this.loggedInUser$.next(null);
    }

    return adminUser;
  }

  public clearUserData(): void {
    this.storageService.removeData(this.userKeyName);
    this.loggedInUser$.next(null);
    this.loggedInUserStateChange$.next(true);
  }
}
