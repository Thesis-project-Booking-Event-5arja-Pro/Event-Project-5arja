CREATE SCHEMA IF NOT EXISTS `ed` DEFAULT CHARACTER SET utf8mb3 ;
USE `ed` ;
CREATE TABLE IF NOT EXISTS `ed`.`user` 
(
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  phone_number VARCHAR(20),
  img LONGTEXT NULL DEFAULT NULL
  -- Add other user-related fields here
);

-- Create Event table if not exists
CREATE TABLE IF NOT EXISTS `ed`.`event` (
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  title LONGTEXT NOT NULL,
  `img` LONGTEXT NULL ,
  description LONGTEXT,
  date DATE,
 `start_time` TIMESTAMP NOT NULL,
  `end_time` TIMESTAMP NOT NULL,
  `price` INT NOT NULL,
  `longitude` FLOAT,
  `latitude` FLOAT,
  `category` LONGTEXT NOT NULL,
  `lineUp` LONGTEXT NOT NULL,
  location LONGTEXT,
  capacity INT,
  rating INT
  -- Add other event-related fields here
);
INSERT INTO `event` (title, img, description, date, start_time, end_time, price, longitude, latitude, category, lineUp, location, capacity, rating)
VALUES ('Music Festival', 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg', 'Join us for a day of live music and entertainment!', '2023-06-15', '2023-06-15 18:00:00', '2023-06-15 23:00:00', 25, -73.987456, 40.748817, 'Music', 'Artist A, Artist B, Artist C', 'Central Park, New York City', 1000, 4);


-- Create Booking table if not exists
CREATE TABLE IF NOT EXISTS `ed`.`Booking`   (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_id INT,
  booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('confirmed', 'canceled', 'pending') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (event_id) REFERENCES Event(event_id)
);

-- Create Liked table if not exists
CREATE TABLE IF NOT EXISTS `ed`.`Liked` (
  liked_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_id INT,
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (event_id) REFERENCES Event(event_id)
);