import {VirtualNode} from "@engine/renderable/tsx/genetic/virtualNode";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";

export const Battery = ():VirtualNode=>{
    return(
        <>
            <svg id="q" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.3 232.74" width="100" height="50">
                <rect x="57.95" y="-41.34" width="216" height="315.43" rx="22.86"
                      transform="matrix(0, -1, 1, 0, 49.12, 282)"
                      style="fill:none;stroke:#00a900;stroke-miterlimit:3.200000047683716;stroke-width:16.00000023841858px"/>
                <path
                    d="M339.18,91.5,339,147.09a4,4,0,0,1-4,4h0a4,4,0,0,1-4-4l.16-55.58a4,4,0,0,1,4-4h0A4,4,0,0,1,339.18,91.5Z"
                    style="fill:none;stroke:#00a900;stroke-miterlimit:3.200000047683716;stroke-width:10.239999542236319px"/>
                <rect x="-19.77" y="87.52" width="170.29" height="57.14"
                      transform="matrix(0, -1, 1, 0, -50.9, 181.15)" style="fill:#00a900"/>
                <rect x="47.59" y="87.71" width="170.29" height="57.14"
                      transform="matrix(0, -1, 1, 0, 16.09, 248.69)" style="fill:#00a900"/>
                <rect x="114.94" y="87.89" width="170.29" height="57.14"
                      transform="matrix(0, -1, 1, 0, 83.07, 316.22)" style="fill:#00a900"/>
                <rect x="182.29" y="88.08" width="170.29" height="57.14"
                      transform="matrix(0, -1, 1, 0, 150.05, 383.76)" style="fill:#00a900"/>
            </svg>
        </>
    );
}