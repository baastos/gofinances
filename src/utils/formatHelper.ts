export function numberFormat(number: number){
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)
}
export function dateFormat(date: Date, highlight: boolean){
  if(!highlight){
    
    return new Intl.DateTimeFormat('pt-BR').format(date)
  }else{
    return (`${date.getDate()} de ${date.toLocaleString('pt-BR', {month: 'long'})}`)
  }
}