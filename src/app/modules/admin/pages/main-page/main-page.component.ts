import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { StockService } from '../../../../services/stock.service';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../../../services/stats.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private stockService: StockService,
    private statsService: StatsService

  ) { }

  public totalProducts: number = 0;
  public totalSales: number = 0;
  public salesByDay: any = 0;

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: any;

  // Datos predeterminados para el gráfico
  chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Ganancias Mensuales',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.totalSales], // Datos iniciales para 2023
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
      data: [this.salesByDay, 0,0,0,0,0,0], // Datos de ejemplo por día
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
      data: [0, 0, 0, this.totalSales, 0], // Datos de ejemplo por año
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

    this.getTotalStats();
    this.getStatsByDay();
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

  getStatsByDay() {
    this.statsService.getSalesByDay().subscribe((response: any) => {
      console.log("🚀 ~ HomeSellerComponent ~ this.statsService.getByDay ~ response:", response);
  
      const salesToday = response.object.today;
  
      if (typeof salesToday === 'number') {
        // Genera un arreglo con valores predeterminados usando el valor de `today`
        this.salesByDay = [salesToday, 0, 0, 0, 0, 0, 0]; // Asigna el valor de hoy al primer día, el resto son ceros
  
        // Actualiza los datos del gráfico
        this.chartDataByDay.datasets[0].data = this.salesByDay;
  
        // Si actualmente estás mostrando este gráfico, actualiza la visualización
        if (this.chart.data === this.chartDataByDay) {
          this.chart.update();
        }
      } else {
        console.error('El valor de ventas de hoy no es válido:', salesToday);
      }
    }, (error: any) => {
      console.error('Error al obtener las estadísticas por día:', error);
    });
  }
  


  getTotalStats() {
    this.statsService.getTotal().subscribe((response: any) => {
      console.log("🚀 ~ HomeSellerComponent ~ this.statsService.getTotal ~ response:", response);
      this.totalSales = response.object.total;
  
      // Actualiza el valor de la gráfica de "Ganancias Mensuales" con el valor de totalSales
      this.chartData.datasets[0].data[11] = this.totalSales;  // Asumiendo que el índice 11 corresponde a Diciembre
      this.chartDataByYear.datasets[0].data[3] = this.totalSales;  // Asumiendo que el índice 11 corresponde a Diciembre
  
      // Actualiza la gráfica con los nuevos datos
      this.chart.update();
    }, (error: any) => {
      console.error('Error al obtener el total:', error);
    });
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