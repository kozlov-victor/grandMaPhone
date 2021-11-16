package com.victor.service.provider;


import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.telephony.TelephonyManager;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;

import com.victor.model.SimCardInfo;

import java.util.ArrayList;
import java.util.List;

public class SimCardProvider {

    private boolean isSimReady(SubscriptionInfo simInfo) {
        return
                 simInfo.getDisplayName() != null &&
                !simInfo.getDisplayName().toString().trim().equals("") &&
                !simInfo.getDisplayName().toString().toLowerCase().startsWith("card");
    }

    public List<SimCardInfo> getSimOperatorInfo(Context context) {

        try {
            List<SimCardInfo> result = new ArrayList<>();

            if (ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
                return result;
            }

            SubscriptionManager localSubscriptionManager = SubscriptionManager.from(context); // dual sim
            if (localSubscriptionManager.getActiveSubscriptionInfoCount() > 1) {
                //if there are two sims in dual sim mobile
                boolean sim1Ready = false,sim2Ready = false;
                SubscriptionInfo simInfo1 = null;
                SubscriptionInfo simInfo2 = null;

                while (!sim1Ready || !sim2Ready) {
                    List<SubscriptionInfo> simList = localSubscriptionManager.getActiveSubscriptionInfoList();
                    simInfo1 = simList.get(0);
                    simInfo2 = simList.get(1);

                    sim1Ready = isSimReady(simInfo1);
                    sim2Ready = isSimReady(simInfo2);

                    if (!sim1Ready || !sim2Ready) {
                        try {
                            Thread.sleep(1000);
                        }catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }

                String sim1 = simInfo1.getDisplayName().toString();
                String sim2 = simInfo2.getDisplayName().toString();

                result.add(new SimCardInfo(sim1,simInfo1.getSimSlotIndex()));
                result.add(new SimCardInfo(sim2,simInfo2.getSimSlotIndex()));
            } else {
                //if there is 1 sim in dual sim mobile
                TelephonyManager tManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
                if (tManager==null) return result;
                String sim1 = tManager.getNetworkOperatorName();
                result.add(new SimCardInfo(sim1,null));
            }
            return result;
        } catch (Exception e) {
            Toast.makeText(context,e.getMessage(),Toast.LENGTH_LONG).show();
            return null;
        }


    }

}
