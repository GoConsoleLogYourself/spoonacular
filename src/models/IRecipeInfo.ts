export interface IRecipeInfo {
  id: number;
  title: string;
  image: string;
  extendedIngredients: ExtendedIngredients[];
  readyInMinutes: number;
  cookingMinutes: number;
  preparationMinutes: number;
  servings: number;
  isVegiterian: boolean;
  dishTypes: string[];
}

export interface ExtendedIngredients {
  id: number;
  image: string;
  name: string;
  amount: number;
}
