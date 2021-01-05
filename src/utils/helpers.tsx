export function toRial(value:number):string {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` ریال` : ``;
};