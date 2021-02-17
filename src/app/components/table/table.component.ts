import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Horeca, HorecaService} from '../../services/horeca.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [HorecaService]
})
export class TableComponent {
  horeca$: Observable<Horeca[]>;
  horecaArray: Horeca[];
  filter = new FormControl('');

  page = 1;
  pageSize = 30;
  collectionSize: number;

  constructor(horecaService: HorecaService) {
    horecaService.load().subscribe((data) => {
      this.horecaArray = data;
      this.collectionSize = this.horecaArray.length;
      this.refreshHorecaList();
    });
  }

  refreshHorecaList(): void {
    this.horeca$ = of(this.filterHoreca(this.filter.value));
  }

  private filterHoreca(text: string): Horeca[] {
    let result =  this.horecaArray.filter(horeca => {
      const term = text.toLowerCase();
      return  horeca.naam.toLowerCase().includes(term)
        || horeca.sector.code.toLowerCase().includes(term)
        || horeca.sector.naam.toLowerCase().includes(term)
        || horeca.winkelgebied.naam.toLowerCase().includes(term);
    });
    this.collectionSize = result.length;
    result = result.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    return result;
  }
}
