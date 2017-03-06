/**
 * Created by 79078_000 on 2017/1/4.
 */
export class AclStorage {
  static clear(): void {
    window.localStorage.clear();
  };

  static getItem(key: string): string | null {
    return window.localStorage.getItem(key);

  };

  static key(index: number): string | null {
    return window.localStorage.key(index);
  };

  static removeItem(key: string): void {
    window.localStorage.removeItem(key);
  };

  static setItem(key: string, data: string): void {
    window.localStorage.setItem(key, data);
  };

}
