// https://stackoverflow.com/questions/5072136/javascript-filter-for-objects/37616104

export default Object.filter = (obj, predicate) => {
    return Object.keys(obj)
    .filter( key => predicate(obj[key]) )
    .reduce( (res, key) => (res[key] = obj[key], res), {} );

}
