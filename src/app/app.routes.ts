import { Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen-component/start-screen-component';


export const routes: Routes = [
    {path: '', component: StartScreenComponent, pathMatch: 'full'}
];
