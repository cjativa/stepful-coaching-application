type GenericObject = {
  [properyKey: string]:
    | Array<GenericObject>
    | GenericObject
    | string
    | number
    | boolean;
};

export class LocalStorageService {
  public static setItem(
    key: string,
    value: GenericObject | Array<GenericObject>
  ) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : item;
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
