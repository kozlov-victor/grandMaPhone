import {Phone, PhoneStorage} from "../components/phone";
import {PhoneBook} from "../components/phoneBook";
import {Sms} from "../components/sms";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Router} from "../router/router";
import {MissedCallsStore} from "./missedCalls";

const navigateToMissedCalls = ():void=>{
    Router.navigateTo('missedCalls');
    PhoneStorage.missedCallsNumber = 0;
    MissedCallsStore.
        loadMissedPhoneList().
        catch(e=>{
            console.log(e);
        });
};

export const Home = ()=>{
    return (
        <>
            <div className="flex1" onclick={navigateToMissedCalls}>
                <Phone/>
            </div>
            <div className="flex1">
                <PhoneBook/>
            </div>
            <div className="flex1">
                <Sms/>
            </div>
        </>
    )
}