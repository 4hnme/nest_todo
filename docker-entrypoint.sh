#!/usr/bin/env bash
node node_modules/typeorm/cli.js migration:generate -d dist/src/typeorm.datasource.js dist/migrations && \
node node_modules/typeorm/cli.js migration:run -d dist/src/typeorm.datasource.js
exec node dist/src/main.js
