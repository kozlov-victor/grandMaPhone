import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Phone} from "../components/phone";

const arr = Array(200).fill(0);

const MissedCallsStore = {

};

export const MissedCalls = ()=>{
    return (
        <>
            <h3>Пропущенные звонки</h3>
            <div className="list">
                <ul>
                    {
                        arr.map(it=>
                            <li>
                                <div>Мистeр Бин 0445456565</div>
                                <div>11:21</div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <h2>Набрать номер</h2>
            <div>
                <Phone height={100}/>
            </div>
        </>
    );
}