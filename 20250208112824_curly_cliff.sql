/*
  # Initial Schema for EV Charging Station Finder

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text)
      - full_name (text)
      - created_at (timestamp)
    
    - stations
      - id (uuid, primary key)
      - name (text)
      - address (text)
      - latitude (float8)
      - longitude (float8)
      - total_slots (int)
      - created_at (timestamp)
    
    - bookings
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - station_id (uuid, foreign key)
      - start_time (timestamp)
      - end_time (timestamp)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude float8 NOT NULL,
  longitude float8 NOT NULL,
  total_slots int NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  station_id uuid REFERENCES stations NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Enable Row Level Security
ALTER TABLE stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for stations
CREATE POLICY "Stations are viewable by everyone"
  ON stations FOR SELECT
  TO public
  USING (true);

-- Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample stations
INSERT INTO stations (name, address, latitude, longitude, total_slots) VALUES
('EV Station Delhi Central', 'Connaught Place, New Delhi', 28.6329, 77.2195, 5),
('Green Charge Mumbai', 'Bandra West, Mumbai', 19.0596, 72.8295, 3),
('Eco Station Bangalore', 'MG Road, Bangalore', 12.9716, 77.5946, 4),
('Power Hub Chennai', 'Anna Nagar, Chennai', 13.0827, 80.2707, 3);