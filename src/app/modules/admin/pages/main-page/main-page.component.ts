import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { StockService } from '../../../../services/stock.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private stockService: StockService) { }

  public totalProducts: number = 0;

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: any;

  // Datos predeterminados para el gráfico
  chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Ganancias Mensuales',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000], // Datos iniciales para 2023
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  // Datos por días (solo un ejemplo)
  chartDataByDay = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{
      label: 'Ganancias Semanales',
      data: [100, 200, 100, 100, 300, 100, 100], // Datos de ejemplo por día
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  // Datos por año
  chartDataByYear = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: 'Ganancias Anuales',
      data: [0, 0, 0, 1000, 0], // Datos de ejemplo por año
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  ngOnInit() {
    // Registra los componentes necesarios de Chart.js
    Chart.register(...registerables);

    // Crea el gráfico al iniciar
    this.createChart();

    // Llama al método para obtener el total de productos
    this.getTotalProducts();
  }

  // Método para crear el gráfico
  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line', // Tipo de gráfico
        data: this.chartData, // Datos iniciales
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              enabled: true
            }
          }
        } // <- Este es el cierre que faltaba
      }); // <- Y este es el cierre que falta para terminar la llamada a `new Chart`
    }
  }


  // Método para cambiar el período del gráfico (día, mes, año)
  onPeriodChange(event: any) {
    const selectedPeriod = event.target.value;

    if (selectedPeriod === 'year') {
      this.chart.data = this.chartDataByYear;
    } else if (selectedPeriod === 'month') {
      this.chart.data = this.chartData;
    } else if (selectedPeriod === 'day') {
      this.chart.data = this.chartDataByDay;
    }

    // Actualiza el gráfico con los nuevos datos
    this.chart.update();
  }

  // Método para obtener el total de productos desde el servicio
  getTotalProducts() {
    this.stockService.getStock().subscribe((data: any) => {
      console.log(data);
      this.totalProducts = data.object.length; // Asumiendo que data.object es un array de productos
    });
  }

}