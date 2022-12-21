declare namespace I18n {
  export interface IObj {
    [key: string]: string;
  }

  export interface IOptions {
    [key: string]: IObj;
  }
}
