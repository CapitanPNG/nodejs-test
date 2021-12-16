#!/bin/sh

common_path="src/sql"

source_path="$common_path"
file_path="merge.sql"

echo "" > "$file_path"

echo "-- Database" >> "$file_path"
echo "\n\n" >> "$file_path"
cat "$common_path/db.sql" >> "$file_path"
echo "\n\n" >> "$file_path"

echo "-- Tables" >> "$file_path"
echo "\n\n" >> "$file_path"
cat "$common_path/tables.sql" >> "$file_path"
echo "\n\n" >> "$file_path"

echo "-- User" >> "$file_path"
echo "\n\n" >> "$file_path"
cat "$common_path/user.sql" >> "$file_path"
echo "\n\n" >> "$file_path"

echo "-- Example" >> "$file_path"
echo "\n\n" >> "$file_path"
cat "$common_path/example.sql" >> "$file_path"
echo "\n\n" >> "$file_path"

echo "\n\nSQL has been merged\n\n"