import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  #productList: Product[] = [
    // Smartphones
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Smartphone de alta gama con cámara de 200MP y pantalla AMOLED 6.8"',
      price: 2599990,
      brand: 'Samsung',
      type: 'Celular',
      release_date: '2025-03-01',
      image_url: 'products/s24_ultra.webp',
      idStore: 1,
      link: 'https://www.alkosto.com/celular-samsung-galaxy-s24-256gb-negro/p/8806095301501'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max',
      description: 'Smartphone premium con chip A18 Bionic, cámara Pro y pantalla Super Retina XDR',
      price: 4899900,
      brand: 'Apple',
      type: 'Celular',
      release_date: '2025-09-01',
      image_url: 'products/iphone_15_pro_max.webp',
      idStore: 2,
      link: 'https://www.exito.com/iphone-15-pro-max-256-gb-titanio-azul-nuevo-102853976/p'
    },
    {
      id: 3,
      name: 'Xiaomi Redmi Note 13 Pro',
      description: 'Celular gama media con batería de 5000mAh y cámara cuádruple',
      price: 1350000,
      brand: 'Xiaomi',
      type: 'Celular',
      release_date: '2025-04-20',
      image_url: 'products/redmi_note_13_pro.webp',
      idStore: 4,
      link: 'https://www.ktronix.com/celular-redmi-note-13-pro-512gb-5g-negro/p/6941812749845'
    },
    {
      id: 4,
      name: ' Google Pixel 9A 5G 128 Gb 8Gb Ram Negro',
      description: 'Smartphone con cámara avanzada y Android 15',
      price: 2969999,
      brand: 'Google',
      type: 'Celular',
      release_date: '2025-06-10',
      image_url: 'products/pixel_9.webp',
      idStore: 2,
      link: 'https://www.exito.com/celular-google-pixel-9a-5g-128-gb-8gb-ram-negro-104659035-mp/p'
    },

    // Portátiles
    {
      id: 5,
      name: 'MacBook Air 15.3 pulgadas',
      description: 'Portátil ultraligero con chip M3 y pantalla Retina de 13.6"',
      price:  6819900,
      brand: 'Apple',
      type: 'Portátil',
      release_date: '2025-06-10',
      image_url: 'products/macbook_air_m3.webp',
      idStore: 3,
      link: 'https://www.falabella.com.co/falabella-co/product/72911655/Portatil-MacBook-Air-15.3-pulgadas-Chip-M3-8GB-de-RAM-256GB-SSD-de-Almacenamiento-MacOS-Computador-Portatil/72911655'
    },
    {
      id: 6,
      name: 'Lenovo IdeaPad 6 Pro',
      description: 'Portátil liviano con procesador Ryzen 7 y pantalla 16"',
      price: 2648990,
      brand: 'Lenovo',
      type: 'Portátil',
      release_date: '2025-01-15',
      image_url: 'products/ideapad6pro.web',
      idStore: 2,
      link: 'https://www.exito.com/lenovo-ideapad-intel-core-i7-13620h-ssd-512gb-ram-16gb-led-156-full-hd-103295581-mp/p'
    },
    {
      id: 7,
      name: 'Portatil Tactil HP Pavilion Intel Core i3',
      description: 'Portátil gaming con  Intel Core i3 1215U RAM 8 GB 512 GB SSD 14ek0010la',
      price:  1999000,
      brand: 'HP',
      type: 'Portátil',
      release_date: '2024-02-01',
      image_url: 'products/hp_pavilion.webp',
      idStore: 2,
      link: 'https://www.exito.com/computador-portatil-2-en-1-hp-pavilion-x360-intel-core-i3-1215u-ram-8-gb-512-gb-ssd-14-ek0010la-3179595/p'
    },
    {
      id: 8,
      name: 'Lenovo Legion 7 2025',
      description: 'Portátil gaming avanzado con AMD Ryzen 9 y RTX 4070',
      price: 7650000,
      brand: 'Lenovo',
      type: 'Portátil',
      release_date: '2025-07-01',
      image_url: 'products/legion7_2025.webp',
      idStore: 2,
      link: 'https://www.exito.com/portatil-gamer-lenovo-loq-amd-ryzen-7-7435hs-rtx-4070-8gb-ssd-1tb-ram-16gb-156-fhd-ips-144hz-15arp9-104532622-mp/p'
    },

    // Tablets
    {
      id: 9,
      name: 'Samsung Galaxy Tab S9 Plus',
      description: 'Tablet con pantalla Super AMOLED de 12.4" y procesador Snapdragon 8 Gen 3',
      price: 3100000,
      brand: 'Samsung',
      type: 'Tablet',
      release_date: '2025-05-15',
      image_url: 'products/tab_s9_plus.webp',
      idStore: 1,
      link: 'https://www.alkosto.com/tablet-samsung-124-pulgadas-s9plus-wifi-color-gris/p/8806095264455'
    },
    {
      id: 10,
      name: 'iPad Air 6',
      description: 'Tablet ligera con chip M2 y pantalla Liquid Retina de 10.9"',
      price: 3739000,
      brand: 'Apple',
      type: 'Tablet',
      release_date: '2025-03-20',
      image_url: 'products/ipad_air_6.webp',
      idStore: 3,
      link: 'https://www.falabella.com.co/falabella-co/product/72958162/iPad-Air-256GB-11-Pulgadas-Chip-M2/72958162'
    },

    // Televisores
    {
      id: 11,
      name: 'LG OLED Smart TV 55"',
      description: 'Televisor 4K UHD Smart TV con sistema operativo webOS',
      price: 3999900,
      brand: 'LG',
      type: 'Televisor',
      release_date: '2025-03-20',
      image_url: 'products/lg_oled_55.webp',
      idStore: 5,
      link: 'https://www.homecenter.com.co/homecenter-co/product/733311/televisor-55-pulgadas-4k-uhd-oled55b4-negro/733311/'
    },
    {
      id: 12,
      name: 'Samsung QLED 65"',
      description: 'Televisor QLED 4K con tecnología HDR y Smart Hub',
      price: 3000000,
      brand: 'Samsung',
      type: 'Televisor',
      release_date: '2025-04-01',
      image_url: 'products/samsung_qled_65.webp',
      idStore: 1,
      link: 'https://www.alkosto.com/tv-samsung-65-pulgadas-1651-cm-q7f-4k-uhd-qled-smart-tv/p/8806097146759'
    },

    // Electrodomésticos
    {
      id: 13,
      name: 'Nevecón Side by Side 692 Ltz 7WCS25SDHM Silver',
      description: 'Refrigerador inteligente con control Wi-Fi y dispensador de agua',
      price: 5599.00,
      brand: 'Whirlpool',
      type: 'Electrodoméstico',
      release_date: '2025-08-01',
      image_url: 'products/smart_fridge.webp',
      idStore: 5,
      link: 'https://www.homecenter.com.co/homecenter-co/product/364371/nevecon-side-by-side-692-ltz-7wcs25sdhm-silver/364371/?kid=goosho_1394757&shop=googleShopping&msclkid=ef141ccac4291c54632374611b53be43'
    },
    {
      id: 14,
      name: 'Lavadora Carga Frontal 22 Kg WM22VV26R',
      description: 'Lavadora inteligente con ciclo rápido y control desde app',
      price: 2200000,
      brand: 'LG',
      type: 'Electrodoméstico',
      release_date: '2025-07-01',
      image_url: 'products/lg_washing_machine.webp',
      idStore: 5,
      link: 'https://www.homecenter.com.co/homecenter-co/product/587216/lavadora-carga-frontal-22-kg-wm22vv26r/587216/'
    }
  ];

  getProducts = () => this.#productList;

  getStoreProducts = (storeId: number) =>
    this.#productList.filter(x => x.idStore === storeId);
}
