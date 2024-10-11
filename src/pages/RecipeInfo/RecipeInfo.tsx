import styles from "./RecipeInfo.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "../../components/Drawer/Drawer";
import { useGetRecipeInfoQuery } from "../../store/services/recipesService";
import Loading from "../../components/Loading/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button } from "@mui/material";

const RecipeInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: RecipeInfo,
    error,
    isLoading,
  } = useGetRecipeInfoQuery(Number(location.pathname.split("/")[2]));
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
          <h1>{RecipeInfo?.title}</h1>
          <img src={RecipeInfo?.image} alt={RecipeInfo?.title} />
        </div>
        <div className={styles.baseInfo}>
          <h2>Base Info</h2>
          <p>Servings: {RecipeInfo?.servings}</p>
          <p>Is Vegiterian: {RecipeInfo?.isVegiterian ? "Yes" : "No"}</p>
          <p>
            {RecipeInfo?.cookingMinutes !== null &&
              `Cooking Minutes: ${RecipeInfo?.cookingMinutes}`}
          </p>
          <p>
            {RecipeInfo?.preparationMinutes !== null &&
              `Preparation Minutes: ${RecipeInfo?.preparationMinutes}`}
          </p>
          <p>
            {RecipeInfo?.readyInMinutes !== null &&
              `Ready in Minutes: ${RecipeInfo?.readyInMinutes}`}
          </p>
        </div>
        <div className={styles.extendedIngredients}>
          <h3>Extended Ingredients</h3>
          {RecipeInfo?.extendedIngredients.map(ingredient => (
            <p key={ingredient.id}>
              {ingredient.name}: {ingredient.amount} Tbsp
            </p>
          ))}
        </div>
      </section>
    </main>
  );
};

export default RecipeInfo;
