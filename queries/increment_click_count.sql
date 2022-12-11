UPDATE link
SET click_count=(click_count + 1)
WHERE short_url = ?;