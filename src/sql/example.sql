-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 16, 2021 at 10:31 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

INSERT INTO `utente` (`id`, `email`, `password`, `is_admin`, `creation_time`, `update_time`) VALUES
(1, 'mariorossi@gmail.com', '$2b$10$VYyECq2r9Obr8gSUojIyaeznCsOteoyjQIL1WwWormA/9FqmWU6mq', 1, '2021-12-16 19:40:42', '2021-12-16 19:42:12'),
(2, 'rosaverdi@gmail.com', '$2b$10$a0oz.SJFt9HEKuoSqaCwHeulLweX.MbSFnMiM1FYVqsnz9mLiR5ou', 0, '2021-12-16 20:45:54', '2021-12-16 22:18:16'),
(3, 'andreavioli@gmail.com', '$2b$10$HA9vZnTJTi7ro//lzUlRtO86FL53cliVKXC7tsew3qhLE3SatO0lq', 0, '2021-12-16 22:25:02', NULL),
(4, 'vincenzoponti@gmail.com', '$2b$10$LJkiImcGDAS.gQdKjpoQk.mXUL/6FiZmBJh8rcyk3uUI/.Jf1NmLS', 1, '2021-12-16 22:30:37', '2021-12-16 22:30:51');

INSERT INTO `anagrafica_utente` (`utente`, `nome`, `cognome`, `data_nascita`, `luogo_nascita`, `sesso`, `data_emissione_carta`, `data_scadenza_carta`, `codice_carta`) VALUES
(1, 'Mario', 'Rossi', '1990-02-01', 'Roma', 'M', '2016-03-10', '2026-03-10', 'RSSMRO90UY77J'),
(2, 'Rosa', 'Verdi', '1996-03-02', 'Firenze', 'F', '2016-04-12', '2026-04-12', 'VRDRS98I544K'),
(3, 'Andrea', 'Violi', '1997-04-03', 'Napoli', 'M', '2018-12-12', '2028-12-12', 'VLIADR87T554Y'),
(4, 'Vincenzo', 'Ponti', '1989-09-12', 'Venezia', 'M', '2016-07-14', '2026-07-14', 'PNTVCZ67J455H');
