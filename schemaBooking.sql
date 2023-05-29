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
VALUES 
('Tale of US', 'https://deeptechminimal.com/wp-content/uploads/2023/04/Tale-Of-Us-au-Parc-Jean-Drapeau.webp', '3-day electronic dance music festival featuring top DJs and live performances. Italian techno duo Tale Of Us will return to Hï Ibiza for another season of carefully curated', '2023-03-24', '2023-03-24 16:00:00', '2023-03-26 23:00:00', 400, -80.192714, 25.791373, 'Music', 'Martin Garrix, The Chainsmokers, David Guetta, Carl Cox, Armin van Buuren', 'Bayfront Park, Miami, FL', 165000, 5.3),
('Music Festival', 'https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?size=626&ext=jpg', 'Join us for a day of live music and entertainment!', '2023-06-15', '2023-06-15 18:00:00', '2023-06-15 23:00:00', 25, -73.987456, 40.748817, 'Music', 'Artist A, Artist B, Artist C', 'Central Park, New York City', 1000, 4),
('Ultra Music Festival Miami', 'https://ultramusicfestival.com/wp-content/uploads/2019/04/miami-gallery-2019-2-1600x900.jpg', '3-day electronic dance music festival featuring top DJs and live performances.', '2023-03-24', '2023-03-24 16:00:00', '2023-03-26 23:00:00', 400, -80.192714, 25.791373, 'Music', 'Martin Garrix, The Chainsmokers, David Guetta, Carl Cox, Armin van Buuren', 'Bayfront Park, Miami, FL', 165000, 4.9),
('Tomorrowland Belgium', 'https://www.festivalseason.es/wp-content/uploads/2022/12/tomorrowland-guide-2023-1536x864.jpg', '3-day electronic dance music festival featuring top DJs and live performances.', '2023-07-21', '2023-07-21 12:00:00', '2023-07-23 23:00:00', 325, 4.401819, 51.091977, 'Music', 'Dimitri Vegas & Like Mike, Afrojack, Charlotte de Witte, Amelie Lens, Paul van Dyk', 'De Schorre, Boom, Belgium', 400000, 4.8),
('Electric Daisy Carnival Las Vegas', 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/13120224/EDC-hero-image-972x486.jpg', '3-day electronic dance music festival featuring top DJs and live performances.', '2023-05-19', '2023-05-19 16:00:00', '2023-05-21 23:00:00', 400, -115.151767, 36.169202, 'Music', 'Tiësto, Marshmello, deadmau5, Armin van Buuren, Martin Garrix', 'Las Vegas Motor Speedway, Las Vegas, NV', 400000, 4.7),
('Sónar Barcelona', 'https://www.shbarcelona.com/blog/en/wp-content/uploads/2022/05/sonar-festival-barcelona-2022-810x540-1.jpg', '3-day electronic music festival featuring DJs, live performances and multimedia art.', '2023-06-15', '2023-06-15 16:00:00', '2023-06-17 23:00:00', 150, 2.156789, 41.389813, 'Music', 'The Chemical Brothers, Eric Prydz, Nina Kraviz, Four Tet, Charlotte de Witte', 'Fira Montjuïc, Barcelona, Spain', 80000, 4.5),
('Awakenings Festival Amsterdam', 'https://www.thedjrevolution.com/wp-content/uploads/elementor/thumbs/photo-of-the-main-stage-at-Awakenings-spring-festival-pz817tqutlkkgcb06kil67jyi81atllrhkuyni1d26.jpg', '2-day techno music festival featuring top DJs and live performances.', '2023-06-24', '2023-06-24 12:00:00', '2023-06-25 23:00:00', 90, 4.939700, 52.314514, 'Music', 'Adam Beyer, Amelie Lens, Charlotte de Witte, Richie Hawtin, Nina Kraviz', 'Spaarnwoude, Amsterdam, Netherlands', 60000, 4.6),
('Movement Electronic Music Festival Detroit', 'https://mixmag.net/assets/uploads/images/_full/movement-electronic-music-festival-Mark-Hicks_zps7vwojjer.jpg', '3-dayelectronic music festival featuring top DJs and live performances.', '2023-05-27', '2023-05-27 15:00:00', '2023-05-29 23:00:00', 150, -83.056737, 42.331429, 'Music', 'Carl Craig, Richie Hawtin, ANNA, Charlotte de Witte, Amelie Lens', 'Hart Plaza, Detroit, MI', 100000, 4.7),
('Coachella Valley Music and Arts Festival', 'https://www.billboard.com/files/media/coachella-valley-music-and-arts-festival-2019-lineup-billboard-1548.jpg', '3-day music and arts festival featuring top artists and performers.', '2023-04-14', '2023-04-14 12:00:00', '2023-04-16 23:00:00', 475, -116.238273, 33.680300, 'Music', 'Rihanna, Frank Ocean, Travis Scott, Lizzo, Tame Impala', 'Empire Polo Club, Indio, CA', 125000, 4.8),
('Cannes Film Festival', 'https://www.filmfestivals.com/files/cannes2022.jpg', 'Annual film festival showcasing the works of international filmmakers.', '2023-05-17', '2023-05-17 10:00:00', '2023-05-28 23:00:00', 1000, 7.017369, 43.552849, 'Film', 'TBA', 'Palais des Festivals et des Congrès, Cannes, France', 40000, 4.9),
('Toronto International Film Festival', 'https://images.squarespace-cdn.com/content/v1/5d8c58f4d3c3d2000135e3d1/1569810131112-3L9P7PGDGR6I6U2H3QFJ/ke17ZwdGBToddI8pDm48kK0dGDsLZfYn4t1ZDzj0q2t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfYRJn5vdLzBd7qJYjxTGF9Qd4J6p4nt9Wt5v6IKaQfFwZI7GZg5fS0a3A/TIFF+2019+Main+Poster.jpg', 'Annual film festival showcasing the works of international filmmakers.', '2023-09-07', '2023-09-07 10:00:00', '2023-09-17 23:00:00', 500, -79.383184, 43.651070, 'Film', 'TBA', 'Various locations in Toronto, Canada', 30000, 4.7),
('New York Fashion Week', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nyfw-ss22-harpers-bazaar-1626277109.jpg', 'Annual fashion event showcasing the latest collections from top designers.', '2023-09-08', '2023-09-08 10:00:00', '2023-09-15 23:00:00', 500, -74.005966, 40.712776, 'Fashion', 'TBA', 'Various locations in New York City, NY', 50000, 4.8);

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