-- --------------------------------------------------
-- Table: user_profiles
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100)  NOT NULL,
    last_name  VARCHAR(100)  NOT NULL,
    age        INTEGER       NOT NULL CHECK (age > 0),
    annual_income NUMERIC(14,2) NOT NULL CHECK (annual_income >= 0),
    city       VARCHAR(100)  NOT NULL,
    occupation VARCHAR(100)  NOT NULL,
    dependents INTEGER       NOT NULL DEFAULT 0 CHECK (dependents >= 0),
    risk_profile VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Optional indexes to speed up lookups by city or risk profile
CREATE INDEX IF NOT EXISTS idx_user_profiles_city        ON user_profiles(city);
CREATE INDEX IF NOT EXISTS idx_user_profiles_risk_profile ON user_profiles(risk_profile);
