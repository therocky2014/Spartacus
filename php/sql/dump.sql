-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- ����: localhost
-- ����� ��������: ��� 22 2016 �., 18:03
-- ������ �������: 5.1.46
-- ������ PHP: 5.3.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- ���� ������: `arkanoid`
--

-- --------------------------------------------------------

--
-- ��������� ������� `players`
--

CREATE TABLE IF NOT EXISTS `players` (
  `name` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `score` int(60) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- ���� ������ ������� `players`
--

INSERT INTO `players` (`name`, `score`) VALUES
('Timur', 7),
('Superman', 30),
('Lizard', 3);