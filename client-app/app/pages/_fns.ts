import {MobileOperatorInfoStorage} from "./homePage";
import {Router} from "../router/router";
import {NativeBridge} from "../nativeBridge";
import {DialNumberStorage} from "./dialNumberPage";
import {ActiveCallStorage} from "./activeCallPage";
import {waitFor} from "../utils/timeUtil";

export const initializeCall = async (phone:string,name?:string)=>{
    if (MobileOperatorInfoStorage.operatorInfo.length>1) {
        DialNumberStorage.number = phone;
        DialNumberStorage.name = name;
        Router.navigateTo('chooseSimCard');
    } else {
        await NativeBridge.callHostCommand('dialNumber',{number:phone});
    }
}

export const forceLoudModeOn = async () => {
    await NativeBridge.callHostCommand<void>('triggerLoudMode', {loudMode: true});
    ActiveCallStorage.isLoudMode = true;
    ActiveCallStorage.onChanged();
}