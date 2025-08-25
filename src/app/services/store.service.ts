import { Injectable } from '@angular/core';
import { Store } from '../interfaces/store';

@Injectable({ providedIn: 'root' })
export class StoreService {
  #storeList: Store[] = [
    {
      id: 1,
      name: 'Alkosto',
      description: 'Tienda especializada en electrodomésticos, tecnología y hogar.',
      image: 'stores/alkosto.webp',
      phone: '018000180222',
      address: 'Av. Carrera 68 #68-94, Bogotá',
      category: 1,
      score: 4.6,
      likes: 980
    },
    {
      id: 2,
      name: 'Éxito',
      description: 'Supermercado y tienda de tecnología con gran cobertura en Colombia.',
      image: 'stores/exito.webp',
      phone: '018000112580',
      address: 'Cra. 65 #11-50, Medellín',
      category: 2,
      score: 4.3,
      likes: 1250
    },
    {
      id: 3,
      name: 'Falabella',
      description: 'Tienda por departamentos con amplia variedad en tecnología y moda.',
      image: 'stores/falabella.webp',
      phone: '018000949030',
      address: 'Calle 80 #69-20, Bogotá',
      category: 3,
      score: 4.2,
      likes: 890
    },
    {
      id: 4,
      name: 'Ktronix',
      description: 'Especialistas en tecnología, computadores y electrodomésticos.',
      image: 'stores/ktronix.webp',
      phone: '6013077115',
      address: 'Calle 13 #65-65, Bogotá',
      category: 4,
      score: 4.7,
      likes: 760
    },
    {
      id: 5,
      name: 'Homecenter',
      description: 'Tienda líder en artículos para el hogar, construcción y tecnología.',
      image: 'stores/homecenter.webp',
      phone: '018000123622',
      address: 'Cra. 30 #19-45, Cali',
      category: 5,
      score: 4.4,
      likes: 1120
    }
  ];

  getStore(id: number): Store {
    return this.#storeList.find(s => s.id === id)!;
  }

   getStores(): Store[] {
    return this.#storeList;
  }

  getScore(score: number): string {
    if (score >= 4.5) return 'Excelente';
    if (score >= 3.5) return 'Bueno';
    return 'Regular';
  }
}
