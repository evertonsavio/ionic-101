import {Recipe} from './recipe.module';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: `1`,
      title: `string`,
      imageUrl: `https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-vector-stock-91602735.jpg`,
      ingredient: [`string[]`, 'asdas'],
    },
    {
      id: `2`,
      title: `string`,
      imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDqY8flpg0BMqJ0qy1ISjuLX948FJooqnWdA&usqp=CAU`,
      ingredient: [`string[]`, 'sheuhsue'],
    },
  ];

  constructor() {}

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {...this.recipes.find((res) => res.id === recipeId)};
  }
}
