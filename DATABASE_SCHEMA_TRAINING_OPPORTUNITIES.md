# Database Schema for Training Opportunities Component

This document outlines the database schema needed to store the hardcoded data from the `TrainingOpportunities.jsx` component.

## Overview

The component currently has three types of data:
1. **Workshops/Training Events** - Educational workshops and training sessions
2. **Grants/Funding** - Funding opportunities and grants
3. **Partners** - Partner organizations

---

## 1. Workshops/Training Events Table

**Table Name:** `training_events` or `workshops`

### Columns:

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | INTEGER / BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| `title` | VARCHAR(255) | NOT NULL | Event title (e.g., "Climate-Resilient Maize Farming") |
| `description` | TEXT | NOT NULL | Detailed description of the event |
| `date` | DATE / DATETIME | NULLABLE | Event date (currently stored as string "Oct 12, 2023") |
| `location` | VARCHAR(255) | NOT NULL | Event location (e.g., "Nakuru, Kenya") |
| `latitude` | DECIMAL(10,8) | NULLABLE | Latitude coordinate for event location |
| `longitude` | DECIMAL(11,8) | NULLABLE | Longitude coordinate for event location |
| `type` | ENUM('Workshop', 'Training') | NOT NULL | Type of event |
| `image_url` | VARCHAR(500) | NULLABLE | URL to the event image |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |
| `is_active` | BOOLEAN | DEFAULT TRUE | Whether the event is currently active/visible |
| `registration_url` | VARCHAR(500) | NULLABLE | URL for registration (if external) |

### Additional Recommended Columns:

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `start_time` | TIME | NULLABLE | Event start time |
| `end_time` | TIME | NULLABLE | Event end time |
| `end_date` | DATE | NULLABLE | Event end date (for multi-day events) |
| `capacity` | INTEGER | NULLABLE | Maximum number of participants |
| `price` | DECIMAL(10,2) | NULLABLE | Event price (if paid) |
| `currency` | VARCHAR(3) | DEFAULT 'USD' | Currency code |
| `organizer` | VARCHAR(255) | NULLABLE | Organizing entity |
| `contact_email` | VARCHAR(255) | NULLABLE | Contact email |
| `contact_phone` | VARCHAR(50) | NULLABLE | Contact phone |
| `tags` | JSON / TEXT | NULLABLE | Array of tags for filtering |
| `featured` | BOOLEAN | DEFAULT FALSE | Whether to feature on homepage |

### SQL Example:

```sql
CREATE TABLE training_events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE,
  start_time TIME,
  end_time TIME,
  end_date DATE,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  type ENUM('Workshop', 'Training') NOT NULL,
  image_url VARCHAR(500),
  registration_url VARCHAR(500),
  capacity INT,
  price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  organizer VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  tags JSON,
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_date (date),
  INDEX idx_type (type),
  INDEX idx_location (location),
  INDEX idx_featured (featured),
  INDEX idx_is_active (is_active),
  INDEX idx_coordinates (latitude, longitude)
);
```

---

## 2. Grants/Funding Table

**Table Name:** `grants` or `funding_opportunities`

### Columns:

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | INTEGER / BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| `title` | VARCHAR(255) | NOT NULL | Grant title (e.g., "Smallholder Innovation Grant") |
| `badge` | VARCHAR(50) | NOT NULL | Badge label (e.g., "Funding", "Grant") |
| `description` | TEXT | NOT NULL | Detailed description of the grant |
| `amount` | VARCHAR(255) | NULLABLE | Grant amount as string (e.g., "Up to $10,000", "Flexible Grants") |
| `amount_min` | DECIMAL(15,2) | NULLABLE | Minimum grant amount (for filtering/sorting) |
| `amount_max` | DECIMAL(15,2) | NULLABLE | Maximum grant amount (for filtering/sorting) |
| `currency` | VARCHAR(3) | DEFAULT 'USD' | Currency code |
| `deadline` | DATE | NULLABLE | Application deadline |
| `deadline_text` | VARCHAR(255) | NULLABLE | Human-readable deadline (e.g., "Open Rolling Basis") |
| `image_url` | VARCHAR(500) | NULLABLE | URL to the grant image |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |
| `is_active` | BOOLEAN | DEFAULT TRUE | Whether the grant is currently active/visible |

### Additional Recommended Columns:

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `application_url` | VARCHAR(500) | NULLABLE | URL to apply for the grant |
| `eligibility_criteria` | TEXT | NULLABLE | Eligibility requirements |
| `requirements` | TEXT | NULLABLE | Application requirements |
| `funding_type` | ENUM('Grant', 'Loan', 'Equity', 'Other') | NULLABLE | Type of funding |
| `sector` | VARCHAR(255) | NULLABLE | Target sector (e.g., "Agriculture", "Technology") |
| `target_audience` | VARCHAR(255) | NULLABLE | Target audience (e.g., "Women-led", "Smallholders") |
| `organization` | VARCHAR(255) | NULLABLE | Grant provider organization |
| `contact_email` | VARCHAR(255) | NULLABLE | Contact email |
| `contact_phone` | VARCHAR(50) | NULLABLE | Contact phone |
| `tags` | JSON / TEXT | NULLABLE | Array of tags for filtering |
| `featured` | BOOLEAN | DEFAULT FALSE | Whether to feature on homepage |
| `is_rolling` | BOOLEAN | DEFAULT FALSE | Whether it's a rolling deadline |

### SQL Example:

```sql
CREATE TABLE grants (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  badge VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  amount VARCHAR(255),
  amount_min DECIMAL(15,2),
  amount_max DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'USD',
  deadline DATE,
  deadline_text VARCHAR(255),
  is_rolling BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(500),
  application_url VARCHAR(500),
  eligibility_criteria TEXT,
  requirements TEXT,
  funding_type ENUM('Grant', 'Loan', 'Equity', 'Other'),
  sector VARCHAR(255),
  target_audience VARCHAR(255),
  organization VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  tags JSON,
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_deadline (deadline),
  INDEX idx_funding_type (funding_type),
  INDEX idx_featured (featured),
  INDEX idx_is_active (is_active),
  INDEX idx_is_rolling (is_rolling)
);
```

---

## 3. Partners Table

**Table Name:** `partners` or `collaboration_partners`

### Columns:

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | INTEGER / BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Partner organization name (e.g., "KALRO", "ILRI") |
| `initial` | VARCHAR(10) | NULLABLE | Single letter or abbreviation for display |
| `logo_url` | VARCHAR(500) | NULLABLE | URL to partner logo image |
| `website_url` | VARCHAR(500) | NULLABLE | Partner organization website |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Last update timestamp |
| `display_order` | INTEGER | DEFAULT 0 | Order for display (lower numbers first) |
| `is_active` | BOOLEAN | DEFAULT TRUE | Whether the partner is currently displayed |

### Additional Recommended Columns:

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `description` | TEXT | NULLABLE | Partner description |
| `partnership_type` | VARCHAR(100) | NULLABLE | Type of partnership |
| `contact_email` | VARCHAR(255) | NULLABLE | Contact email |
| `contact_phone` | VARCHAR(50) | NULLABLE | Contact phone |

### SQL Example:

```sql
CREATE TABLE partners (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  initial VARCHAR(10),
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  description TEXT,
  partnership_type VARCHAR(100),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_display_order (display_order),
  INDEX idx_is_active (is_active)
);
```

---

## Relationships & Additional Tables

### User Registrations Table (for tracking workshop registrations)

**Table Name:** `training_registrations`

```sql
CREATE TABLE training_registrations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  training_event_id BIGINT NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'cancelled', 'attended') DEFAULT 'pending',
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (training_event_id) REFERENCES training_events(id),
  UNIQUE KEY unique_registration (user_id, training_event_id),
  INDEX idx_user_id (user_id),
  INDEX idx_training_event_id (training_event_id),
  INDEX idx_status (status)
);
```

### Grant Applications Table (for tracking grant applications)

**Table Name:** `grant_applications`

```sql
CREATE TABLE grant_applications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  grant_id BIGINT NOT NULL,
  application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected', 'withdrawn') DEFAULT 'draft',
  application_data JSON,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (grant_id) REFERENCES grants(id),
  INDEX idx_user_id (user_id),
  INDEX idx_grant_id (grant_id),
  INDEX idx_status (status)
);
```

---

## Summary

### Core Tables:
1. **training_events** - Stores workshops and training sessions
2. **grants** - Stores funding opportunities and grants
3. **partners** - Stores partner organizations

### Key Design Decisions:

1. **Date Handling**: 
   - Store dates as proper DATE/DATETIME types instead of strings
   - Keep `deadline_text` for flexible display (e.g., "Open Rolling Basis")

2. **Amount Handling**:
   - Store both human-readable string (`amount`) and numeric values (`amount_min`, `amount_max`) for filtering and sorting

3. **Image Storage**:
   - Store URLs in database (consider using a file storage service like AWS S3, Cloudinary, etc.)

4. **Soft Deletes**:
   - Use `is_active` flag instead of hard deletes to maintain data integrity

5. **Indexing**:
   - Index frequently queried fields (date, type, location, status, etc.)

6. **Extensibility**:
   - Use JSON columns for flexible data (tags, application_data)
   - Add foreign key relationships for user registrations/applications

### Migration Path:

1. Create the three main tables
2. Migrate existing hardcoded data
3. Update the React component to fetch from API
4. Add user registration/application tracking tables
5. Implement admin interface for CRUD operations
