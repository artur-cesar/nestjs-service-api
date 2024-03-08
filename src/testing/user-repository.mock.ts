import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../user/user.entity";

export const userRepositoryMock = {
    provide: getRepositoryToken(User),
    useValue: {
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
    }
}