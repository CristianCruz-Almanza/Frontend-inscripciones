export interface GetSoliPaginated {
  current_page:   number;
  data:           Regsoli[];
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

export interface Regsoli {
  id?:              number;
  nameperson:       number;
  constitution:     string;
  nameproject:      string;
  yearexperience:   number;
  investment:       number;
  timeproposal:     number;
  financing:        number;
  id_user:          number;
  status:           number;
}

export interface Link {
  url:    null | string;
  label:  string;
  active: boolean;
}
