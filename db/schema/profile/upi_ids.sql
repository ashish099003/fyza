-- --------------------------------------------------
-- Table: upi_ids
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS upi_ids (
    id           SERIAL        PRIMARY KEY,
    user_id      INTEGER       NOT NULL
                             REFERENCES user_profiles(id)
                               ON DELETE CASCADE,
    upi_address  VARCHAR(64)   NOT NULL UNIQUE,
    label        VARCHAR(100),               -- optional friendly name
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_upi_ids_user
  ON upi_ids(user_id);


