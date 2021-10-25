import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Phone, MissedCallsStorage} from "../components/phone";
import {NativeBridge} from "../nativeBridge";
import {Home} from "../components/home";
import {Router} from "../router/router";

interface IPhoneBookRecord {
    name: string;
    phoneNumber: string;
}

export const PhoneBookStore = {
    pending: false,
    records: [] as IPhoneBookRecord[],
    loadListIfNeeded: async ()=>{
        if (PhoneBookStore.records.length>0) return;
        PhoneBookStore.pending = true;
        PhoneBookStore.onChanged();
        PhoneBookStore.records = await NativeBridge.callHostCommand<IPhoneBookRecord[]>('getContactList');
        PhoneBookStore.pending = false;
        PhoneBookStore.onChanged();
    },
    onChanged: () => {
    },
};


const navigateToHome = ()=>{
    Router.navigateTo('home');
}

export const PhoneBookPage = ()=>{
    return (
        <>
            <h3>Телефонна книга</h3>
            <div className="list">
                <ul>
                    {
                        PhoneBookStore.pending &&
                        <li style={{background: 'none'}}>
                            Загрузка...
                        </li>
                    }
                    {
                        !PhoneBookStore.pending && PhoneBookStore.records.length === 0 &&
                        <li style={{background: 'none'}}>
                            Нет записей
                        </li>
                    }
                    {
                        !PhoneBookStore.pending && PhoneBookStore.records.map(it=>
                            <li onclick={_=> NativeBridge.callHostCommand('dialNumber',{number:it.phoneNumber})}>
                                <div>{it.name}</div>
                                <div>{it.phoneNumber}</div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='horizontalLayout'>
                <div className="flex1" style={{textAlign: 'center'}} onclick={navigateToHome}>
                    <Home height={100}/>
                </div>
            </div>
        </>
    );
}