import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: "api",
    port: 5432,
    migrations: [`${__dirname}/migrations/**/*.ts`],
    entities: [`${__dirname}/**/*.entity.ts`]
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource