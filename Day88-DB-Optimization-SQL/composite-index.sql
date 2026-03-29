-- Slow Query: High Disk I/O
SELECT email, last_login 
FROM users 
WHERE status = 'active' AND last_login > '2026-01-01';

-- 1. The "Standard" Index (Better)
CREATE INDEX idx_status ON users(status);

-- 2. The "Composite Covering" Index (Perfect)
-- This index "covers" the query because both the WHERE and SELECT 
-- fields are stored in the index itself.
CREATE INDEX idx_status_login_email ON users(status, last_login, email);