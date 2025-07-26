-- --------------------------------------------------
-- Table: user_preferences
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id                     INTEGER       PRIMARY KEY
                                  REFERENCES user_profiles(id)
                                    ON DELETE CASCADE,
    goal_progress_updates       BOOLEAN       NOT NULL DEFAULT TRUE,
    investment_recommendations  BOOLEAN       NOT NULL DEFAULT TRUE,
    tax_saving_alerts           BOOLEAN       NOT NULL DEFAULT TRUE,
    expense_warnings            BOOLEAN       NOT NULL DEFAULT TRUE,
    literacy_level              VARCHAR(20)   NOT NULL
                                  CHECK (literacy_level IN ('beginner','intermediate','advanced','expert')),
    updated_at                  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);