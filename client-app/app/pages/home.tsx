import {Phone} from "../components/phone";
import {PhoneBook} from "../components/phoneBook";
import {Sms} from "../components/sms";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Router} from "../router/router";

export const Home = ()=>{
    return (
        <>
            <div className="flex1" onclick={_=>Router.navigateTo('missedCalls')}>
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