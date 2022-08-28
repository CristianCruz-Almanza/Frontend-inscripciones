export interface GetAllObservations {
    current_page:   number;
    data:           Observation[];
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

export interface Observation {
    id_observation: number;
    Observacion:    string;
    Estado:         boolean;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}

export interface formObservation {
    observation: string,
    date: Date,
    status: string,
    id_actuado: number,
}