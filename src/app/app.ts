import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'api-consumer-system';
  
  // Datos del formulario
  personalInfo = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthDate: { day: '', month: '', year: '' },
    address: ''
  };

  currentStep = 1;
  apiData: any = {};
  loading = false;

  constructor(private apiService: ApiService) {}

  nextStep() {
    if (this.currentStep === 1 && this.isFormValid()) {
      this.currentStep = 2;
      this.loadAPIData();
    }
  }

  isFormValid(): boolean {
    return !!(
      this.personalInfo.firstName &&
      this.personalInfo.lastName &&
      this.personalInfo.phone &&
      this.personalInfo.email &&
      this.personalInfo.birthDate.day &&
      this.personalInfo.birthDate.month &&
      this.personalInfo.birthDate.year &&
      this.personalInfo.address
    );
  }

  async loadAPIData() {
    this.loading = true;
    try {
      this.apiData = await this.apiService.getAllAPIData();
    } catch (error) {
      console.error('Error loading API data:', error);
    } finally {
      this.loading = false;
    }
  }

  getDaysInMonth(): number[] {
    return Array.from({length: 31}, (_, i) => i + 1);
  }

  getMonths(): {value: string, name: string}[] {
    return [
      {value: '1', name: 'Ene'}, {value: '2', name: 'Feb'}, {value: '3', name: 'Mar'},
      {value: '4', name: 'Abr'}, {value: '5', name: 'May'}, {value: '6', name: 'Jun'},
      {value: '7', name: 'Jul'}, {value: '8', name: 'Ago'}, {value: '9', name: 'Sep'},
      {value: '10', name: 'Oct'}, {value: '11', name: 'Nov'}, {value: '12', name: 'Dic'}
    ];
  }

  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({length: 101}, (_, i) => currentYear - i);
  }
}