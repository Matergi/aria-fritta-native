package com.ariafrittanative.queue;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;

public class Queue extends ReactContextBaseJavaModule {
    public static enum EVENT {
        REFRESH_TOKEN,
        RECIVE_NOTIFICATION;

        public String value() {
            switch (this) {
                case REFRESH_TOKEN:
                    return "onRefreshToken";
                case RECIVE_NOTIFICATION:
                    return "onReciveNotification";
                default:
                    return "defualt";
            }
        }
    }

    public static enum TYPE {
        PUSH_NOTIFICATION
    }

    private static ReactApplicationContext context = null;
    private static boolean jsReady = false;
    private static ArrayList<Element> queue = new ArrayList<>();
    private static ArrayList<TYPE> eventTypeEnabled = new ArrayList<>();

    Queue(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    private static class Element {
        final EVENT event;
        final TYPE type;
        final String detail;

        Element(EVENT event, TYPE type, String detail) {
            this.event = event;
            this.type = type;
            this.detail = detail;
        }
    }

    public static void enable(TYPE event) {
        eventTypeEnabled.add(event);

        jsReady = true;
        pop();
    }

    @Override
    public String getName() {
        return "Queue";
    }

    public synchronized static void push(EVENT event, TYPE type, String detail) {
        queue.add(new Element(event, type, detail));
        pop();
    }

    private synchronized static void pop() {
        if (jsReady && context != null) {
            ArrayList<Element> elementsToRemove = new ArrayList<>();
            for (Element e: queue) {
                if (eventTypeEnabled.contains(e.type)) {
                    context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit(e.event.value(), e.detail);
                    Log.d("QUEUE", "pop - event: " + e.event.value() + ", value: " + e.detail);
                    // non ho potuto fare il remove direttamente qua perchè all'avvio dell'app in alcune casistiche crashava
                    elementsToRemove.add(e);
                }
            }
            queue.removeAll(elementsToRemove);
        }
    }
}
