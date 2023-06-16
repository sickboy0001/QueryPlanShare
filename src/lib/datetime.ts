export function GetYmdString(PropsDate:Date):string {
  return(PropsDate.toLocaleString(
    "ja",
    {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }))
  
}
