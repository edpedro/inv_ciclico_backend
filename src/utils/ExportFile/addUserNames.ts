import { ListExportFileDto } from 'src/export-file/dto/list-export-file.dto';
import { UserDto } from 'src/users/dto/user.dto';

export async function addUserNames(
  users: UserDto[],
  base: ListExportFileDto[],
) {
  return base.map((inv) => {
    const userMatch = users.find((user) => user.id === inv.username_id);
    const name = userMatch ? userMatch.name : '';
    return { ...inv, name };
  });
}
