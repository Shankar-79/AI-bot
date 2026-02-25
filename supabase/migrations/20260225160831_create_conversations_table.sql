/*
  # Create conversations table for AI chatbot

  1. New Tables
    - `conversations`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `message` (text) - The message content
      - `role` (text) - Either 'user' or 'assistant'
      - `created_at` (timestamptz) - When the message was created

  2. Security
    - Enable RLS on `conversations` table
    - Add public policy allowing all operations for demonstration purposes
    - In production, replace with proper authentication-based policies
*/

CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations"
  ON conversations
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
