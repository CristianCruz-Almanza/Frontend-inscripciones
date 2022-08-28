export interface GetAllFuncionaryPaginate {
    current_page:   number;
    data:           Funcionari[];
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

export interface Funcionari {
    id:      number;
    ci:      number;
    Nombre:  string;
    Paterno: string;
    Materno: string;
    NombreCompleto: string;
    Cargo:   string;
    Unidad:  string;
    options?:      Options[];
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}

export interface Options {
    label: string,
    icon:  string, 
    class: string,
    tooltip?: string,
    eventClick?: Function;
}


export interface formFuncionari {
    ci: string,
    name: string,
    paternal: string,
    maternal: string,
    cargo: string,
    unidad: string,
}
