import styles from "./BookInfo.module.scss";
import { useGetBookInfoQuery } from "../../store/services/booksService";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SideDrawer from "../../components/Drawer/Drawer";
import { Button } from "@mui/material";

const BookInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: bookInfo,
    error,
    isLoading,
  } = useGetBookInfoQuery(Number(location.pathname.split("/")[2]));
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
    <main className={styles.recipeInfo}>
      <SideDrawer />
      <div className={styles.goBackBtn}>
        <Button onClick={() => navigate(-1)}>{"<Назад"}</Button>
      </div>
      <section className={styles.information}>
        <div className={styles.titleAndImg}>
          <h1>{bookInfo?.title}</h1>
          <img src={bookInfo?.image} alt={bookInfo?.title} />
        </div>
        <div className={styles.baseInfo}>
          <div
            className={bookInfo?.description ? styles.description : styles.none}
          >
            <h2>Description</h2>
            <p>{bookInfo?.description}</p>
          </div>
          <h2>Base Info</h2>
          <p>Author: {bookInfo?.authors.map(author => author.name)}</p>
          <p>Publish Date: {bookInfo?.publish_date}</p>
          <p>
            Rating:{" "}
            {bookInfo?.rating?.average
              ? bookInfo?.rating?.average.toFixed(3)
              : 0}
          </p>
          <p>Number of Pages: {bookInfo?.number_of_pages}</p>
        </div>
      </section>
    </main>
  );
};

export default BookInfo;
