import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import { useGetRecipesQuery } from "../../store/services/recipesService";
import Loading from "../../components/Loading/Loading";
import SideDrawer from "../../components/Drawer/Drawer";
import Card from "../../components/Card/Card";
import { Button, Pagination, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function App() {
  const [offset, setOffset] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const {
    data: recipesData,
    isLoading,
    error,
  } = useGetRecipesQuery({
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
  return (
    <main className={styles.main}>
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
      <h3 className={styles.result}>Results: {recipesData?.totalResults}</h3>
      <section className={styles.cards}>
        {isLoading ? (
          <Loading />
        ) : (
          recipesData?.results.map(recipe => (
            <Card key={recipe.id} {...recipe} />
          ))
        )}
      </section>
      <div className={styles.pagination}>
        <Pagination
          count={recipesData ? Math.ceil(recipesData?.totalResults / 10) : 1}
          page={currPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      </div>
    </main>
  );
}
export default App;
