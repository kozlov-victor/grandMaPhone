
export namespace Router {

    let currentUrl:string;
    let onNavigatedCallback:()=>void;

    export const navigateTo = (url:string):void=>{
        currentUrl = url;
        if (onNavigatedCallback) onNavigatedCallback();
    }

    export const onNavigated = (cb:()=>void):void=>{
        onNavigatedCallback = cb;
    }

    export const getCurrentUrl = ():string=>currentUrl;

}