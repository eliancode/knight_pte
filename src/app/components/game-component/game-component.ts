import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import { SharedDataService } from '../../services/shared-data-service';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './game-component.html',
  styleUrl: './game-component.sass',
  standalone: true,
})
export class GameComponent implements OnInit, OnDestroy {
  letter!: string;
  direction!: string;
  score = 0;
  elementFormControl = new FormControl('', [Validators.required, this.elementValidator()]);
  scoreFeedback = '';
  feedbackClass = '';
  sharedData = inject(SharedDataService);

  private sub!: Subscription;
  private lastPosition: Position | null = null;

  private pte_representation: Map<Position, PTE_Element> = new Map<Position, PTE_Element>([
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

  ngOnInit() {
    this.startGameLoop();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sharedData.addUser(this.sharedData.getCurrentUsername()!, this.score);
    this.sharedData.resetCurrentUsername();
    this.sharedData.resetCurrentUser();
  }

  formFilled(): void {
    if (this.elementFormControl.invalid) {
      this.elementFormControl.markAsTouched();
      return;
    }
    this.$userAnswer.next(this.elementFormControl.value!);
    this.elementFormControl.reset('', { emitEvent: false });
    this.elementFormControl.setErrors(null);
    this.elementFormControl.markAsPristine();
    this.elementFormControl.markAsUntouched();
  }

  private startGameLoop(): void {
    const randomElement: { element: PTE_Element; position: Position } = (() => {
      const entries = Array.from(this.pte_representation.entries());
      const randomIndex = Math.floor(Math.random() * entries.length);
      const [position, element] = entries[randomIndex];
      return { element, position };
    })();
    const position = this.lastPosition ?? randomElement.position;

    const move: DestinationElement = this.getMove(position);

    const solution: string = move.letter;

    this.letter = this.getLetterByPosition(position)!;

    this.sub = this.$userAnswer.subscribe((answer: string) => {
      if (answer.toLowerCase() === solution.toLowerCase()) {
        this.score += 15;
        this.scoreFeedback = '+15';
        this.feedbackClass = 'positive';
        this.lastPosition = this.getPositionByLetter(solution);
      } else {
        this.score = Math.max(0, this.score - 5);
        this.scoreFeedback = '-5';
        this.feedbackClass = 'negative';
      }

      setTimeout(() => {
        this.scoreFeedback = '';
        this.feedbackClass = '';
      }, 1000);

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

    const legalMoves: { pos: Position; letter: string }[] = [];

    this.pte_representation.forEach((pteElement, ptePosition) => {
      for (const move of knightMoves) {
        if (ptePosition.x === move.x && ptePosition.y === move.y) {
          legalMoves.push({ pos: ptePosition, letter: pteElement.letter });
        }
      }
    });

    const selected = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    const dx = selected.pos.x - startingPosition.x;
    const dy = selected.pos.y - startingPosition.y;
    this.setKnightMoveDirection(dx, dy);

    return { position: selected.pos, letter: selected.letter };
  }

  private setKnightMoveDirection(dx: number, dy: number): void {
    let arrows = '';

    // '\u2192' is a rightwards arrow
    // '\u2190' is a leftwards arrow
    // '\u2191' is an upwards arrow
    // '\u2193' is a downwards arrow
    const horizontalArrow = dx < 0 ? '\u2190' : '\u2192';
    const verticalArrow = dy < 0 ? '\u2191' : '\u2193';

    if (Math.abs(dx) > Math.abs(dy)) {
      arrows = horizontalArrow.repeat(2) + verticalArrow;
    } else {
      arrows = verticalArrow.repeat(2) + horizontalArrow;
    }

    this.direction = arrows;
  }
  private elementValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const values = Array.from(this.pte_representation.values());
      const valid = values.some(
        item =>
          typeof item.letter === 'string' && item.letter.toLowerCase() === value.toLowerCase(),
      );
      return valid ? null : { element: true };
    };
  }

  private getPositionByLetter(letter: string): Position | null {
    for (const [position, element] of this.pte_representation) {
      if (element.letter === letter) {
        return position;
      }
    }
    return null;
  }

  private getLetterByPosition(position: Position): string | null {
    const element = this.pte_representation.get(position);
    return element ? element.letter : null;
  }
}

// the new element doesnt change if entered correctly
// issue: getcurrentusername and getcurrentuser is reset so the placement can't be shown on the game over screen
