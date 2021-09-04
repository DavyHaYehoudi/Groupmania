-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : sam. 04 sep. 2021 à 09:25
-- Version du serveur : 10.4.20-MariaDB
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupmania`
--

-- --------------------------------------------------------

--
-- Structure de la table `Commentaires`
--

CREATE TABLE `Commentaires` (
  `id` int(11) NOT NULL,
  `commentaire` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Posts`
--

INSERT INTO `Posts` (`id`, `title`, `message`, `picture`, `createdAt`, `updatedAt`, `UserId`) VALUES
(42, '1er message', '1er texte', 'http://localhost:3000/images/001.JPG1630735599580.jpg', '2021-09-04 06:06:39', '2021-09-04 06:06:39', 28),
(43, '2eme message', 'texte 2 tout fonctionne-t-il ?', 'http://localhost:3000/images/010.JPG1630736456105.jpg', '2021-09-04 06:07:08', '2021-09-04 06:20:56', 28),
(44, '3eme message', 'texte 3 à corriger avec JSON PARSE', 'http://localhost:3000/images/020_(2).JPG1630736385644.jpg', '2021-09-04 06:07:30', '2021-09-04 06:19:45', 28);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `pseudo`, `email`, `password`, `picture`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'Davy S', 'davysebbah@yahoo.fr', '$2b$10$h1r.gofKa5Ttm.5XVDlXzei3W2Ra7mrQDito8MOhUIo6wUhVpkW/S', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-08-21 13:18:45', '2021-08-21 13:18:45'),
(7, 'Davy S 8', 'davy8sebbah@yahoo.fr', '$2b$10$e4XA.lR0i9Iog8c1df9pX.taOjIBdDIixuD8N4GoQU1yQqID/7qCS', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-08-25 19:49:09', '2021-08-25 19:49:09'),
(8, 'Davy S 9', 'davy9sebbah@yahoo.fr', '$2b$10$OTnfIEajW6bvDcN1YcGcWOHDvy76sDpaJfkM6sMxyYiV/80GoT3ma', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-08-25 19:49:16', '2021-08-25 19:49:16'),
(9, 'Davy S 10', 'davy10sebbah@yahoo.fr', '$2b$10$tosZZmc4G/ozJCIOVkqA9.YHSdt3koPeL7mEEFuyJCr9zQ8zVgvpO', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-08-25 19:49:25', '2021-08-25 19:49:25'),
(11, 'Davy S 2', 'davy2sebbah@yahoo.fr', '$2b$10$W8Jmb8RFzE7l95uMhPH2X.yoD7hkVWU53pcU3b8KwJ5VIluUgiScW', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-08-28 10:20:39', '2021-08-28 10:20:39'),
(13, 'Davy S 12', 'davy12sebbah@yahoo.fr', '$2b$10$Zb2ds7hS6ddmdfV0wC5e0u/tieOija2wh.xe5JYfc8vTE8/mwukHi', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-08-31 16:30:42', '2021-08-31 16:30:42'),
(17, 'Davy S 11', 'davy11sebbah@yahoo.fr', '$2b$10$MQnbrOvU5x3vjEUPKnUthePKBiApqTrqpm8.RZeeORcjBaLZr8jpa', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:40:51', '2021-09-01 19:40:51'),
(18, 'Davy S 6', 'davy6sebbah@yahoo.fr', '$2b$10$n2g2tK.Rx/Pm1t1GzS9x.u55oFQXlscoyuGzIypBL/HZkuS1SjM36', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:44:25', '2021-09-01 19:44:25'),
(19, 'Davy S 3', 'davy3sebbah@yahoo.fr', '$2b$10$fTpTRHG7Y6r1VWpVkZmkWOQ1FV5Deg5ArL4yW4XtD.DIvXpSw1Y7.', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:48:11', '2021-09-01 19:48:11'),
(20, 'Davy S 4', 'davy4sebbah@yahoo.fr', '$2b$10$Ft7weJHpTSRVZHNocBIU/.qLT7vRbMoVu5UEu/YN0m0KPKqVSYk4e', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:49:10', '2021-09-01 19:49:10'),
(21, 'Davy S 5', 'davy5sebbah@yahoo.fr', '$2b$10$dgX626WC7nMuc3hUv3wMXOCCW1KdIqSsMTJZmRP8.fdxwK1ZfJx72', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:50:26', '2021-09-01 19:50:26'),
(22, 'Davy S 13', 'davy13sebbah@yahoo.fr', '$2b$10$BXn60QsO5nEJntEHX/5dT.ZtGgKM5JF0hKRiNGUnuehAHtDsvoQ3W', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:51:30', '2021-09-01 19:51:30'),
(23, 'Davy S 14', 'davy14sebbah@yahoo.fr', '$2b$10$9M3lrWqbc9C7LFpayZwnp.n5XrJSTIa/rWhpajS1M0KT9IyiVF.VG', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:52:21', '2021-09-01 19:52:21'),
(24, 'Davy S 15', 'davy15sebbah@yahoo.fr', '$2b$10$3NoODa.kOmL.3gw8ZIShAOJKEixquLjqCAkunTR3KkzxFJOxf4dY2', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:52:47', '2021-09-01 19:52:47'),
(25, 'Davy S 16', 'davy16sebbah@yahoo.fr', '$2b$10$Gn1x/LQwe7VHLBh3YL.nQ.6vmQWdk1SFfmym5LdafIS.EGxpIWbgK', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 19:53:19', '2021-09-01 19:53:19'),
(26, 'Davy S 17', 'davy17sebbah@yahoo.fr', '$2b$10$4CT2f7jrZ6m42SIibCRGMuUm89WJhheaOXAXYU99sUrDtBWz/3rL.', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 20:00:45', '2021-09-01 20:00:45'),
(27, 'Davy S 18', 'davy18sebbah@yahoo.fr', '$2b$10$JYn3.dNox5IorUoUvSp1n.BoTewk7OyuK90RCOafhLyY/AI5XyGle', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-01 20:03:56', '2021-09-01 20:03:56'),
(28, 'DavyAdmin', 'davyadminsebbah@yahoo.fr', '$2b$10$zWlp4XsgXSbWSmlvW1OpH.1M2oH7nwtuTzw9kujaW3dS6nZpnIOue', 'http://localhost:3000/images/Davy.jpeg', NULL, 1, '2021-09-02 10:10:22', '2021-09-02 10:10:22'),
(29, 'Davy S 19', 'davy19sebbah@yahoo.fr', '$2b$10$U5MWAVqBtvfNgzgouLui2.1cjWDnytyKASUCiTt95dnhIO4mFtOeK', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-02 13:14:37', '2021-09-02 13:14:37'),
(30, 'Davy S 20', 'davy20sebbah@yahoo.fr', '$2b$10$m/Xs5wkwluwOLlva0448BO4L8M4P2L624oCpjFiezTdDXMrelXpea', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-03 17:25:28', '2021-09-03 17:25:28'),
(31, 'Davy S 21', 'davy21sebbah@yahoo.fr', '$2b$10$oM2TpNEjf8NYJE9XLYPI9OENpP4F8kmKSmrE2m5ceNdTc.oNgdYZG', 'http://localhost:3000/images/Davy.jpeg', NULL, 0, '2021-09-03 18:10:29', '2021-09-03 18:10:29');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Commentaires`
--
ALTER TABLE `Commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PostId` (`PostId`);

--
-- Index pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Commentaires`
--
ALTER TABLE `Commentaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Commentaires`
--
ALTER TABLE `Commentaires`
  ADD CONSTRAINT `Commentaires_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Commentaires_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
