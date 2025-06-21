import { Routes } from '@angular/router';
import { StartGameComponent } from './components/start-game-component/start-game-component';
import { GameContainerComponent } from './components/game-container-component/game-container-component';

export const routes: Routes = [
    {path: '', component: StartGameComponent, pathMatch: 'full'},
    {path: 'game', component: GameContainerComponent}
];
