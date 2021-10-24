import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Phone, MissedCallsStorate} from "../components/phone";
import {NativeBridge} from "../nativeBridge";
import {Home} from "../components/home";
import {Router} from "../router/router";
import {formatDate} from "../utils/timeUtil";

interface IMissedCall {
    nameFromPhoneBook?: string;
    phone: string;
    callDate: number;
}

export const MissedCallsStore = {
    pending: false,
    missedCalls: [] as IMissedCall[],
    loadMissedPhoneList: async ()=>{
        MissedCallsStore.pending = true;
        MissedCallsStore.onChanged();
        MissedCallsStore.missedCalls = await NativeBridge.callHostCommand<IMissedCall[]>('getMissedCalls');
        MissedCallsStore.pending = false;
        MissedCallsStore.onChanged();
    },
    onChanged: () => {
    },
};


const navigateToHome = ()=>{
    Router.navigateTo('home');
}

export const MissedCallsPage = ()=>{
    return (
        <>
            <h3>Пропущенные звонки</h3>
            <div className="list">
                <ul>
                    {
                        MissedCallsStore.pending &&
                        <li style={{background: 'none'}}>
                            Загрузка...
                        </li>
                    }
                    {
                        !MissedCallsStore.pending && MissedCallsStore.missedCalls.length === 0 &&
                        <li style={{background: 'none'}}>
                            Нет пропущенных звонков
                        </li>
                    }
                    {
                        !MissedCallsStore.pending && MissedCallsStore.missedCalls.map(it=>
                            <li>
                                <div>{it.nameFromPhoneBook || it.phone}</div>
                                <div>{formatDate(it.callDate)}</div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='horizontalLayout'>
                <div className="flex1" style={{textAlign: 'center'}} onclick={navigateToHome}>
                    <Home height={100}/>
                </div>
                <div className="flex1" style={{textAlign: 'center'}}>
                    <Phone height={100}/>
                </div>
            </div>
        </>
    );
}