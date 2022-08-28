export interface Auth {
  ok:    boolean;
  token: string;
  user:  User;
  menu:  Menu[];
}

export interface Menu {
  title:    string;
  url?:     string;
  icon:     string;
  subMenu?: Menu[];
}

export interface User {
  id:        number;
  ci:        number;
  name:      string;
  paternal:  string;
  maternal:  string;
  cellphone: number;
  email:     string;
  password:     string;
  status:    boolean;
}



export interface FormLogin {
    email: string;
    password: string;
}
