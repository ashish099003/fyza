-- --------------------------------------------------
-- Table: integrations
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS integrations (
    id         SERIAL        PRIMARY KEY,
    user_id    INTEGER       NOT NULL
                           REFERENCES user_profiles(id)
                             ON DELETE CASCADE,
    name       VARCHAR(200)  NOT NULL,
    type       VARCHAR(100)  NOT NULL,
    status     VARCHAR(20)   NOT NULL
                           CHECK (status IN ('connected','pending','not_connected')),
    icon       VARCHAR(100)  NOT NULL,  -- e.g. 'Building2', 'CreditCard', etc.
    created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_integrations_user_name
  ON integrations(user_id, name);

CREATE INDEX IF NOT EXISTS idx_integrations_status
  ON integrations(status);