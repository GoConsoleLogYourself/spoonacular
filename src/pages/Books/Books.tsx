import styles from "./Books.module.scss";
import { Button, Pagination, TextField } from "@mui/material";
import SideDrawer from "../../components/Drawer/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useGetBooksQuery } from "../../store/services/booksService";
import Loading from "../../components/Loading/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IBook } from "../../models/IBook";
import BookCard from "../../components/BookCard/BookCard";

const Books = () => {
  const [offset, setOffset] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const {
    data: booksData,
    error,
    isLoading,
  } = useGetBooksQuery({
    query: query,
    number: 10,
    offset: offset,
  });
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrPage(page);
    setOffset((page - 1) * 10);
  };
  useEffect(() => {
    setOffset((currPage - 1) * 10);
  }, [currPage]);
  if (isLoading) return <Loading />;
  if (error) {
    let errorMessage: string;

    if ("status" in error) {
      const fetchError = error as FetchBaseQueryError;
      errorMessage = fetchError.status
        ? `Error: ${fetchError.status}`
        : "An unknown Fetch error occurred";
    } else {
      errorMessage =
        (error as { message?: string }).message || "An unknown error occurred";
    }
    return <div>{errorMessage}</div>;
  }
  console.log(booksData?.books);
  return (
    <main className={styles.books}>
      <SideDrawer />
      <form className={styles.form}>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          color="secondary"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <Button color="secondary" variant="contained">
          <SearchIcon />
        </Button>
      </form>
      <h3 className={styles.result}>Results: {booksData?.available}</h3>
      <section className={styles.cards}>
        {booksData?.books.flatMap((bookArray: IBook[]) => {
          if (Array.isArray(bookArray) && bookArray.length > 0) {
            return bookArray.map((item: IBook) => (
              <BookCard {...item} key={item.id} />
            ));
          } else {
            return [];
          }
        })}
      </section>
      <div className={styles.pagination}>
        <Pagination
          count={booksData ? Math.ceil(booksData?.available / 10) : 1}
          page={currPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      </div>
    </main>
  );
};

export default Books;
