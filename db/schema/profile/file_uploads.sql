-- --------------------------------------------------
-- Table: file_uploads
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS file_uploads (
    id            SERIAL        PRIMARY KEY,
    user_id       INTEGER       NOT NULL
                              REFERENCES user_profiles(id)
                                ON DELETE CASCADE,
    filename      VARCHAR(255)  NOT NULL,
    filepath      TEXT          NOT NULL,   -- where the file is stored
    content_type  VARCHAR(100),
    size_bytes    BIGINT,
    uploaded_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    status        VARCHAR(20)   NOT NULL
                              CHECK (status IN ('pending','processed','failed'))
);

CREATE INDEX IF NOT EXISTS idx_file_uploads_user
  ON file_uploads(user_id);
