export interface ICarts {
    carId:     number;
    userEmail: string;
    products:  Product[];
}

export interface Product {
    pid:        number;
    title:      string;
    detail:     string;
    price:      number;
    thumbnail:  string;
    images:     string[];
    categories: Category[];
}

export interface Category {
    cid:  number;
    name: string;
}