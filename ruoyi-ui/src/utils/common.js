function objectToFormData(obj) {
    const fd = new FormData();
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        fd.set(key, value);
    });
    return fd;
}


export default {
    objectToFormData
};