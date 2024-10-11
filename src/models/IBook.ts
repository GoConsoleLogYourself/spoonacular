export interface IBook {
  id: number;
  title: string;
  subtitle: string | undefined;
  image: string;
}

export type IBookData = IBook[];
