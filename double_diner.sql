-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2022 at 06:36 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `double_diner`
--

-- --------------------------------------------------------

--
-- Table structure for table `customerorders`
--

CREATE TABLE `customerorders` (
  `id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `tableNo` int(11) NOT NULL,
  `priceTotal` int(11) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customerorders`
--

INSERT INTO `customerorders` (`id`, `status`, `fullName`, `phone`, `address`, `location`, `tableNo`, `priceTotal`, `createdAt`, `updatedAt`) VALUES
(243, 'Decline', 'hjkl;ertfhyujk', 6, 'guikjujnfv@gmail.com', 'efgtynujiop', 0, 1250, '2022-10-17', '2022-10-17'),
(244, 'PENDING', 'e5ryt6u7iop', 5969225, 'wertyjukil@hmail.com', 'we4t5ryjio', 0, 3000, '2022-10-17', '2022-10-17');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL,
  `feedback` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` int(11) NOT NULL,
  `item` varchar(250) NOT NULL,
  `price` int(20) NOT NULL,
  `quantity` varchar(250) NOT NULL,
  `date` date NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `image` varchar(250) NOT NULL,
  `price` int(11) NOT NULL,
  `foodName` varchar(250) NOT NULL,
  `foodType` varchar(250) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `image`, `price`, `foodName`, `foodType`, `createdAt`, `updatedAt`) VALUES
(100, 'Images\\1663736460312.jpg', 200, 'Chips', 'Meal', '2022-09-21', '2022-09-21'),
(101, 'Images\\1663736587784.jpg', 500, 'Chips and Half Chicken', 'Meal', '2022-09-21', '2022-09-21'),
(102, 'Images\\1663736633705.jpg', 800, 'Chips and Full Chicken', 'Meal', '2022-09-21', '2022-09-21'),
(103, 'Images\\1663736691288.jpg', 600, 'Chips and filet Fish', 'Meal', '2022-09-21', '2022-09-21'),
(104, 'Images\\1663736743231.jpg', 600, 'Chicken', 'Meal', '2022-09-21', '2022-09-21'),
(105, 'Images\\1663736781078.webp', 500, 'Fish', 'Meal', '2022-09-21', '2022-09-21'),
(106, 'Images\\1663736990623.jpg', 350, 'Fish Filet', 'Meal', '2022-09-21', '2022-09-21'),
(107, 'Images\\1663737085375.jpg', 300, 'Masala Chips', 'Meal', '2022-09-21', '2022-09-21'),
(108, 'Images\\1663737170232.jpg', 450, 'Chicken Nuggets', 'Meal', '2022-09-21', '2022-09-21'),
(109, 'Images\\1663737250055.jpg', 900, 'Rice And Chicken', 'Meal', '2022-09-21', '2022-09-21'),
(110, 'Images\\1663737424448.jpg', 900, 'Rice And Fish', 'Meal', '2022-09-21', '2022-09-21'),
(111, 'Images\\1663737601371.jpg', 650, 'Rice And Vegetable Soup', 'Meal', '2022-09-21', '2022-09-21'),
(112, 'Images\\1663737688674.jpg', 700, 'Rice And Beans', 'Meal', '2022-09-21', '2022-09-21'),
(113, 'Images\\1663737872852.jpg', 550, 'Ugali And Meat', 'Meal', '2022-09-21', '2022-09-21'),
(114, 'Images\\1663737950135.jpg', 750, 'Ugali And Fish', 'Meal', '2022-09-21', '2022-09-21'),
(115, 'Images\\1663738093153.jpg', 450, 'Ugali And Sukuma', 'Meal', '2022-09-21', '2022-09-21'),
(119, 'Images\\1663739292770.jpg', 500, 'Strawberry Juice', 'Juice', '2022-09-21', '2022-09-21'),
(120, 'Images\\1663739351109.jpg', 450, 'Pineapple  Juice', 'Juice', '2022-09-21', '2022-09-21'),
(121, 'Images\\1663739402196.webp', 350, 'Orange Juice', 'Juice', '2022-09-21', '2022-09-21'),
(122, 'Images\\1663739440032.jpg', 550, 'Mango Juice', 'Juice', '2022-09-21', '2022-09-21'),
(123, 'Images\\1663739483648.webp', 250, 'Banana Juice', 'Juice', '2022-09-21', '2022-09-21'),
(124, 'Images\\1663739520314.webp', 400, 'Avocado Juice', 'Juice', '2022-09-21', '2022-09-21'),
(125, 'Images\\1663739553406.png', 600, 'Mixed Fruit Juice', 'Juice', '2022-09-21', '2022-09-21'),
(126, 'Images\\1663739808399.jpg', 450, 'Chocolate Shakes', 'Shakes', '2022-09-21', '2022-09-21'),
(127, 'Images\\1663740031752.webp', 600, 'Oroe Shakes', 'Shakes', '2022-09-21', '2022-09-21'),
(128, 'Images\\1663740094477.jpg', 400, 'Strawberry Shakes', 'Shakes', '2022-09-21', '2022-09-21'),
(129, 'Images\\1663740154722.jpg', 400, 'Vanilla Shakes', 'Shakes', '2022-09-21', '2022-09-21');

-- --------------------------------------------------------

--
-- Table structure for table `ordereditems`
--

CREATE TABLE `ordereditems` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `image` varchar(50) NOT NULL,
  `foodName` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ordereditems`
--

INSERT INTO `ordereditems` (`id`, `order_id`, `image`, `foodName`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(210, 243, 'Images\\1663739440032.jpg', 'Mango Juice', 1, 550, '2022-10-17', '2022-10-17'),
(211, 243, 'Images\\1663739402196.webp', 'Orange Juice', 2, 700, '2022-10-17', '2022-10-17'),
(212, 244, 'Images\\1663739402196.webp', 'Orange Juice', 2, 700, '2022-10-17', '2022-10-17'),
(213, 244, 'Images\\1663739292770.jpg', 'Strawberry Juice', 1, 500, '2022-10-17', '2022-10-17'),
(214, 244, 'Images\\1663739483648.webp', 'Banana Juice', 1, 250, '2022-10-17', '2022-10-17'),
(215, 244, 'Images\\1663739440032.jpg', 'Mango Juice', 2, 1100, '2022-10-17', '2022-10-17'),
(216, 244, 'Images\\1663739351109.jpg', 'Pineapple  Juice', 1, 450, '2022-10-17', '2022-10-17');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `fullName` varchar(250) NOT NULL,
  `phone` int(20) NOT NULL,
  `tableFor` int(20) NOT NULL,
  `time` time NOT NULL,
  `dateReserve` date NOT NULL DEFAULT current_timestamp(),
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `idNo` varchar(50) NOT NULL,
  `fullName` varchar(250) NOT NULL,
  `department` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `idNo`, `fullName`, `department`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'da001', 'Mohamed Ahmed', 'Manager', 'Images\\1665461212209.png', '2022-10-11', '2022-10-11'),
(2, 'da002', 'Olivia Lily', 'Supervisor', 'Images\\1665461262230.png', '2022-10-11', '2022-10-11'),
(3, 'da003', 'Jennifer Alex', 'Head Chief', 'Images\\1665461361744.png', '2022-10-11', '2022-10-11'),
(4, 'da010', 'Zoey Willow', 'Chief', 'Images\\1665461441475.png', '2022-10-11', '2022-10-11'),
(5, 'da010', 'Michel curts', 'Chief', 'Images\\1665461487867.png', '2022-10-11', '2022-10-11'),
(6, 'da020', 'Kevin Brian', 'Dish Cleaner', 'Images\\1665461549207.png', '2022-10-11', '2022-10-11'),
(7, 'da020', 'Alex John', 'Dish Cleaner', 'Images\\1665461623036.png', '2022-10-11', '2022-10-11'),
(8, 'da030', 'Larry Hnkin', 'Waiter', 'Images\\1665461649221.png', '2022-10-11', '2022-10-11'),
(9, 'da030', 'John Mikel', 'Waiter', 'Images\\1665461690717.png', '2022-10-11', '2022-10-11'),
(10, 'da040', 'Lucy Lillian', 'Cleaner', 'Images\\1665461973767.png', '2022-10-11', '2022-10-11'),
(11, 'da040', 'Natalie Kinsley', 'Cleaner', 'Images\\1665462006162.png', '2022-10-11', '2022-10-11'),
(12, 'da040', 'Brooklyn Alice\r\n', 'Cleaner', 'Images\\1665462144332.jpg', '2022-10-11', '2022-10-11'),
(13, 'da040', 'Valentina Bella', 'Cleaner', 'Images\\1665462167747.png', '2022-10-11', '2022-10-11'),
(14, 'da030', 'Buddy Doyl', 'Waiter', 'Images\\1665462296632.png', '2022-10-11', '2022-10-11'),
(15, 'da030', 'Danny Dayton', 'Waiter', 'Images\\1665462346805.png', '2022-10-11', '2022-10-11');

-- --------------------------------------------------------

--
-- Table structure for table `useraccounts`
--

CREATE TABLE `useraccounts` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(400) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `useraccounts`
--

INSERT INTO `useraccounts` (`id`, `name`, `email`, `password`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'mohamed', 'mohamed@gmail.com', '$2b$10$PlMiIA5a/MgasCDxQSuYpeHbrXnJXDI0XP5tx5AtPjOuOPntvh336', 'user', '2022-10-14', '2022-10-14'),
(2, 'ahmed', 'ahmed@gmail.com', '$2b$10$4KZzTJB4F6wIyyUmrlGhMeP9JuH2Jy78f50amLIxWVW25YqLftDWe', 'admin', '2022-10-14', '2022-10-14'),
(3, 'abdilll', 'abdifn@gmail.com', '$2b$10$J9EB6f0SIyxO063K7T4r7eOkQ6uqUJ3VOT8IIUE/rF2EaKwC1NVMm', '', '2022-10-18', '2022-10-18'),
(4, 'mahd', 'mahd@gmail.com', '$2b$10$2AS.fRm9N7CLhyd5B.lw1O3k3ujlmYoXY1ttdQDyx3XdfvIBXQMe2', 'admin', '2022-10-18', '2022-10-18'),
(5, 'sdfghjklkkkk', 'juma@gmail.com', '$2b$10$ZOjFiMuOZ8rfYG8YuYBkgubXZWqKHmgTKvism5HjPVt/yzMPDizLa', 'user', '2022-10-18', '2022-10-18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customerorders`
--
ALTER TABLE `customerorders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ordereditems`
--
ALTER TABLE `ordereditems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `useraccounts`
--
ALTER TABLE `useraccounts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customerorders`
--
ALTER TABLE `customerorders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `ordereditems`
--
ALTER TABLE `ordereditems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `useraccounts`
--
ALTER TABLE `useraccounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ordereditems`
--
ALTER TABLE `ordereditems`
  ADD CONSTRAINT `ordereditems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `customerorders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
