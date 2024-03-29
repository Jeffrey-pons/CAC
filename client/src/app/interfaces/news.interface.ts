export interface News {
    _id: string;
    title: string;
    image: string[];
    month: string;
    description: string;
    type: string;
    rencontretext: string;
    soutien :string;
}

export interface NewsResponse {
    newsData: News[];
}