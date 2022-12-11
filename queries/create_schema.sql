CREATE TABLE IF NOT EXISTS link
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    short_url   TEXT,
    long_url    TEXT,
    click_count INTEGER,
    CONSTRAINT unique_short_link UNIQUE (short_url)
);