import { Routes } from '@angular/router';
import { StartGameComponent } from './components/start-game-component/start-game-component';


export const routes: Routes = [
    {path: '', component: StartGameComponent, pathMatch: 'full'},
];
