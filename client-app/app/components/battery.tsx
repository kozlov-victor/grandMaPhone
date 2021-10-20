import {VirtualNode} from "@engine/renderable/tsx/genetic/virtualNode";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";

export const BatteryStorage = {
    chargeValue: 100,
}

const getColorByCharge = ():string=>{
    const val = BatteryStorage.chargeValue;
    if (val>75) return '#00a900';
    else if (val>40) return '#ffb300';
    else if (val>25) return '#e7752e';
    else return '#ff0000';

}

export const Battery = ():VirtualNode=>{
    const fillColor = getColorByCharge();
    return(
        <>
            <div className="horizontalLayout alignItemsCenter">
                <div className="">{BatteryStorage.chargeValue}%</div>
                <svg id="q" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.3 232.74" width="100" height="50">
                    <rect x="57.95" y="-41.34" width="216" height="315.43" rx="22.86"
                          transform="matrix(0, -1, 1, 0, 49.12, 282)"
                          style={`fill:none;stroke:${fillColor};stroke-miterlimit:3.2;stroke-width:16px`}/>
                    <path
                        d="M339.18,91.5,339,147.09a4,4,0,0,1-4,4h0a4,4,0,0,1-4-4l.16-55.58a4,4,0,0,1,4-4h0A4,4,0,0,1,339.18,91.5Z"
                        style={`fill:none;stroke:${fillColor};stroke-miterlimit:3.2;stroke-width:10px`}/>
                    {
                        BatteryStorage.chargeValue>=25 &&
                        <rect x="-19.77" y="87.52" width="170.29" height="57.14"
                              transform="matrix(0, -1, 1, 0, -50.9, 181.15)" style={`fill:${fillColor}`}/>
                    }
                    {
                        BatteryStorage.chargeValue>=50 &&
                        <rect x="47.59" y="87.71" width="170.29" height="57.14"
                              transform="matrix(0, -1, 1, 0, 16.09, 248.69)" style={`fill:${fillColor}`}/>
                    }
                    {
                        BatteryStorage.chargeValue>=75 &&
                        <rect x="114.94" y="87.89" width="170.29" height="57.14"
                              transform="matrix(0, -1, 1, 0, 83.07, 316.22)" style={`fill:${fillColor}`}/>
                    }
                    {
                        BatteryStorage.chargeValue>=90 &&
                        <rect x="182.29" y="88.08" width="170.29" height="57.14"
                              transform="matrix(0, -1, 1, 0, 150.05, 383.76)" style={`fill:${fillColor}`}/>
                    }

                </svg>
            </div>
        </>
    );
}