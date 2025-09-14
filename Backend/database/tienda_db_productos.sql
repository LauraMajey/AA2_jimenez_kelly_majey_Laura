-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: tienda_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `tienda_id` int DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tienda_id` (`tienda_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Samsung Galaxy S24 Ultra','Smartphone de alta gama con cámara de 200MP y pantalla AMOLED 6.8\"',2599990.00,100,1,'Samsung','Celular','2025-03-01','products/s24_ultra.webp','https://www.alkosto.com/celular-samsung-galaxy-s24-256gb-negro/p/8806095301501'),(2,'iPhone 15 Pro Max','Smartphone premium con chip A18 Bionic, cámara Pro y pantalla Super Retina XDR',4899900.00,50,2,'Apple','Celular','2025-09-01','products/iphone_15_pro_max.webp','https://www.exito.com/iphone-15-pro-max-256-gb-titanio-azul-nuevo-102853976/p'),(3,'Xiaomi Redmi Note 13 Pro','Celular gama media con batería de 5000mAh y cámara cuádruple',1350000.00,150,4,'Xiaomi','Celular','2025-04-20','products/redmi_note_13_pro.webp','https://www.ktronix.com/celular-redmi-note-13-pro-512gb-5g-negro/p/6941812749845'),(4,'Google Pixel 9A 5G 128 Gb 8Gb Ram Negro','Smartphone con cámara avanzada y Android 15',2969999.00,75,2,'Google','Celular','2025-06-10','products/pixel_9.webp','https://www.exito.com/celular-google-pixel-9a-5g-128-gb-8gb-ram-negro-104659035-mp/p'),(5,'MacBook Air 15.3 pulgadas','Portátil ultraligero con chip M3 y pantalla Retina de 13.6\"',6819900.00,30,3,'Apple','Portátil','2025-06-10','products/macbook_air_m3.webp','https://www.falabella.com.co/falabella-co/product/72911655/Portatil-MacBook-Air-15.3-pulgadas-Chip-M3-8GB-de-RAM-256GB-SSD-de-Almacenamiento-MacOS-Computador-Portatil/72911655'),(6,'Lenovo IdeaPad 6 Pro','Portátil liviano con procesador Ryzen 7 y pantalla 16\"',2648990.00,60,2,'Lenovo','Portátil','2025-01-15','products/ideapad6pro.webp','https://www.exito.com/lenovo-ideapad-intel-core-i7-13620h-ssd-512gb-ram-16gb-led-156-full-hd-103295581-mp/p'),(7,'Portatil Tactil HP Pavilion Intel Core i3','Portátil gaming con  Intel Core i3 1215U RAM 8 GB 512 GB SSD 14ek0010la',1999000.00,90,2,'HP','Portátil','2024-02-01','products/hp_pavilion.webp','https://www.exito.com/computador-portatil-2-en-1-hp-pavilion-x360-intel-core-i3-1215u-ram-8-gb-512-gb-ssd-14-ek0010la-3179595/p'),(8,'Lenovo Legion 7 2025','Portátil gaming avanzado con AMD Ryzen 9 y RTX 4070',7650000.00,25,2,'Lenovo','Portátil','2025-07-01','products/legion7_2025.webp','https://www.exito.com/portatil-gamer-lenovo-loq-amd-ryzen-7-7435hs-rtx-4070-8gb-ssd-1tb-ram-16gb-156-fhd-ips-144hz-15arp9-104532622-mp/p'),(9,'Samsung Galaxy Tab S9 Plus','Tablet con pantalla Super AMOLED de 12.4\" y procesador Snapdragon 8 Gen 3',3100000.00,45,1,'Samsung','Tablet','2025-05-15','products/tab_s9_plus.webp','https://www.alkosto.com/tablet-samsung-124-pulgadas-s9plus-wifi-color-gris/p/8806095264455'),(10,'iPad Air 6','Tablet ligera con chip M2 y pantalla Liquid Retina de 10.9\"',3739000.00,60,3,'Apple','Tablet','2025-03-20','products/ipad_air_6.webp','https://www.falabella.com.co/falabella-co/product/72958162/iPad-Air-256GB-11-Pulgadas-Chip-M2/72958162'),(11,'LG OLED Smart TV 55\"','Televisor 4K UHD Smart TV con sistema operativo webOS',3999900.00,20,5,'LG','Televisor','2025-03-20','products/lg_oled_55.webp','https://www.homecenter.com.co/homecenter-co/product/733311/televisor-55-pulgadas-4k-uhd-oled55b4-negro/733311/'),(12,'Samsung QLED 65\"','Televisor QLED 4K con tecnología HDR y Smart Hub',3000000.00,40,1,'Samsung','Televisor','2025-04-01','products/samsung_qled_65.webp','https://www.alkosto.com/tv-samsung-65-pulgadas-1651-cm-q7f-4k-uhd-qled-smart-tv/p/8806097146759'),(13,'Nevecón Side by Side 692 Ltz 7WCS25SDHM Silver','Refrigerador inteligente con control Wi-Fi y dispensador de agua',5599000.00,15,5,'Whirlpool','Electrodoméstico','2025-08-01','products/smart_fridge.webp','https://www.homecenter.com.co/homecenter-co/product/364371/nevecon-side-by-side-692-ltz-7wcs25sdhm-silver/364371/?kid=goosho_1394757&shop=googleShopping&msclkid=ef141ccac4291c54632374611b53be43'),(14,'Lavadora Carga Frontal 22 Kg WM22VV26R','Lavadora inteligente con ciclo rápido y control desde app',2200000.00,25,5,'LG','Electrodoméstico','2025-07-01','products/lg_washing_machine.webp','https://www.homecenter.com.co/homecenter-co/product/587216/lavadora-carga-frontal-22-kg-wm22vv26r/587216/'),(15,'iPhone 17 5G 256 GB 8 GB RAM Negro','Este dispositivo funciona con el sistema operativo iOS 26 y está impulsado por el Chip A19, que cuenta con una CPU de 6 núcleos y una GPU de 5 núcleos con aceleradores neurales para un rendimiento potente.\r\n\r\nViene equipado con una pantalla Liquid Retina XDR de 6.3 pulgadas. Con 8 GB de RAM y 256 GB de almacenamiento, ofrece un amplio espacio y una multitarea fluida.\r\n\r\nCaptura fotos y videos impresionantes con la cámara principal de 48 Mpx y toma selfies nítidas con la cámara frontal de 18 Mpx.\r\n\r\nMantente conectado con redes 2G, 3G, 4G, 4.5G, 5G y LTE, además de conectividad Bluetooth y Wi-Fi. El dispositivo es alimentado por una batería de 3,692 mAh.',4669000.00,5,2,'Apple','Celular','2025-09-15','products/1757891937334-iPhone-17.webp','https://www.exito.com/celular-apple-iphone-17-5g-256-gb-8-gb-ram-negro-3226426/p#product-details-content');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-14 18:24:09
