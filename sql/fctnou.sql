-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-04-2022 a las 13:21:59
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fctnou`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `id` int(11) NOT NULL,
  `dniAlumno` varchar(8) NOT NULL,
  `nombreAlumno` varchar(30) NOT NULL,
  `apellidoAlumno` varchar(50) NOT NULL,
  `curso` int(10) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `cp` varchar(5) NOT NULL,
  `provincia` varchar(30) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `matriculado` tinyint(1) NOT NULL,
  `email` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumno`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_curso`
--

CREATE TABLE `alumno_curso` (
  `dniAlumno` varchar(8) NOT NULL,
  `idCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centros`
--

CREATE TABLE `centros` (
  `codigo` varchar(50) NOT NULL,
  `nombreCentro` varchar(30) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `cp` int(5) NOT NULL,
  `cif` varchar(9) NOT NULL,
  `telefono` int(9) NOT NULL,
  `email` varchar(250) NOT NULL,
  `nombreDirector` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centros`
--

INSERT INTO `centros` (`codigo`, `nombreCentro`, `provincia`, `localidad`, `calle`, `cp`, `cif`, `telefono`, `email`, `nombreDirector`) VALUES
('CODAUG', 'Ies Augustobriga', 'Caceres', 'Navalmoral', 'calle goya martine Marcadon', 10300, 'W45875654', 658945623, 'iesaugustobriga.email.com', 'Marta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `code_ciclo` varchar(10) NOT NULL,
  `familiaProfesional` varchar(50) NOT NULL,
  `cicloFormativo` varchar(150) NOT NULL,
  `cursoAcademico` varchar(10) NOT NULL,
  `nHoras` int(6) NOT NULL,
  `dniTutor` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cursos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `nombreEmpresa` varchar(50) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `cp` varchar(5) NOT NULL,
  `cif` varchar(9) NOT NULL,
  `telefono` int(9) NOT NULL,
  `email` varchar(250) NOT NULL,
  `dniRepresentante` varchar(8) NOT NULL,
  `nombreRepresentante` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresas`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fct_alumno`
--

CREATE TABLE `fct_alumno` (
  `id` int(11) NOT NULL,
  `dniAlumno` varchar(8) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `dniResponsable` varchar(8) NOT NULL,
  `dniTutor` varchar(8) NOT NULL,
  `codigoCentro` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fct_alumno`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `responsable`
--

CREATE TABLE `responsable` (
  `id` int(11) NOT NULL,
  `nombreResponsable` varchar(30) NOT NULL,
  `dniResponsable` varchar(8) NOT NULL,
  `idEmpresa` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `responsable`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `dniAlumno` varchar(8) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `orientacion` varchar(250) NOT NULL,
  `tiempo` time NOT NULL,
  `fecha` date NOT NULL,
  `dificultad` enum('Facil','Medio','Dificil','','') NOT NULL,
  `validadoResponsable` tinyint(1) NOT NULL,
  `validadoTutor` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutorescolar`
--

CREATE TABLE `tutorescolar` (
  `id` int(11) NOT NULL,
  `nombreTutor` varchar(30) NOT NULL,
  `dniTutorEscolar` varchar(8) NOT NULL,
  `codigoCentro` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tutorescolar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `userDni` varchar(8) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(150) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dniAlumno` (`dniAlumno`),
  ADD KEY `curso` (`curso`);

--
-- Indices de la tabla `alumno_curso`
--
ALTER TABLE `alumno_curso`
  ADD KEY `idCurso_foreign_key` (`idCurso`),
  ADD KEY `dniAlumno_foreign_key` (`dniAlumno`);

--
-- Indices de la tabla `centros`
--
ALTER TABLE `centros`
  ADD PRIMARY KEY (`codigo`),
  ADD UNIQUE KEY `cif_unique` (`cif`) USING BTREE,
  ADD UNIQUE KEY `telefono_unique` (`telefono`) USING BTREE;

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fct_alumno`
--
ALTER TABLE `fct_alumno`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dniAlumno` (`dniAlumno`),
  ADD KEY `codigoCentro` (`codigoCentro`),
  ADD KEY `dniResponsable` (`dniResponsable`),
  ADD KEY `dniTutor` (`dniTutor`),
  ADD KEY `idEmpresa` (`idEmpresa`);

--
-- Indices de la tabla `responsable`
--
ALTER TABLE `responsable`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dniResponsable` (`dniResponsable`),
  ADD KEY `idempresa_foreign_key` (`idEmpresa`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD KEY `dniAlumno` (`dniAlumno`);

--
-- Indices de la tabla `tutorescolar`
--
ALTER TABLE `tutorescolar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dniTutorEscolar` (`dniTutorEscolar`),
  ADD KEY `codigoCentro_foreign_key` (`codigoCentro`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userDni` (`userDni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `fct_alumno`
--
ALTER TABLE `fct_alumno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `responsable`
--
ALTER TABLE `responsable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tutorescolar`
--
ALTER TABLE `tutorescolar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`curso`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `alumno_curso`
--
ALTER TABLE `alumno_curso`
  ADD CONSTRAINT `dniAlumno_foreign_key` FOREIGN KEY (`dniAlumno`) REFERENCES `alumno` (`dniAlumno`),
  ADD CONSTRAINT `idCurso_foreign_key` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`id`);

--
-- Filtros para la tabla `fct_alumno`
--
ALTER TABLE `fct_alumno`
  ADD CONSTRAINT `fct_alumno_ibfk_1` FOREIGN KEY (`codigoCentro`) REFERENCES `centros` (`codigo`),
  ADD CONSTRAINT `fct_alumno_ibfk_2` FOREIGN KEY (`dniAlumno`) REFERENCES `alumno` (`dniAlumno`),
  ADD CONSTRAINT `fct_alumno_ibfk_3` FOREIGN KEY (`dniResponsable`) REFERENCES `responsable` (`dniResponsable`),
  ADD CONSTRAINT `fct_alumno_ibfk_4` FOREIGN KEY (`idEmpresa`) REFERENCES `empresas` (`id`),
  ADD CONSTRAINT `fct_alumno_ibfk_5` FOREIGN KEY (`dniTutor`) REFERENCES `tutorescolar` (`dniTutorEscolar`),
  ADD CONSTRAINT `fct_alumno_ibfk_6` FOREIGN KEY (`idEmpresa`) REFERENCES `empresas` (`id`);

--
-- Filtros para la tabla `responsable`
--
ALTER TABLE `responsable`
  ADD CONSTRAINT `idempresa_foreign_key` FOREIGN KEY (`idEmpresa`) REFERENCES `empresas` (`id`);

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`dniAlumno`) REFERENCES `alumno` (`dniAlumno`);

--
-- Filtros para la tabla `tutorescolar`
--
ALTER TABLE `tutorescolar`
  ADD CONSTRAINT `codigoCentro_foreign_key` FOREIGN KEY (`codigoCentro`) REFERENCES `centros` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
