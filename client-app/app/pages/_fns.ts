import {MobileOperatorInfoStorage} from "./homePage";
import {Router} from "../router/router";
import {NativeBridge} from "../nativeBridge";
import {DialNumberStorage} from "./dialNumberPage";

export const initializeCall = async (phone:string)=>{
    if (MobileOperatorInfoStorage.operatorInfo.length>=1) {
        DialNumberStorage.number = phone;
        Router.navigateTo('chooseSimCard');
    } else {
        await NativeBridge.callHostCommand('dialNumber',{number:phone});
    }
}