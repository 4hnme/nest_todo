set -e
node node_modules/typeorm/cli.js migration:run -d dist/src/typeorm.datasource.js
exec node dist/src/main.js
