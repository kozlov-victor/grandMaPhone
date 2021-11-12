package com.victor.service.provider;


import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.telephony.TelephonyManager;

import androidx.core.app.ActivityCompat;

import com.victor.model.SimCardInfo;

import java.util.ArrayList;
import java.util.List;

public class SimCardProvider {

    public List<SimCardInfo> getSimOperatorInfo(Context context) {

        List<SimCardInfo> result = new ArrayList<>();

        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            return result;
        }
        SubscriptionManager localSubscriptionManager = SubscriptionManager.from(context); // dual sim
        if (localSubscriptionManager.getActiveSubscriptionInfoCount() > 1) {
            //if there are two sims in dual sim mobile
            List<SubscriptionInfo> localList = localSubscriptionManager.getActiveSubscriptionInfoList();
            SubscriptionInfo simInfo1 = localList.get(0);
            SubscriptionInfo simInfo2 = localList.get(1);

            String sim1 = simInfo1.getDisplayName().toString();
            String sim2 = simInfo2.getDisplayName().toString();

            //String id1 = simInfo1.getIccId();
            //String id2 = simInfo2.getIccId();

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
    }

}
