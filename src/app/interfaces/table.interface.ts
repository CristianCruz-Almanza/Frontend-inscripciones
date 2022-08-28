export interface ColsTable {
    field:      string | string[];
    header:     string;
    style:      string;
    tooltip?:   boolean;
    isArray?:   boolean;
    isDate?:    boolean;
    isConcat?:  boolean;
    colsChild?: ColsChild[];
    isButton?:  boolean;
}

export interface ColsChild {
    field:  string;
    header: string;
}


export interface SearchFor { 
    name: string; 
    code: string; 
}

export interface Paginate {
    from:  number;
    rows:  number;
    to:    number; 
    total: number;
}
