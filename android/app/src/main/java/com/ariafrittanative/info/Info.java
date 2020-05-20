package com.ariafrittanative.info;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class Info extends ReactContextBaseJavaModule {
    private static ReactApplicationContext context = null;

    Info(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @ReactMethod
    public static void getCountry(Promise promise) {
        try {
            String locale = context.getResources().getConfiguration().locale.getCountry();
            promise.resolve(locale);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @Override
    public String getName() {
        return "BridgeInfo";
    }
}
