import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
