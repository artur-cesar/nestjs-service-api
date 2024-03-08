import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]): any => SetMetadata(ROLES_KEY, roles);
