
const leadZero = (n:number):string=>{
    if (n<=9) return `0${n}`;
    else return `${n}`;
}

export const formatDate = (dt:number):string=>{
    const date = new Date(dt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const min = date.getMinutes();
    const z = leadZero;
    return `${z(day)}.${z(month)}.${year} ${z(hours)}:${z(min)}`;
}

export const waitFor = (time:number)=>{
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}