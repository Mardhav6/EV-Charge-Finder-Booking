/*
  # Add More EV Charging Stations

  1. Changes
    - Add more realistic EV charging station data across India
    - Include major cities and highways
*/

INSERT INTO stations (name, address, latitude, longitude, total_slots) VALUES
-- Delhi NCR Region
('Tata Power - Select Citywalk', 'Select Citywalk Mall, Saket, New Delhi', 28.5289, 77.2195, 4),
('EESL - Lodhi Road', 'Lodhi Road Complex, New Delhi', 28.5921, 77.2271, 3),
('IOCL EV Station - Dwarka', 'Sector 9, Dwarka, New Delhi', 28.5733, 77.0634, 5),
('Fortum - Gurugram', 'DLF Cyber City, Gurugram', 28.4959, 77.0877, 6),

-- Mumbai Region
('Tata Power - BKC', 'Bandra Kurla Complex, Mumbai', 19.0654, 72.8679, 8),
('Adani - Powai', 'Hiranandani Gardens, Powai, Mumbai', 19.1196, 72.9051, 4),
('BEST EV Hub - Colaba', 'Colaba Bus Depot, Mumbai', 18.9219, 72.8326, 5),
('ChargeZone - Andheri', 'Andheri East Metro Station, Mumbai', 19.1069, 72.8700, 6),

-- Bangalore Region
('BESCOM - MG Road', 'MG Road Metro Station, Bangalore', 12.9756, 77.6097, 5),
('Ather Grid - Indiranagar', '100 Feet Road, Indiranagar, Bangalore', 12.9784, 77.6408, 4),
('Tata Power - Whitefield', 'ITPL Main Road, Whitefield, Bangalore', 12.9698, 77.7500, 6),
('Sun Mobility - Electronic City', 'Electronic City Phase 1, Bangalore', 12.8458, 77.6692, 4),

-- Chennai Region
('TANGEDCO - Anna Nagar', 'Anna Nagar West, Chennai', 13.0850, 80.2101, 4),
('Tata Power - OMR', 'Sholinganallur Junction, OMR, Chennai', 12.9010, 80.2279, 5),
('Ather Grid - T Nagar', 'Pondy Bazaar, T Nagar, Chennai', 13.0418, 80.2341, 3),
('ChargeZone - ECR', 'VGP Golden Beach, ECR, Chennai', 12.9514, 80.2525, 4),

-- Highway Corridors
('HP EV Station - NH1', 'NH1 Karnal Highway, Sonipat', 28.9931, 77.0151, 6),
('IOCL Highway Grid - NH8', 'NH8 Mumbai Highway, Vadodara', 22.3072, 73.1812, 4),
('Bharat Petroleum - NH4', 'NH4 Bangalore Highway, Kolhapur', 16.7050, 74.2433, 5),
('Reliance BP - NH16', 'NH16 Chennai Highway, Vijayawada', 16.5062, 80.6480, 4),

-- Other Major Cities
('BPCL - Hyderabad', 'Hitech City, Hyderabad', 17.4435, 78.3772, 6),
('Tata Power - Pune', 'Hinjewadi IT Park, Pune', 18.5793, 73.7379, 5),
('Fortum - Ahmedabad', 'SG Highway, Ahmedabad', 23.0225, 72.5714, 4),
('IOCL EV Hub - Kolkata', 'Salt Lake City, Kolkata', 22.5726, 88.4159, 5);