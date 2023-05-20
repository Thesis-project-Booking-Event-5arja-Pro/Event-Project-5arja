CREATE SCHEMA IF NOT EXISTS `ed` DEFAULT CHARACTER SET utf8mb3 ;
USE `ed` ;

CREATE TABLE IF NOT EXISTS `ed`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;


INSERT INTO `ed`.`admin` (`email`, `password`) VALUES ('yassinbez@gmail.com', 'password123');

CREATE TABLE IF NOT EXISTS `ed`.`client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `phoneNumber` VARCHAR(45) NOT NULL,
  `friendList` LONGTEXT NULL DEFAULT NULL,
  `favorite_events` VARCHAR(255),
  `img` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARACTER SET = utf8mb3;

CREATE TABLE IF NOT EXISTS `ed`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `eventName` VARCHAR(45) NOT NULL,
  `img` LONGTEXT NOT NULL,
  `video` LONGTEXT NULL DEFAULT NULL,
  `description` LONGTEXT NOT NULL,
  `lineUp` LONGTEXT NOT NULL,
  `start_time` TIMESTAMP NOT NULL,
  `end_time` TIMESTAMP NOT NULL,
  `price` INT NOT NULL,
  `grade` INT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `longitude` FLOAT,
  `latitude` FLOAT,
  `admin_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_event_admin1_idx` (`admin_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_admin1`
    FOREIGN KEY (`admin_id`)
    REFERENCES `ed`.`admin` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `ed`.`event` (`eventName`, `img`, `video`, `description`, `lineUp`,  `start_time`, `end_time`, `price`, `grade`, `category`, `location`, `longitude`, `latitude`, `admin_id`) 
VALUES 
('After Life', 'https://www.edmtunes.com/wp-caontent/uploads/2023/01/324731499_197452799530365_119315485126713723_n-696x870.jpg', NULL, 'Event 1 description', 'Tale Of Us, Adriatique, Mind Against', '2023-05-18 10:00:00', '2023-05-18 12:00:00', 100, 5, 'Category 1', 'Location 1', 1.23, 4.56, 1),
('Tale Of Us', 'https://i0.wp.com/thegroovecartel.com/wp-content/uploads/2022/10/rsz_1unnamed.jpg?resize=585%2C775&ssl=1', NULL, 'For two decades, Lightning in a Bottle has continued to spark something deep within the hearts of those who make the journey. It’s a temporary event, but a steady energetic force in our collective consciousness. A magical creative wonderland where new friendships are forged and existing ones set in stone. We’ve created a legacy from the ground up since — one with a loyal community of free spirits chasing the imaginative, boundary-breaking rush we felt at our very first celebration. Join us for the 20th Anniversary of Lightning in a Bottle this Memorial Day Weekend.', 'Jamie Jones, Adriatique, Mind Against', '2023-05-18 10:00:00', '2023-05-18 12:00:00', 100, 5, 'Hard Techno', '114 Rue Ali Ben Bechir Ibn Salem', 45.8942635655478289,  10.18710378287,1),
('Techno Madness', 'https://imgproxy.ra.co/_/quality:66/w:1500/rt:fill/aHR0cHM6Ly9pbWFnZXMucmEuY28vYjExYmUxMTliMTNiM2VjOTc0MTQ0MzBlYzc3ODNhYWFlMzg0MDMxZi5wbmc=', 'https://example.com/event1_video.mp4', 'Join us for a night of Techno Madness! Experience the exhilarating beats and mesmerizing melodies from renowned techno artists. Get ready to dance the night away in a vibrant atmosphere filled with like-minded music enthusiasts.', 'Charlotte de Witte, Amelie Lens, Pan-Pot', '2023-05-25 22:00:00', '2023-05-26 06:00:00', 80, 4, 'Techno', 'Club XYZ', 10.123456, 36.789012, 1),
('Underground Rave', 'https://imgproxy.ra.co/_/quality:66/w:1500/rt:fill/aHR0cHM6Ly9pbWFnZXMucmEuY28vOWE3N2NkNGNlZjhkMzAzYjViMTkwN2YzMjQ4YTg3MWMxMDU5YjNhOC5qcGc=', 'https://example.com/event2_video.mp4', 'Step into the underground scene with our electrifying Underground Rave! Immerse yourself in the deep and dark sounds of techno music as we journey through the night. Expect mind-bending visuals and an intimate setting that will leave you craving for more.', 'Nina Kraviz, Marcel Dettmann, Ben Klock', '2023-06-02 23:00:00', '2023-06-03 05:00:00', 60, 4, 'Techno', 'Warehouse District', 10.987654, 36.543210, 1),
('Techno Revolution', 'https://www.jonesaroundtheworld.com/wp-content/uploads/2019/03/Best-Techno-Festivals-.jpg', 'https://example.com/event3_video.mp4', 'Witness the Techno Revolution as we push the boundaries of electronic music. Renowned DJs and producers will unleash their cutting-edge sounds, creating a futuristic experience like no other. Prepare to be part of the revolution!', 'Adam Beyer, Joseph Capriati, Amelie Lens', '2023-06-10 21:00:00', '2023-06-11 05:00:00', 100, 5, 'Techno', 'Arena Club', 10.555555, 36.111111, 1),
('Techno Vibes', 'https://europebookings.com/wp-content/uploads/forbidden-forest-festival-dancing-confetti.jpg', 'https://example.com/event4_video.mp4', 'Indulge in the hypnotic Techno Vibes that will take you on a musical journey like no other. Lose yourself in the pulsating rhythms and immersive atmosphere created by talented techno artists. Let the music guide your soul.', 'Chris Liebing, Ellen Allien, Rebekah', '2023-06-16 22:30:00', '2023-06-17 04:30:00', 70, 4, 'Techno', 'The Underground Lounge', 10.222222, 36.333333, 1),
('Techno Fusion', 'https://seatgeek.com/images/image_uploads/category/techno-medium.jpg', 'https://example.com/event5_video.mp4', 'Experience the dynamic fusion of techno beats and live performances at Techno Fusion. Discover the synergy between electronic sounds and various musical instruments as talented musicians come together to create an unforgettable night.', 'Solomun, Stephan Bodzin, Mind Against', '2023-06-23 20:00:00', '2023-06-24 03:00:00', 90, 4, 'Techno', 'Concert Hall', 10.777777, 36.666666, 1),
('Techno Playground', 'https://img.traveltriangle.com/blog/wp-content/uploads/2019/01/techno-festivals-in-europe-cover.jpg', 'https://example.com/event6_video.mp4', 'Welcome to the Techno Playground, where you can unleash your inner child and dance to the infectious beats of techno music. Prepare for an immersive experience filled with interactive installations, colorful visuals, and non-stop dancing. Let your imagination run wild!', 'Maceo Plex, Amelie Lens, Tale Of Us', '2023-07-01 19:00:00', '2023-07-02 03:00:00', 75, 4, 'Techno', 'Park Plaza', 10.444444, 36.777777, 1),
('Techno Groove', 'https://static.toiimg.com/photo/95373891.cms', 'https://example.com/event7_video.mp4', 'Get ready to groove to the hypnotic Techno Groove that will keep you dancing all night long. Renowned DJs will take you on a sonic journey through thumping basslines, melodic synths, and infectious rhythms. Let the music move your body!', 'Joseph Capriati, Pan-Pot, Charlotte de Witte', '2023-07-08 22:00:00', '2023-07-09 04:00:00', 80, 4, 'Techno', 'The Warehouse', 10.666666, 36.888888, 1),
('Techno Utopia', 'https://www.digitalmusicnews.com/wp-content/uploads/2021/05/english-concert-covid-feat.jpeg', 'https://example.com/event8_video.mp4', "Embark on a journey to Techno Utopia, where the boundaries of reality are blurred by mesmerizing sounds and visuals. Lose yourself in the euphoria of techno music as you dance alongside fellow utopians.  an otherworldly experience you won't want to miss!", 'Amelie Lens, Adam Beyer, Tale Of Us', '2023-07-15 21:30:00', '2023-07-16 05:30:00', 100, 5, 'Techno', 'Secret Location', 10.333333, 36.999999, 1);


CREATE TABLE IF NOT EXISTS `ed`.`event_attendance` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_event_attendance_client_idx` (`client_id` ASC) VISIBLE,
  INDEX `fk_event_attendance_event_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_attendance_client`
    FOREIGN KEY (`client_id`)
    REFERENCES `ed`.`client` (`id`),
  CONSTRAINT `fk_event_attendance_event`
    FOREIGN KEY (`event_id`)
    REFERENCES `ed`.`event` (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb3;

CREATE TABLE IF NOT EXISTS `ed`.`feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` LONGTEXT NOT NULL,
  `rating` INT NOT NULL,
  `client_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_feedback_client_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_feedback_client`
    FOREIGN KEY (`client_id`)
    REFERENCES `ed`.`client` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARACTER SET = utf8mb3;

CREATE TABLE IF NOT EXISTS `ed`.`ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `price` INT NOT NULL,
  `img` LONGTEXT NULL DEFAULT NULL,
  `client_id` INT NULL DEFAULT NULL,
  `event_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ticket_client_idx` (`client_id` ASC) VISIBLE,
  INDEX `fk_ticket_event_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_ticket_client`
    FOREIGN KEY (`client_id`)
    REFERENCES `ed`.`client` (`id`),
  CONSTRAINT `fk_ticket_event`
    FOREIGN KEY (`event_id`)
    REFERENCES `ed`.`event` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARACTER SET = utf8mb3;
