

up:
	npm run start:dev

format:
	npm run format

migration-create:
	typeorm-ts-node-esm migration:run ./typeorm/migrations/$(name)

migration-up:
    "typeorm-ts-node-esm migration:run -d ./typeorm/data-source.ts"
	



