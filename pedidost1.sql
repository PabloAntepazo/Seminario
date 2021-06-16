-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2021 a las 20:35:34
-- Versión del servidor: 10.1.34-MariaDB
-- Versión de PHP: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pedidost1`
--
CREATE DATABASE IF NOT EXISTS `pedidost1` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `pedidost1`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulost1` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulost1` (`id`, `descripcion`, `precio`) VALUES
(1, 'ALCOHOL 1L', 149.89),
(2, 'LAVANDINA 2L', 73.89),
(3, 'SANITIZANTE REFRESH 250 CC', 222),
(4, 'JABON LIQUIDO 250 CC', 162.9),
(5, 'BARBIJO x10 un.', 399.91);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `calle` varchar(100) DEFAULT NULL,
  `altura` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_articulos`
--

CREATE TABLE `pedidos_articulos` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` enum('admin','user') NOT NULL DEFAULT 'admin',
  `alta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activado` varchar(1000) DEFAULT NULL,
  `perfil` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `rol`, `alta`, `activado`, `perfil`) VALUES
(1, 'Pedro', 'pedro@friendface.com', '$2y$10$Iz8NbHP9JJDE06TJ2kMsGudNYjZKw6oDvb1fqc7.1JzFQ6jd1alkO', 'admin', '2020-09-08 17:45:47', NULL, NULL),
(2, 'Hugo', 'hugo@friendface.com', '7c222fb2927d828af22f592134e8932480637c0d', 'user', '2018-11-26 17:14:50', NULL, NULL),
(3, 'Pepe', 'pepe@friendface.com', '123', 'user', '2020-09-09 19:35:04', NULL, NULL);
(4, 'Pablo', 'pavlo@friendface.com', '123', 'admin', '2021-06-09 19:35:04', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulost1`
--
ALTER TABLE `articulost1`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos_articulos`
--
ALTER TABLE `pedidos_articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulost1`
--
ALTER TABLE `articulost1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `pedidos_articulos`
--
ALTER TABLE `pedidos_articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
