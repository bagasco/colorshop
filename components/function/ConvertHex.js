export default function ConvertHex(color){
    const array = [];
    color?.forEach(clr=>{
        const hexArray = clr.match(/.{1,2}/g);
        const rgbArray = [
            parseInt(hexArray[0],16),
            parseInt(hexArray[1],16),
            parseInt(hexArray[2],16),
        ]
        array.push(rgbArray);
    });
    return array;
}