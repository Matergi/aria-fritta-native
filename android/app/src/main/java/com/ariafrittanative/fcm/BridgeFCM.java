package com.ariafrittanative.fcm;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.ariafrittanative.queue.Queue;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

public class BridgeFCM extends ReactContextBaseJavaModule {
    private static final String TAG = BridgeFCM.class.getSimpleName();

    public BridgeFCM(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void requestPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Create channel to show notifications.
            String channelId = "aria-fritta";
            String channelName = "aria-fritta";
            NotificationManager notificationManager = getReactApplicationContext().getSystemService(NotificationManager.class);
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(new NotificationChannel(channelId,
                        channelName, NotificationManager.IMPORTANCE_DEFAULT));
            }
        }

        FirebaseInstanceId.getInstance().getInstanceId()
                .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                    @Override
                    public void onComplete(@NonNull Task<InstanceIdResult> task) {
                        if (!task.isSuccessful()) {
                            Log.w(TAG, "getInstanceId failed", task.getException());
                            return;
                        }

                        // Get new Instance ID token
                        String token = task.getResult().getToken();

                        Log.d(TAG, "[TOKEN FCM]: " + token);

                        Queue.push(Queue.EVENT.REFRESH_TOKEN, Queue.TYPE.PUSH_NOTIFICATION, token);
                    }
                });
    }

    @ReactMethod
    public void enable() {
        Queue.enable(Queue.TYPE.PUSH_NOTIFICATION);
    }

    @Override
    public String getName() {
        return "BridgeFcm";
    }

}
