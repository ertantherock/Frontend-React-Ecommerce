export interface Products {
    status: boolean;
    result: Result[];
}

export interface Result {
    pid:        number;
    title:      string;
    detail:     string;
    price:      string;
    thumbnail:  string;
    images:     string[];
    categories: Category[];
}

export interface Category {
    cid:  number;
    name: string;
}