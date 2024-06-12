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

// 运行实例
function listToTree(list) {
    const nodeMap = {};
    const firstLevelList = list.filter(item => item.parentExecutionId === "0");
    firstLevelList.forEach(item => {
        const {executionId} = item;
        nodeMap[executionId] = item;
    });
    while (true) {
        list.forEach(item => {
            const {parentExecutionId, executionId} = item;
            if (nodeMap[executionId]) return;
            if (nodeMap[parentExecutionId]) {
                const parent = nodeMap[parentExecutionId];
                if (parent.children) {
                    parent.children.push(item);
                } else {
                    parent.children = [item];
                }
                nodeMap[executionId] = item;
            }
        });
        if (Object.keys(nodeMap).length === list.length) {
            return firstLevelList;
        }
    }

}

function normalizeDateTimeString(rawDatatimeStr) {
    function genNumStr(num) {
        return Number(num) < 10 ? "0" + num : ("" + num) 
    }
    if (rawDatatimeStr) {
        const dateObj = new Date(rawDatatimeStr);

        const yyyy = dateObj.getFullYear();
        const MM = dateObj.getMonth() + 1;
        const dd = dateObj.getDate();

        const HH = dateObj.getHours();
        const mm = dateObj.getMinutes();
        const ss = dateObj.getSeconds();

        return `${yyyy}-${genNumStr(MM)}-${genNumStr(dd)} ${genNumStr(HH)}:${genNumStr(mm)}:${genNumStr(ss)}`;
    }
}

export default {
    objectToFormData,
    objectToQueryStr,
    openWindow,
    listToTree,
    normalizeDateTimeString
};