import { Component } from '@angular/core';
import { StockService } from '../../../../services/stock.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private stockService: StockService) { }
  public totalProducts: number = 0;
  public chartOptions: ChartOptions = {
    responsive: true,
  };

  // Tipo de gráfico
  public chartType: ChartType = 'bar';

  // Etiquetas del eje X
  public chartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];

  // Datos del gráfico
  public chartData: ChartDataset[] = [
    { label: 'Ventas', data: [12, 19, 3, 5, 2, 3] }
  ];
  ngOnInit() {
    this.getTotalProducts();
  }

  getTotalProducts() {
    this.stockService.getStock().subscribe((data:any) => {
      console.log(data);
      this.totalProducts = data.object.length;
    });
  }

}
