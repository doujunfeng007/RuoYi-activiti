function objectToFormData(obj) {
    const fd = new FormData();
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        fd.set(key, value);
    });
    return fd;
}
function objectToQueryStr(obj) {
    let queryStr = "";
    Object.keys(obj).forEach(key => {
        queryStr += `&${key}=${obj[key] || ''}`
    });
    console.log(queryStr);
    return queryStr.slice(1);
}

export default {
    objectToFormData,
    objectToQueryStr
};