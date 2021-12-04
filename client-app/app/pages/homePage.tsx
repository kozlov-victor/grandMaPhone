import {Phone, MissedCallsStorage} from "../components/phone";
import {PhoneBook} from "../components/phoneBook";
import {Sms} from "../components/sms";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Router} from "../router/router";
import {MissedCallsStore} from "./missedCallsPage";
import {PhoneBookStore} from "./phoneBookPage";
import {SmsListStore} from "./smsListPage";
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
    pending: false,
    operatorInfo: [] as ISimOperatorInfo[],
    onChanged: () => {
    },
};

(async ()=>{
    MobileOperatorInfoStorage.pending = true;
    const simInfo = await NativeBridge.callHostCommand('getSimOperatorInfo') as ISimOperatorInfo[];
    MobileOperatorInfoStorage.operatorInfo = simInfo ?? [];
    MobileOperatorInfoStorage.pending = false;
    MobileOperatorInfoStorage.onChanged();
})();

export const HomePage = ()=>{
    const operator1 = MobileOperatorInfoStorage.operatorInfo[0] ?? {operatorName: '...?...'};
    const operator2 = MobileOperatorInfoStorage.operatorInfo[1];
    return (
        <>
            <div>
                <div style={{textAlign:'center',padding:'5px'}}>
                    {
                        !MobileOperatorInfoStorage.pending &&
                        <>
                            {operator1.operatorName}
                            {
                                operator2 && ', ' + operator2.operatorName
                            }
                        </>
                    }
                    {
                        MobileOperatorInfoStorage.pending &&
                        'Получение инфромации о сети...'
                    }
                </div>
            </div>
            {
                !MobileOperatorInfoStorage.pending &&
                <>
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
            }
        </>
    )
}