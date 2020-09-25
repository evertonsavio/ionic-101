import {Recipe} from './recipe.module';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [
    {
      id: `string`,
      title: `string`,
      imageUrl: `https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-vector-stock-91602735.jpg`,
      ingredient: [`string[]`],
    },
    {
      id: `string`,
      title: `string`,
      imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDqY8flpg0BMqJ0qy1ISjuLX948FJooqnWdA&usqp=CAU`,
      ingredient: [`string[]`],
    },
  ];
  constructor() {}

  ngOnInit() {}
}
