import { Injectable } from '@angular/core';
import { StorageKeyDoesNotExists } from '../errors/storage-key-does-not-exists';
import { Assessor } from '../models/assessor';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public storeData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * @throws StorageKeyDoesNotExists
   * @param key
   */
  public retrieveData(key: string): string {
    const retrievedItem = localStorage.getItem(key);

    if (retrievedItem === null) {
      throw new StorageKeyDoesNotExists();
    }

    return retrievedItem;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public storeJsonData(key: string, value: Object): void {
    this.storeData(key, JSON.stringify(value));
  }

  public retrieveJsonData(key: string): any {
    return JSON.parse(this.retrieveData(key) || '[]');
  }
}
