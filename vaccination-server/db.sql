CREATE TABLE `appointment` (
    `id` int NOT NULL AUTO_INCREMENT,
    `start` datetime DEFAULT NULL,
    `end` datetime DEFAULT NULL,
    `vaccine_id` int DEFAULT NULL,
    `vaccine_category` varchar(100) DEFAULT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `appointment_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `appointment_place` (
    `id` int NOT NULL AUTO_INCREMENT,
    `appointment_id` int DEFAULT NULL,
    `vaccination_place_id` int DEFAULT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `appointment_place_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `booking` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int DEFAULT NULL,
    `vaccine_id` int DEFAULT NULL,
    `vaccination_place_id` int DEFAULT NULL,
    `made_date` datetime DEFAULT NULL,
    `create_time` datetime DEFAULT NULL,
    `vaccine_status` int DEFAULT NULL,
    `risk_level` int DEFAULT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `booking_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `rule` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) DEFAULT NULL,
     PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `age` int DEFAULT NULL,
    `gender` varchar(20) DEFAULT NULL,
    `username` varchar(50) DEFAULT NULL,
    `phone` varchar(100) DEFAULT NULL,
    `email` varchar(100) DEFAULT NULL,
    `password` varchar(100) DEFAULT NULL,
    `name` varchar(100) DEFAULT NULL,
    `vaccination_status` int DEFAULT NULL,
    `country` varchar(100) DEFAULT NULL,
    `state` varchar(100) DEFAULT NULL,
    `town` varchar(100) DEFAULT NULL,
    `street` varchar(100) DEFAULT NULL,
    `postcode` varchar(50) DEFAULT NULL,
     PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `vaccination_place` (
    `id` int NOT NULL AUTO_INCREMENT,
    `address` varchar(500) DEFAULT NULL,
    `capacity` int DEFAULT NULL,
    `name` varchar(100) DEFAULT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `vaccination_place_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `vaccine` (
    `id` int NOT NULL AUTO_INCREMENT,
    `category` varchar(100) DEFAULT NULL,
    `status` int DEFAULT NULL,
    `introduction` text,
     PRIMARY KEY (`id`),
     UNIQUE KEY `vaccine_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




INSERT INTO vaccine (id, category, status, introduction) VALUES (1, 'Pfizer-BioNTech', 1, 'The Pfizer COVID-19 vaccine requires two doses, given 3 weeks (21 days) apart. If needed, the second dose can be given later than that. There is no maximum time limit between the first and second doses. But the closer you are to 3 weeks apart, the better. Immune response varies from person to person, but you are considered fully protected 2 weeks after receiving the second dose.');
INSERT INTO vaccine (id, category, status, introduction) VALUES (2, 'Moderna', 1, 'The Moderna COVID-19 vaccine also requires two doses, but they’re given 4 weeks (28 days) apart. Similarly, you’ll need to wait at least 2 weeks after the second shot to be considered fully vaccinated. You’re also able to get the second dose later than 4 weeks after the first dose, if needed.');
INSERT INTO vaccine (id, category, status, introduction) VALUES (3, 'Johnson & Johnson', 1, 'Unlike the mRNA vaccines, the Johnson & Johnson COVID-19 vaccine initially only requires one dose, making it a more convenient option for many people. You’re considered fully protected 2 weeks after you receive the vaccine.');

INSERT INTO vaccination_place (id, address, capacity, name) VALUES (1, 'no123 street', 100, 'no1');
INSERT INTO vaccination_place (id, address, capacity, name) VALUES (2, 'no456 street', 200, 'no2');

INSERT INTO appointment (id, start, end, vaccine_id, vaccine_category) VALUES (1, '2021-10-31 00:00:00', '2021-11-20 00:00:00', 1, 'Pfizer-BioNTech');
INSERT INTO appointment (id, start, end, vaccine_id, vaccine_category) VALUES (2, '2021-11-22 00:00:00', '2021-12-20 00:00:00', 1, 'Pfizer-BioNTech');
INSERT INTO appointment (id, start, end, vaccine_id, vaccine_category) VALUES (3, '2021-11-22 00:00:00', '2021-12-20 00:00:00', 2, 'Moderna');
INSERT INTO appointment (id, start, end, vaccine_id, vaccine_category) VALUES (4, '2021-10-31 00:00:00', '2021-11-20 00:00:00', 3, 'Johnson & Johnson');
INSERT INTO appointment (id, start, end, vaccine_id, vaccine_category) VALUES (5, '2021-11-22 00:00:00', '2021-12-20 00:00:00', 3, 'Johnson & Johnson');
INSERT INTO appointment (id, start, end, vaccine_id, vaccine_category) VALUES (6, '2021-10-31 00:00:00', '2021-11-20 00:00:00', 2, 'Moderna');

INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (1, 1, 1);
INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (2, 1, 2);
INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (3, 2, 2);
INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (4, 3, 1);
INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (5, 3, 2);
INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (6, 4, 2);
INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (7, 5, 1);
INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (8, 5, 2);
INSERT INTO appointment_place (id, appointment_id, vaccination_place_id) VALUES (9, 6, 2);