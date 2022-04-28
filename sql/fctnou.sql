-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-04-2022 a las 18:14:56
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
  `matriculado` tinyint(1) NOT NULL DEFAULT 1,
  `email` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`id`, `dniAlumno`, `nombreAlumno`, `apellidoAlumno`, `curso`, `calle`, `cp`, `provincia`, `localidad`, `matriculado`, `email`) VALUES
(1, '4552635D', 'Noureddie', 'El qaddoury', 1, 'callle obreros jeronimo ', '10310', 'caceres', 'talayuela', 1, ''),
(2, '3667779V', 'Richi', 'Rachdi', 2, 'calle mnauel azam', '12134', 'madrid', 'marid', 1, '');

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
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `emisor` varchar(8) NOT NULL,
  `mensaje` varchar(200) NOT NULL,
  `receptor` varchar(8) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`id`, `emisor`, `mensaje`, `receptor`, `fecha`) VALUES
(1, 'aa', 'adddd', 'ffffa', '2022-04-28 15:32:50');

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

INSERT INTO `cursos` (`id`, `code_ciclo`, `familiaProfesional`, `cicloFormativo`, `cursoAcademico`, `nHoras`, `dniTutor`) VALUES
(1, 'DAW', 'informatica', 'Desarrolo de apliaciones web', '2021-2022', 400, '4758962D'),
(2, 'DAM', 'Informa', 'Desarrollo de aplicaicones mulktiplataforma', '2021-2025', 500, '7894561D');

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

INSERT INTO `empresas` (`id`, `nombreEmpresa`, `provincia`, `localidad`, `calle`, `cp`, `cif`, `telefono`, `email`, `dniRepresentante`, `nombreRepresentante`) VALUES
(1, 'NTT DATA', 'Salamanca', 'salamantica', 'calle jorge ramurez', '15425', 'F45872545', 658945685, 'nttdata@email.com', '5486958G', 'Aaron Tiemblo'),
(2, 'VIEWNEXT', 'Caceres', 'Caceres', 'calle caceres', '13245', 'P523345', 546345234, 'EMAIL@GMAIL.COM', '6236589f', 'Maria Guiterrez');

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

INSERT INTO `responsable` (`id`, `nombreResponsable`, `dniResponsable`, `idEmpresa`) VALUES
(1, 'Antonio Garcia', '48578478', 1),
(2, 'Miguel Angel ', '4857847V', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `dniAlumno` varchar(8) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `orientacion` varchar(250) NOT NULL,
  `tiempo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `dificultad` enum('Facil','Medio','Dificil','','') NOT NULL,
  `validadoResponsable` tinyint(1) NOT NULL DEFAULT 0,
  `validadoTutor` tinyint(1) NOT NULL DEFAULT 0
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

INSERT INTO `tutorescolar` (`id`, `nombreTutor`, `dniTutorEscolar`, `codigoCentro`) VALUES
(1, 'Camacho', '4758962D', 'CODAUG'),
(2, 'Luis', '7894561D', 'CODAUG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `userDni` varchar(8) NOT NULL,
  `password` blob NOT NULL,
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
-- Indices de la tabla `centros`
--
ALTER TABLE `centros`
  ADD PRIMARY KEY (`codigo`),
  ADD UNIQUE KEY `cif_unique` (`cif`) USING BTREE,
  ADD UNIQUE KEY `telefono_unique` (`telefono`) USING BTREE;

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_ciclo` (`code_ciclo`),
  ADD KEY `fct_dnitutor_ibfk` (`dniTutor`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dniRepresentante` (`dniRepresentante`),
  ADD UNIQUE KEY `nombreEmpresa` (`nombreEmpresa`);

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
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `fct_dnitutor_ibfk` FOREIGN KEY (`dniTutor`) REFERENCES `tutorescolar` (`dniTutorEscolar`);

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
