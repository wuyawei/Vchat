const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const formatDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const a = [year, month, day].map(formatNumber);
    return a[0] + '年' + a[1] + '月' + a[2] + '日';
};

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};

module.exports = {
    formatTime,
    formatDate
};