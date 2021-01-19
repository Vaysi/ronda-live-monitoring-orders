export function toRial(value:number):string {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` ریال` : ``;
};

export function toToman(value:number):string {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ` تومان` : ``;
};