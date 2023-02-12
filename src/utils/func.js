export function vws(px, vw) {
    if (vw) {
        return (px / 750) * 100 + "vw";
    } else {
        return (px / 750) * 750;
    }
}