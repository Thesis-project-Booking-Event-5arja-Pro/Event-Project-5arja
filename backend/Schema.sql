-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------

-- Schema ed
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ed
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ed` DEFAULT CHARACTER SET utf8mb3 ;
USE `ed` ;

-- -----------------------------------------------------
-- Table `ed`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ed`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `ed`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ed`.`client` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `phoneNumber` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `friendList` LONGTEXT NULL DEFAULT NULL,
  `historyEvent` VARCHAR(45) NULL DEFAULT NULL,
  `address` LONGTEXT NOT NULL,
  `img` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `ed`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ed`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` LONGTEXT NOT NULL,
  `likes` INT NOT NULL,
  `client_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_post_client_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_client`
    FOREIGN KEY (`client_id`)
    REFERENCES `ed`.`client` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `ed`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ed`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` LONGTEXT NOT NULL,
  `likes` INT NULL DEFAULT NULL,
  `post_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_post_idx` (`post_id` ASC) VISIBLE,
  INDEX `fk_comments_client_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_comments_client`
    FOREIGN KEY (`client_id`)
    REFERENCES `ed`.`client` (`id`),
  CONSTRAINT `fk_comments_post`
    FOREIGN KEY (`post_id`)
    REFERENCES `ed`.`post` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `ed`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ed`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `eventName` VARCHAR(45) NOT NULL,
  `img` LONGTEXT NOT NULL,
  `video` LONGTEXT NULL DEFAULT NULL,
  `description` LONGTEXT NOT NULL,
  `date` DATETIME NOT NULL,
  `price` INT NOT NULL,
  `grade` INT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `admin_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_event_admin1_idx` (`admin_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_admin1`
    FOREIGN KEY (`admin_id`)
    REFERENCES `ed`.`admin` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `ed`.`event_attendance`
-- -----------------------------------------------------
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
    REFERENCES `ed`.`event` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `ed`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ed`.`feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` LONGTEXT NOT NULL,
  `rating` INT NOT NULL,
  `client_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_feedback_client_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_feedback_client`
    FOREIGN KEY (`client_id`)
    REFERENCES `ed`.`client` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `ed`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ed`.`ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `price` INT NOT NULL,
  `seatNumber` INT NOT NULL,
  `isSold` TINYINT(1) NOT NULL DEFAULT '0',
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
    REFERENCES `ed`.`event` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
