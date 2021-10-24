import {Phone, MissedCallsStorate} from "../components/phone";
import {PhoneBook} from "../components/phoneBook";
import {Sms} from "../components/sms";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Router} from "../router/router";
import {MissedCallsStore} from "./missedCallsPage";
import {PhoneBookStore} from "./phoneBookPage";
import {SmsListStore} from "./SmsListPage";

const navigateToMissedCalls = ():void=>{
    Router.navigateTo('missedCalls');
    MissedCallsStorate.missedCallsNumber = 0;
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
}

export const HomePage = ()=>{
    return (
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
    )
}