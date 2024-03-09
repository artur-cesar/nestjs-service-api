

up:
	npm run start:dev

format:
	npm run format

migration-revert:
    npm run typeorm migration:revert -- -d ./typeorm/data-source.ts

migration-run:
    npm run typeorm migration:run -- -d ./typeorm/data-source.ts

migration-create:
	npm run typeorm migration:create  -- ./typeorm/migrations/${NAME}
	



