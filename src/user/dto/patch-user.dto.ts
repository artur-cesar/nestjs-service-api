import { UserDTO } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PatchUserDTO extends PartialType(UserDTO) {}
