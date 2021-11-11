import {Phone, MissedCallsStorage} from "../components/phone";
import {PhoneBook} from "../components/phoneBook";
import {Sms} from "../components/sms";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Router} from "../router/router";
import {MissedCallsStore} from "./missedCallsPage";
import {PhoneBookStore} from "./phoneBookPage";
import {SmsListStore} from "./SmsListPage";
import {ISimOperatorInfo} from "../launcherApp";
import {NativeBridge} from "../nativeBridge";

const navigateToMissedCalls = ():void=>{
    Router.navigateTo('missedCalls');
    MissedCallsStorage.missedCallsNumber = 0;
    MissedCallsStore.
        loadMissedPhoneList().
        catch(e=>{
            console.log(e);
        });
};

const navigateToPhoneBook = ():void=>{
    Router.navigateTo('phoneBook');
    PhoneBookStore.
        loadListIfNeeded().
        catch(e=>{
           console.log(e);
        });
}

const navigateToSmsList = ():void=>{
    console.trace('navigated to sms list')
    Router.navigateTo('smsList');
    SmsListStore.
    loadList().
    catch(e=>{
        console.log(e);
    });
};

export const MobileOperatorInfoStorage = {
    operatorInfo: [{operatorName:'SIM card 1'},{operatorName:'SIM card 2'}] as ISimOperatorInfo[],
    onChanged: () => {
    },
};

(async ()=>{
    const simInfo = await NativeBridge.callHostCommand('getSimOperatorInfo') as ISimOperatorInfo[];
    MobileOperatorInfoStorage.operatorInfo = simInfo ?? [];
    MobileOperatorInfoStorage.onChanged();
})();

export const HomePage = ()=>{
    const operator1 = MobileOperatorInfoStorage.operatorInfo[0] ?? {operatorName: '...?...'};
    const operator2 = MobileOperatorInfoStorage.operatorInfo[1];
    return (
        <>
            <div>
                <div style={{textAlign:'center',padding:'5px'}}>
                    {operator1.operatorName}
                    {
                        operator2 && ', ' + operator2.operatorName
                    }
                </div>
            </div>
            <div className="flex1" onclick={navigateToMissedCalls}>
                <Phone/>
            </div>
            <div className="flex1" onclick={navigateToPhoneBook}>
                <PhoneBook/>
            </div>
            <div className="flex1" onclick={navigateToSmsList}>
                <Sms/>
            </div>
        </>
    )
}