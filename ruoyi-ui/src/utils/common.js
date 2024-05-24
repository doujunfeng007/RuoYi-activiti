function objectToFormData(obj) {
    const fd = new FormData();
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        fd.set(key, value);
    });
    return fd;
}
function objectToQueryStr(obj, filterNull = false) {
    let queryStr = "";
    Object.keys(obj).forEach(key => {
        if (filterNull && !obj[key]) {
           return;
        }
        queryStr += `&${key}=${obj[key] || ''}`
    });
    console.log(queryStr);
    return queryStr.slice(1);
}
function openWindow(path, prefix) {
    if (prefix) {
        window.open(prefix + "" + url);
    } else {
        const location  = window.location;
        const origin = location.origin;
        if (origin.indexOf("localhost") > -1) {
            return window.open(`http://localhost:8080${path}`)
        }
        const pathPrefix = origin + (
            location.port
            ? ""
            : ":8080"
        );
        window.open(pathPrefix + "" + path)
    }
}

export default {
    objectToFormData,
    objectToQueryStr,
    openWindow
};