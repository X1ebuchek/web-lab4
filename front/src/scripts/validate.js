export const validateY = (value) => {
    let s = value
    let letter;
    console.log(s);
    s = s.replace(",", ".");

    console.log("y = " + parseFloat(s));
    if (s === parseFloat(s).toString()) {
        if (s > 5 || s < -5 || Number.isNaN(s)) {
            letter = true;
        } else letter = false;
    } else letter = true;
    return [s, letter];
}
