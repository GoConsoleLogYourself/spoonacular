import { FC } from "react";
import styles from "./Card.module.scss";
import { IRecipe } from "../../models/IRecipe";
import { useNavigate } from "react-router-dom";

const Card: FC<IRecipe> = ({ title, image, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipes/${id}`);
  };
  return (
    <div onClick={handleClick} className={styles.card}>
      <img className={styles.cardImg} src={image} alt={title} />
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default Card;
