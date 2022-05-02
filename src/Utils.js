

 export function giveDate(date) {
    let ActualDate = new Date(date).toDateString().split(" ");
    ActualDate.shift();
    return ActualDate.join("/");
  }

 export function Discount(price,discount){
    const discountedPrice = price - Math.ceil(price*(discount/100))
    return discountedPrice;
  }
