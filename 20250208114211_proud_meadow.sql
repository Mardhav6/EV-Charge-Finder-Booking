/*
  # Add Maharashtra EV Charging Stations

  1. Changes
    - Add 50 charging stations across Maharashtra
    - Cover major cities, highways, and tourist destinations
*/

INSERT INTO stations (name, address, latitude, longitude, total_slots) VALUES
-- Mumbai Metropolitan Region
('Tata Power - Worli', 'Worli Sea Face, Mumbai', 19.0234, 72.8172, 6),
('BEST EV - Dadar', 'Dadar TT Circle, Mumbai', 19.0178, 72.8478, 4),
('Adani Electric - Juhu', 'Juhu Beach Road, Mumbai', 19.0883, 72.8265, 5),
('ChargeGrid - Thane', 'Viviana Mall, Thane West', 19.2183, 72.9780, 8),
('MSEDCL - Navi Mumbai', 'Vashi Station, Navi Mumbai', 19.0758, 73.0012, 6),
('Magenta - Airoli', 'Mindspace, Airoli, Navi Mumbai', 19.1541, 72.9995, 4),
('Tata Power - Kalyan', 'Metro Junction Mall, Kalyan', 19.2362, 73.1304, 5),
('BEST EV - Borivali', 'Borivali Station West, Mumbai', 19.2321, 72.8567, 6),

-- Pune Region
('MSEDCL - Shivajinagar', 'FC Road, Pune', 18.5314, 73.8446, 5),
('Tata Power - Koregaon Park', 'Lane 7, Koregaon Park, Pune', 18.5423, 73.8967, 6),
('ChargeGrid - Hadapsar', 'Magarpatta City, Pune', 18.5089, 73.9260, 4),
('Magenta - Baner', 'Baner Road, Pune', 18.5590, 73.7868, 5),
('MSEDCL - Hinjewadi', 'Phase 2, Hinjewadi, Pune', 18.5792, 73.7385, 8),
('Ather Grid - Kothrud', 'Kothrud Main Road, Pune', 18.5074, 73.8077, 4),
('Tata Power - Wakad', 'Wakad Bridge, Pune', 18.5912, 73.7575, 5),

-- Nashik Region
('MSEDCL - College Road', 'College Road, Nashik', 20.0059, 73.7789, 4),
('Tata Power - Gangapur Road', 'Gangapur Road, Nashik', 20.0068, 73.7714, 5),
('ChargeGrid - CIDCO', 'CIDCO Colony, Nashik', 19.9730, 73.7641, 3),
('Magenta - Mumbai Naka', 'Mumbai Naka, Nashik', 19.9891, 73.7738, 4),

-- Nagpur Region
('MSEDCL - Civil Lines', 'Civil Lines, Nagpur', 21.1498, 79.0820, 6),
('Tata Power - Dharampeth', 'Dharampeth, Nagpur', 21.1387, 79.0678, 4),
('ChargeGrid - Sadar', 'Sadar Bazaar, Nagpur', 21.1535, 79.0678, 5),
('Magenta - Wardha Road', 'Wardha Road, Nagpur', 21.1088, 79.0516, 4),

-- Aurangabad Region
('MSEDCL - Jalna Road', 'Jalna Road, Aurangabad', 19.8762, 75.3433, 4),
('Tata Power - CIDCO', 'CIDCO N-1, Aurangabad', 19.8816, 75.3205, 5),
('ChargeGrid - Railway Station', 'Railway Station Road, Aurangabad', 19.8695, 75.3203, 3),

-- Major Highways
('HP - Mumbai-Pune Expressway', 'Food Mall, Lonavala', 18.7548, 73.4065, 8),
('IOCL - NH3', 'Dhule Highway, Nashik', 20.0173, 73.7898, 5),
('BPCL - NH6', 'Amravati Road, Nagpur', 21.1359, 79.0042, 4),
('Reliance - NH9', 'Solapur Highway, Pune', 18.4493, 73.8648, 6),
('Shell - NH4', 'Satara Road, Kolhapur', 16.7050, 74.2433, 5),

-- Tourist Destinations
('MSEDCL - Mahabaleshwar', 'Main Market, Mahabaleshwar', 17.9307, 73.6477, 3),
('Tata Power - Alibag', 'Alibag Beach Road', 18.6414, 72.8722, 4),
('ChargeGrid - Shirdi', 'Shirdi Temple Road', 19.7645, 74.4762, 6),
('Magenta - Matheran', 'Dasturi Point, Matheran', 18.9866, 73.2707, 2),

-- Industrial Areas
('MIDC Chakan', 'MIDC Chakan Phase 2, Pune', 18.7604, 73.8567, 6),
('MIDC Ranjangaon', 'MIDC Ranjangaon, Pune', 18.7749, 74.2287, 4),
('MIDC Taloja', 'MIDC Taloja, Navi Mumbai', 19.0863, 73.1075, 5),
('MIDC Butibori', 'MIDC Butibori, Nagpur', 20.9489, 79.0033, 4),

-- Educational Hubs
('IIT Bombay', 'IIT Area, Powai, Mumbai', 19.1334, 72.9133, 4),
('Pune University', 'University Road, Pune', 18.5527, 73.8285, 5),
('VNIT Nagpur', 'VNIT Campus, Nagpur', 21.1259, 79.0518, 3),

-- Business Districts
('BKC Extension', 'G Block BKC, Mumbai', 19.0692, 72.8697, 8),
('EON IT Park', 'EON Free Zone, Pune', 18.5619, 73.9174, 6),
('Magarpatta', 'Magarpatta City, Pune', 18.5126, 73.9270, 5),
('Hinjewadi Phase 3', 'Hinjewadi Phase 3, Pune', 18.5839, 73.7079, 6),

-- Shopping Malls
('Phoenix Marketcity', 'Viman Nagar, Pune', 18.5599, 73.9179, 5),
('Inorbit Mall', 'Malad West, Mumbai', 19.1859, 72.8404, 4),
('Empress Mall', 'Empress Mall, Nagpur', 21.1458, 79.0882, 3),
('Amanora Mall', 'Amanora Park Town, Pune', 18.5183, 73.9276, 5);