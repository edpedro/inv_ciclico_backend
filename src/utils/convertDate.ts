export function convertDate(dataString: string) {
  const partes = dataString.split('/');
  const novaData = partes[0] + '.' + partes[1] + '.' + partes[2].substr(2);

  return novaData;
}
