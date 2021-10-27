import { RecipesService } from './../recipes.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

loeadedRecipe: Recipe;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if (!paramMap.has('recipeId')){
        //redirect
        this.router.navigate(['/recipes'])
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loeadedRecipe = this.recipesService.getRecipe(recipeId);
    })
  }

  onDeleteRecipe(){
  this.alertCtrl.create({header: 'Are you sure?', message: 'Do you really want to delete the recipe?', buttons: [{
    text: 'Cancel',
    role: 'cancel'
  },
  {
    text: 'Delete',
    handler: () =>{
    this.recipesService.deleteRecipe(this.loeadedRecipe.id);
    this.router.navigate(['/recipes'])
    }
  }
]}).then(alertEl =>{
  alertEl.present();
})
  }

}
