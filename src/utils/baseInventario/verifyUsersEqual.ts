import { NameInventarioOnUsers } from '@prisma/client';
import { UserDto } from 'src/users/dto/user.dto';

export async function verifyUsersEqual(
  data: NameInventarioOnUsers[],
  userIds: UserDto[],
) {
  let missingIds = [];

  for (let index = 0; index < userIds.length; index++) {
    if (!data.some((user) => user.user_id === userIds[index].id)) {
      missingIds.push(userIds[index].name);
    }
  }

  let isEqual = data.length === userIds.length && missingIds.length === 0;

  return { isEqual, missingIds };
}
