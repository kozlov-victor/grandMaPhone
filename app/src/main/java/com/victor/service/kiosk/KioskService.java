package com.victor.service.kiosk;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;

import com.victor.service.listener.PhoneCallListener;

public class KioskService {

    private static class CustomViewGroup extends ViewGroup {
        public CustomViewGroup(Context context) {
            super(context);
        }

        @Override
        protected void onLayout(boolean changed, int l, int t, int r, int b) {
        }

        @Override
        public boolean onInterceptTouchEvent(MotionEvent ev) {
            // Intercepted touch!
            return true;
        }
    }

    public static boolean HARD_KIOSK = true;

    private static void preventStatusBarExpansion(Activity activity) {

        if(Build.VERSION.SDK_INT >= 23) {
            if (!Settings.canDrawOverlays(activity)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + activity.getPackageName()));
                activity.startActivityForResult(intent, 1234);
            }
        } else {
            Intent intent = new Intent(activity, Service.class);
            activity.startService(intent);
        }

        WindowManager manager = ((WindowManager) activity.getApplicationContext().getSystemService(Context.WINDOW_SERVICE));

        WindowManager.LayoutParams localLayoutParams = new WindowManager.LayoutParams();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            localLayoutParams.type = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY;
        } else {
            localLayoutParams.type = WindowManager.LayoutParams.TYPE_SYSTEM_DIALOG;
        }

        localLayoutParams.gravity = Gravity.TOP;
        localLayoutParams.flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE|WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL|WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN;

        localLayoutParams.width = WindowManager.LayoutParams.MATCH_PARENT;

        int resId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        int result;
        if (resId > 0) {
            result = activity.getResources().getDimensionPixelSize(resId);
        } else {
            // Use Fallback size:
            result = 60; // 60px Fallback
        }

        localLayoutParams.height = result;
        localLayoutParams.format = PixelFormat.TRANSPARENT;

        CustomViewGroup view = new CustomViewGroup(activity);
        if (manager!=null) {
            try {
                manager.addView(view, localLayoutParams);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @SuppressLint("SourceLockedOrientationActivity")
    public KioskService(Activity activity) {
        if (HARD_KIOSK) {

            // show on lock screen
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
//                activity.setShowWhenLocked(true);
//                activity.setTurnScreenOn(true);
//            } else {
//                activity.getWindow().addFlags(
//                        WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
//                                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
//                );
//            }

            //Remove title bar
            activity.requestWindowFeature(Window.FEATURE_NO_TITLE);
            //Remove notification bar
            activity.getWindow().setFlags(
                    WindowManager.LayoutParams.FLAG_FULLSCREEN,
                    WindowManager.LayoutParams.FLAG_FULLSCREEN
            );
            activity.getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                    View.SYSTEM_UI_FLAG_IMMERSIVE        |
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION  |
                    View.SYSTEM_UI_FLAG_FULLSCREEN
            );
            preventStatusBarExpansion(activity);
            // orientation
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        } else {
            Intent intent = new Intent(Intent.ACTION_MAIN);
            intent.addCategory(Intent.CATEGORY_HOME);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            activity.startActivity(intent);
        }
    }

    public void bringToFront(Activity activity) {
        if (HARD_KIOSK) {
            ActivityManager activityManager = (ActivityManager) activity.getApplicationContext()
                    .getSystemService(Context.ACTIVITY_SERVICE);
            if (activityManager==null) return;
            activityManager.moveTaskToFront(activity.getTaskId(), 0);
        }
    }


}
