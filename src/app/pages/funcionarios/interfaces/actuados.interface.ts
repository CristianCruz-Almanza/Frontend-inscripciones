export interface GetAllActuados {
    current_page:   number;
    data:           Actuado[];
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

export interface Actuado {
    id_actuado:     number;
    deUnidad:       string;
    aUnidad:        string;
    fechaEmision:   Date;
    fechaRecepcion: Date;
    Asunto:         string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}

export interface formActuado {
    origin_unit: string,
    destiny_unit: string,
    date_emission: string,
    date_reception: string,
    affair: string,
    id_functionary: number,
}