import { format } from 'date-fns';
import { ListProtocolExportFileDto } from 'src/export-file/dto/list-protocols-export-file.dto';

const FIELD_NAMES = {
  date: 'Data',
  user: 'Usuario',
  name: 'Protocolo',
  codigo: 'Codigo',
  serial: 'Serial',
  caixa: 'Caixa',
};

export async function renameProtocolsFields(
  results: ListProtocolExportFileDto[],
) {
  return results.map((result) => {
    const renamedResult: Record<string, any> = {};

    // Iterate through FIELD_NAMES to maintain the order
    Object.entries(FIELD_NAMES).forEach(([key, fieldName]) => {
      if (key === 'date' && result.nameProtocols) {
        renamedResult[fieldName] = format(
          new Date(result.nameProtocols.date),
          'dd/MM/yyyy',
        );
      } else if (key === 'user' && result.nameProtocols) {
        renamedResult[fieldName] = result.nameProtocols.user?.name;
      } else if (key === 'name' && result.nameProtocols) {
        renamedResult[fieldName] = result.nameProtocols.name;
      } else if (key in result) {
        renamedResult[fieldName] = result[key];
      }
    });

    return renamedResult;
  });
}
