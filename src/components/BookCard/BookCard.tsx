import { useNavigate } from "react-router-dom";
import styles from "./BookCard.module.scss";
import { FC } from "react";
import { IBook } from "../../models/IBook";

const BookCard: FC<IBook> = ({ title, image, id }) => {
  {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/books/${id}`);
    };
    return (
      <div onClick={handleClick} className={styles.card}>
        <img className={styles.cardImg} src={image} alt={title} />
        <div className={styles.titleBody}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>
    );
  }
};
export default BookCard;
