import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SharedDataService } from '../../shared-data-service';

interface Position {
  x: number;
  y: number;
}

interface PTE_Element {
  letter: string;
}

interface DestinationElement {
  letter: string;
  position: Position;
}

@Component({
  selector: 'app-game-component',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './game-component.html',
  styleUrl: './game-component.sass',
})
export class GameComponent {
  letter!: string;
  direction!: string;
  score: number = 0;
  elementFormControl = new FormControl('', [
    Validators.required,
    this.elementValidator(),
  ]);

  private sub!: Subscription;

  private pte_representation: Map<Position, PTE_Element> = new Map<
    Position,
    PTE_Element
  >([
    [{ x: 1, y: 1 }, { letter: 'H' }],
    [{ x: 18, y: 1 }, { letter: 'He' }],
    [{ x: 1, y: 2 }, { letter: 'Li' }],
    [{ x: 2, y: 2 }, { letter: 'Be' }],
    [{ x: 13, y: 2 }, { letter: 'B' }],
    [{ x: 14, y: 2 }, { letter: 'C' }],
    [{ x: 15, y: 2 }, { letter: 'N' }],
    [{ x: 16, y: 2 }, { letter: 'O' }],
    [{ x: 17, y: 2 }, { letter: 'F' }],
    [{ x: 18, y: 2 }, { letter: 'Ne' }],
    [{ x: 1, y: 3 }, { letter: 'Na' }],
    [{ x: 2, y: 3 }, { letter: 'Mg' }],
    [{ x: 13, y: 3 }, { letter: 'Al' }],
    [{ x: 14, y: 3 }, { letter: 'Si' }],
    [{ x: 15, y: 3 }, { letter: 'P' }],
    [{ x: 16, y: 3 }, { letter: 'S' }],
    [{ x: 17, y: 3 }, { letter: 'Cl' }],
    [{ x: 18, y: 3 }, { letter: 'Ar' }],
    [{ x: 1, y: 4 }, { letter: 'K' }],
    [{ x: 2, y: 4 }, { letter: 'Ca' }],
    [{ x: 3, y: 4 }, { letter: 'Sc' }],
    [{ x: 4, y: 4 }, { letter: 'Ti' }],
    [{ x: 5, y: 4 }, { letter: 'V' }],
    [{ x: 6, y: 4 }, { letter: 'Cr' }],
    [{ x: 7, y: 4 }, { letter: 'Mn' }],
    [{ x: 8, y: 4 }, { letter: 'Fe' }],
    [{ x: 9, y: 4 }, { letter: 'Co' }],
    [{ x: 10, y: 4 }, { letter: 'Ni' }],
    [{ x: 11, y: 4 }, { letter: 'Cu' }],
    [{ x: 12, y: 4 }, { letter: 'Zn' }],
    [{ x: 13, y: 4 }, { letter: 'Ga' }],
    [{ x: 14, y: 4 }, { letter: 'Ge' }],
    [{ x: 15, y: 4 }, { letter: 'As' }],
    [{ x: 16, y: 4 }, { letter: 'Se' }],
    [{ x: 17, y: 4 }, { letter: 'Br' }],
    [{ x: 18, y: 4 }, { letter: 'Kr' }],
    [{ x: 1, y: 5 }, { letter: 'Rb' }],
    [{ x: 2, y: 5 }, { letter: 'Sr' }],
    [{ x: 3, y: 5 }, { letter: 'Y' }],
    [{ x: 4, y: 5 }, { letter: 'Zr' }],
    [{ x: 5, y: 5 }, { letter: 'Nb' }],
    [{ x: 6, y: 5 }, { letter: 'Mo' }],
    [{ x: 7, y: 5 }, { letter: 'Tc' }],
    [{ x: 8, y: 5 }, { letter: 'Ru' }],
    [{ x: 9, y: 5 }, { letter: 'Rh' }],
    [{ x: 10, y: 5 }, { letter: 'Pd' }],
    [{ x: 11, y: 5 }, { letter: 'Ag' }],
    [{ x: 12, y: 5 }, { letter: 'Cd' }],
    [{ x: 13, y: 5 }, { letter: 'In' }],
    [{ x: 14, y: 5 }, { letter: 'Sn' }],
    [{ x: 15, y: 5 }, { letter: 'Sb' }],
    [{ x: 16, y: 5 }, { letter: 'Te' }],
    [{ x: 17, y: 5 }, { letter: 'I' }],
    [{ x: 18, y: 5 }, { letter: 'Xe' }],
    [{ x: 1, y: 6 }, { letter: 'Cs' }],
    [{ x: 2, y: 6 }, { letter: 'Ba' }],
    [{ x: 3, y: 6 }, { letter: 'La' }],
    [{ x: 4, y: 6 }, { letter: 'Hf' }],
    [{ x: 5, y: 6 }, { letter: 'Ta' }],
    [{ x: 6, y: 6 }, { letter: 'W' }],
    [{ x: 7, y: 6 }, { letter: 'Re' }],
    [{ x: 8, y: 6 }, { letter: 'Os' }],
    [{ x: 9, y: 6 }, { letter: 'Ir' }],
    [{ x: 10, y: 6 }, { letter: 'Pt' }],
    [{ x: 11, y: 6 }, { letter: 'Au' }],
    [{ x: 12, y: 6 }, { letter: 'Hg' }],
    [{ x: 13, y: 6 }, { letter: 'Tl' }],
    [{ x: 14, y: 6 }, { letter: 'Pb' }],
    [{ x: 15, y: 6 }, { letter: 'Bi' }],
    [{ x: 16, y: 6 }, { letter: 'Po' }],
    [{ x: 17, y: 6 }, { letter: 'At' }],
    [{ x: 18, y: 6 }, { letter: 'Rn' }],
    [{ x: 1, y: 7 }, { letter: 'Fr' }],
    [{ x: 2, y: 7 }, { letter: 'Ra' }],
    [{ x: 3, y: 7 }, { letter: 'Ac' }],
    [{ x: 4, y: 7 }, { letter: 'Rf' }],
    [{ x: 5, y: 7 }, { letter: 'Db' }],
    [{ x: 6, y: 7 }, { letter: 'Sg' }],
    [{ x: 7, y: 7 }, { letter: 'Bh' }],
    [{ x: 8, y: 7 }, { letter: 'Hs' }],
    [{ x: 9, y: 7 }, { letter: 'Mt' }],
    [{ x: 10, y: 7 }, { letter: 'Ds' }],
    [{ x: 11, y: 7 }, { letter: 'Rg' }],
    [{ x: 12, y: 7 }, { letter: 'Cn' }],
    [{ x: 13, y: 7 }, { letter: 'Nh' }],
    [{ x: 14, y: 7 }, { letter: 'Fl' }],
    [{ x: 15, y: 7 }, { letter: 'Mc' }],
    [{ x: 16, y: 7 }, { letter: 'Lv' }],
    [{ x: 17, y: 7 }, { letter: 'Ts' }],
    [{ x: 18, y: 7 }, { letter: 'Og' }],
  ]);

  private $userAnswer = new Subject<string>();

  constructor(private sharedData: SharedDataService) {}

  ngOnInit() {
    this.startGameLoop();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sharedData.addUser(
      this.sharedData.getCurrentUser()!.username,
      this.score
    );
  }

  formFilled(): void {
    if (this.elementFormControl.invalid) {
      return;
    }
    this.$userAnswer.next(this.elementFormControl.value!);
    this.elementFormControl.reset();
  }

  private startGameLoop(): void {
    const keys = Array.from(this.pte_representation.entries());
    const randomElement = keys[Math.floor(Math.random() * keys.length)];

    const move: DestinationElement = this.getMove(randomElement[0]);

    const solution: string = move.letter;
    console.log('Solution: ' + solution);

    this.letter = randomElement[1].letter;

    this.sub = this.$userAnswer.subscribe((answer: string) => {
      if (answer === solution) {
        this.score = this.score + 15;
      }
      this.sub.unsubscribe();
      this.startGameLoop();
    });
  }

  private getMove(startingPosition: Position): DestinationElement {
    const knightMoves: Position[] = [
      { x: startingPosition.x - 1, y: startingPosition.y + 2 },
      { x: startingPosition.x + 1, y: startingPosition.y + 2 },
      { x: startingPosition.x + 2, y: startingPosition.y + 1 },
      { x: startingPosition.x + 2, y: startingPosition.y - 1 },
      { x: startingPosition.x + 1, y: startingPosition.y - 2 },
      { x: startingPosition.x - 1, y: startingPosition.y - 2 },
      { x: startingPosition.x - 2, y: startingPosition.y - 1 },
      { x: startingPosition.x - 2, y: startingPosition.y + 1 },
    ];
    const legalMoves: Position[] = [];
    let letter: string;
    this.pte_representation.forEach((pteElement, ptePosition) => {
      knightMoves.forEach((startPosition) => {
        if (
          ptePosition.x === startPosition.x &&
          ptePosition.y === startPosition.y
        ) {
          legalMoves.push(startPosition);
          letter = pteElement.letter;
        }
      });
    });
    const move = legalMoves[Math.floor(Math.random() * legalMoves.length)];

    const dx = move.x - startingPosition.x;
    const dy = move.y - startingPosition.y;
    this.setKnightMoveDirection(dx, dy);
    return { letter: letter!, position: move };
  }
  private setKnightMoveDirection(dx: number, dy: number): void {
    // TODO
  }
  private elementValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const values = Array.from(this.pte_representation.values());
      const valid = values.some(
        (item) =>
          typeof item.letter === 'string' &&
          item.letter.toLowerCase() === value.toLowerCase()
      );
      return valid ? null : { element: true };
    };
  }
}
