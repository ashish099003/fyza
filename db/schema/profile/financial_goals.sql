-- --------------------------------------------------
-- Table: financial_goals
-- --------------------------------------------------
CREATE TABLE IF NOT EXISTS financial_goals (
    id              SERIAL        PRIMARY KEY,
    user_id         INTEGER       NOT NULL
                              REFERENCES user_profiles(id)
                                ON DELETE CASCADE,
    goal_name       VARCHAR(200)  NOT NULL,
    target_amount   NUMERIC(14,2) NOT NULL CHECK (target_amount >= 0),
    due_date        DATE          NOT NULL,
    current_savings NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (current_savings >= 0),
    progress_pct    NUMERIC(5,2)  GENERATED ALWAYS AS (
                        CASE
                          WHEN target_amount = 0 THEN 0
                          ELSE (current_savings / target_amount) * 100
                        END
                     ) STORED,
    category        VARCHAR(100),
    priority        VARCHAR(50)   CHECK (priority IN ('High','Medium','Low')),
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_financial_goals_user_id   ON financial_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_goals_due_date  ON financial_goals(due_date);
CREATE INDEX IF NOT EXISTS idx_financial_goals_category  ON financial_goals(category);
