interface IAuthor {
  id: number;
  name: string;
}
export interface IBookInfo {
  id: number;
  title: string;
  image: string;
  authors: IAuthor[];
  description: string;
  number_of_pages: number;
  publish_date: number;
  rating: { average: number };
}
