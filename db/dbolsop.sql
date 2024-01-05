-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for dbolshop
CREATE DATABASE IF NOT EXISTS `dbolshop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbolshop`;

-- Dumping structure for table dbolshop.orderitems
CREATE TABLE IF NOT EXISTS `orderitems` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `qty` int NOT NULL,
  `totalPrice` decimal(11,2) NOT NULL DEFAULT '0.00',
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table dbolshop.orderitems: ~0 rows (approximately)
REPLACE INTO `orderitems` (`id`, `productId`, `qty`, `totalPrice`, `orderId`, `createdAt`, `updatedAt`) VALUES
	('3ae28dcb-4069-4d40-8de4-abab5b6dbe6d', '0aa9704a-13ad-4340-913e-a81ded34eb65', 2, 2000000.00, '9d39a496-369f-4731-a970-34baec353845', '2024-01-05 12:11:35', '2024-01-05 12:11:35'),
	('4ec6c322-5c51-434f-a95f-9a6cee36dc9b', '325cc5b2-35d2-45ed-affe-5fcf02e3ff29', 3, 27000000.00, '4057a841-9070-4863-a986-6e7abb107f17', '2024-01-05 15:08:10', '2024-01-05 15:08:10'),
	('623b39ac-c755-490a-9752-89b0ea4c700b', '325cc5b2-35d2-45ed-affe-5fcf02e3ff29', 3, 2700000.00, '4057a841-9070-4863-a986-6e7abb107f17', '2024-01-05 16:25:21', '2024-01-05 16:25:21'),
	('6ef41a75-ef7e-4239-8a1c-4ab00f51e5ab', '325cc5b2-35d2-45ed-affe-5fcf02e3ff29', 3, 27000000.00, '4057a841-9070-4863-a986-6e7abb107f17', '2024-01-05 15:09:27', '2024-01-05 15:09:27'),
	('70dbf522-02ac-4767-9146-7c9aee7a2eb0', '325cc5b2-35d2-45ed-affe-5fcf02e3ff29', 3, 27000000.00, '4057a841-9070-4863-a986-6e7abb107f17', '2024-01-05 15:04:53', '2024-01-05 15:04:53'),
	('b1979d62-2f5f-4d32-bdc3-74f6bb993ca8', '0aa9704a-13ad-4340-913e-a81ded34eb65', 5, 5000000.00, '9d39a496-369f-4731-a970-34baec353845', '2024-01-05 12:11:32', '2024-01-05 12:11:32'),
	('eb58768c-87f2-4041-9a1c-fb16ed5df165', '0aa9704a-13ad-4340-913e-a81ded34eb65', 1, 900000.00, '9d39a496-369f-4731-a970-34baec353845', '2024-01-05 12:11:19', '2024-01-05 12:11:19'),
	('f1678384-99aa-467e-a57c-af18e0548521', '325cc5b2-35d2-45ed-affe-5fcf02e3ff29', 2, 2000000.00, '4e11df53-3b5a-4a4d-a571-e1c0ce8eb75b', '2024-01-05 14:46:47', '2024-01-05 14:46:47');

-- Dumping structure for table dbolshop.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `billing` decimal(11,2) NOT NULL DEFAULT '0.00',
  `status` enum('cart','pending','paid','complete') NOT NULL DEFAULT 'cart',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderId`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `users` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table dbolshop.orders: ~0 rows (approximately)
REPLACE INTO `orders` (`orderId`, `customerId`, `billing`, `status`, `createdAt`, `updatedAt`) VALUES
	('4057a841-9070-4863-a986-6e7abb107f17', '42e7105e-27c0-4107-9446-92aa10d8108d', 120600000.00, 'pending', '2024-01-05 15:04:52', '2024-01-05 16:27:04'),
	('4e11df53-3b5a-4a4d-a571-e1c0ce8eb75b', '42e7105e-27c0-4107-9446-92aa10d8108d', 0.00, 'pending', '2024-01-05 14:46:47', '2024-01-05 14:49:56'),
	('9d39a496-369f-4731-a970-34baec353845', '42e7105e-27c0-4107-9446-92aa10d8108d', 0.00, 'pending', '2024-01-05 12:11:19', '2024-01-05 12:33:51');

-- Dumping structure for table dbolshop.products
CREATE TABLE IF NOT EXISTS `products` (
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` varchar(100) DEFAULT NULL,
  `price` decimal(11,2) NOT NULL,
  `sellerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `sellerId` (`sellerId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`sellerId`) REFERENCES `users` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table dbolshop.products: ~0 rows (approximately)
REPLACE INTO `products` (`productId`, `name`, `desc`, `price`, `sellerId`, `createdAt`, `updatedAt`) VALUES
	('0aa9704a-13ad-4340-913e-a81ded34eb65', 'Kulkas 1 pintu', 'Kulkas satu pintu', 570000.00, '9dd86298-eebc-4ee6-b875-ae640fc46a5b', '2024-01-05 03:56:32', '2024-01-05 16:00:10'),
	('325cc5b2-35d2-45ed-affe-5fcf02e3ff29', 'Kulkas 4 pintu', 'Kulkas empat pintu dengan fitur membuat batu es otomatis', 900000.00, '42e7105e-27c0-4107-9446-92aa10d8108d', '2024-01-05 04:05:39', '2024-01-05 04:05:39'),
	('c3bc2991-a3e8-40c1-9305-c610d9ad699c', 'Kulkas 3 pintu', 'Kulkas tiga pintu dengan fitur membuat batu es otomatis', 2500000.00, '9dd86298-eebc-4ee6-b875-ae640fc46a5b', '2024-01-05 03:56:56', '2024-01-05 03:56:56'),
	('fab5fa3c-1554-4447-bcb3-e174e546a80d', 'Kulkas 2 pintu', 'Kulkas dua pintu dengan fitur membuat batu es otomatis', 2000000.00, '9dd86298-eebc-4ee6-b875-ae640fc46a5b', '2024-01-05 03:51:25', '2024-01-05 03:51:25');

-- Dumping structure for table dbolshop.users
CREATE TABLE IF NOT EXISTS `users` (
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role` enum('seller','customer') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table dbolshop.users: ~2 rows (approximately)
REPLACE INTO `users` (`userId`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
	('07e5a2fa-f1b7-4f0c-99d1-90e58142fffd', 'user@gmail.com', '$2b$11$G9gf5pbEVBvf6H0gG5ele.xB6Al3vbMpBphQ0ePnixfbY2uygcQdO', 'user', 'customer', '2024-01-05 02:31:36', '2024-01-05 02:31:36'),
	('42e7105e-27c0-4107-9446-92aa10d8108d', 'seller@gmail.com', '$2b$13$2Alj/LHWO4VzJPgpDP2fvebYsog6xJfnt61jDQbI6oEMpMCLMUs6S', 'seller', 'seller', '2024-01-05 01:07:25', '2024-01-05 01:07:25'),
	('9dd86298-eebc-4ee6-b875-ae640fc46a5b', 'admin@gmail.com', '$2b$13$k9W38qQSX6Ag8NIFepyLL.iGLl7UVI6GX6frufoQL1wFHMdfDfGAe', 'admin', 'seller', '2024-01-05 01:02:58', '2024-01-05 01:02:58');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
