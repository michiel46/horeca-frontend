import {Component, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Horeca, HorecaService} from '../../services/horeca.service';

let HORECA: Horeca[] = [];

function search(text: string): Horeca[] {
  return HORECA.filter(horeca => {
    const term = text.toLowerCase();
    return  horeca.naam.toLowerCase().includes(term)
      || horeca.sector.code.toLowerCase().includes(term)
      || horeca.sector.naam.toLowerCase().includes(term)
      || horeca.winkelgebied.naam.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [DecimalPipe, HorecaService]
})
export class TableComponent {
  horeca$: Observable<Horeca[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe, horecaService: HorecaService) {
    horecaService.load().subscribe((data) => {
      HORECA = data;
      this.horeca$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => search(text))
      );
    });
  }
}
