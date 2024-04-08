export interface News {
    _id: string;
    title: string;
    image: string[];
    month: string;
    description: string;
    type: string;
    rencontretext: string[];
    event: string[];
    soutien :string[];
    editMode?: boolean;
}

export interface NewsResponse {
    newsData: News[];
}
