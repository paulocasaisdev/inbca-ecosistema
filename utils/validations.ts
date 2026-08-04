export function validarCNS(cns: string): boolean {
  const cleanCNS = cns.replace(/\D/g, '');
  if (cleanCNS.length !== 15) return false;

  if (['1', '2', '7', '8', '9'].includes(cleanCNS[0])) {
    let soma = 0;
    for (let i = 0; i < 15; i++) {
      soma += parseInt(cleanCNS[i]) * (15 - i);
    }
    return soma % 11 === 0;
  }

  return false;
}

export function formatarCNS(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
    .trim()
    .slice(0, 18);
}
