
export function capitalizeFirstLetter(str) {
    if (typeof str === 'string')
        return str.charAt(0).toUpperCase() + str.slice(1);
}
