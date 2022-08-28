export interface GetUserPaginate {
  current_page:   number;
  data:           Users[];
  first_page_url: string;
  from:           number;
  last_page:      number;
  last_page_url:  string;
  links:          Link[];
  next_page_url:  null;
  path:           string;
  per_page:       number;
  prev_page_url:  null;
  to:             number;
  total:          number;
}

export interface Users {
  id?:        number;
  ci:        number;
  name:      string;
  paternal:  string;
  maternal?:  string;
  cellphone: string;
  email:     string;
  password?: string;
  status:    number;
}

export interface Link {
  url:    null | string;
  label:  string;
  active: boolean;
}
