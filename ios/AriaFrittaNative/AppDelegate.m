/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
@import UIKit;
@import Firebase;

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "Queue.h"
#import "TouchVisualizer.h"

@implementation AppDelegate

NSString *const kGCMMessageIDKey = @"gcm.message_id";

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"AriaFrittaNative"
                                            initialProperties:nil];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  #if DEBUG
    self.window = [[TouchVisualizer alloc] initWithFrame:[UIScreen mainScreen].bounds];
  #else
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  #endif
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [[UIApplication sharedApplication] registerForRemoteNotifications];
  // [START configure_firebase]
  [FIRApp configure];
  // [END configure_firebase]
  
  // [START set_messaging_delegate]
  [FIRMessaging messaging].delegate = self;
  // [END set_messaging_delegate]
  
  
  if ([UNUserNotificationCenter class] != nil) {
    // iOS 10 or later
    // For iOS 10 display notification (sent via APNS)
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
  }
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// [START receive_message]
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  // If you are receiving a notification message while your app is in the background,
  // this callback will not be fired till the user taps on the notification launching the application.
  // TODO: Handle data of notification
  
  // With swizzling disabled you must let Messaging know about the message, for Analytics
  // [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  
  // Print message ID.
  if (userInfo[kGCMMessageIDKey]) {
    NSLog(@"Message ID: %@", userInfo[kGCMMessageIDKey]);
  }
  
  // Print full message.
  NSLog(@"%@", userInfo);
  
  NSString *jsonString = @"{ \"data\" : [";
  int index = 0;
  
  for (NSString* key in userInfo) {
    NSString *value = [NSString stringWithString:[NSString stringWithFormat:@"%@",[userInfo objectForKey:key]]];
    value = [[value componentsSeparatedByCharactersInSet:[NSCharacterSet newlineCharacterSet]] componentsJoinedByString:@" "];
    value = [value stringByReplacingOccurrencesOfString:@"\"" withString:@"\\\""];
    if (index == 0) {
      jsonString = [NSString stringWithFormat:@"%@{ \"%@\": \"%@\"}", jsonString, key, value];
    } else {
      jsonString = [NSString stringWithFormat:@"%@,{ \"%@\": \"%@\"}", jsonString, key, value];
    }
    index++;
  }
  
  jsonString = [jsonString stringByAppendingString:@"]}"];
  
  [[Queue allocWithZone: nil] push: RECIVE_NOTIFICATION
                              type: FCM_PUSH_NOTIFICATION
                            detail:jsonString];
  
  [[Queue allocWithZone: nil] push: RECIVE_NOTIFICATION
                              type: FCM_PUSH_NOTIFICATION
                            detail:jsonString];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  // If you are receiving a notification message while your app is in the background,
  // this callback will not be fired till the user taps on the notification launching the application.
  // TODO: Handle data of notification
  
  // With swizzling disabled you must let Messaging know about the message, for Analytics
  // [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  
  // Print message ID.
  if (userInfo[kGCMMessageIDKey]) {
    NSLog(@"Message ID: %@", userInfo[kGCMMessageIDKey]);
  }
  
  // Print full message.
  NSLog(@"%@", userInfo);
  
  completionHandler(UIBackgroundFetchResultNewData);
}
// [END receive_message]

// [START ios_10_message_handling]
// Receive displayed notifications for iOS 10 devices.
// Handle incoming notification messages while app is in the foreground.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  NSDictionary *userInfo = notification.request.content.userInfo;
  
  // With swizzling disabled you must let Messaging know about the message, for Analytics
  // [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  
  // Print message ID.
  if (userInfo[kGCMMessageIDKey]) {
    NSLog(@"Message ID: %@", userInfo[kGCMMessageIDKey]);
  }
  
  // Print full message.
  NSLog(@"%@", userInfo);
  
  NSString *jsonString = @"{ \"data\" : [";
  int index = 0;
  
  for (NSString* key in userInfo) {
    NSString *value = [NSString stringWithString:[NSString stringWithFormat:@"%@",[userInfo objectForKey:key]]];
    value = [[value componentsSeparatedByCharactersInSet:[NSCharacterSet newlineCharacterSet]] componentsJoinedByString:@" "];
    value = [value stringByReplacingOccurrencesOfString:@"\"" withString:@"\\\""];
    if (index == 0) {
      jsonString = [NSString stringWithFormat:@"%@{ \"%@\": \"%@\"}", jsonString, key, value];
    } else {
      jsonString = [NSString stringWithFormat:@"%@,{ \"%@\": \"%@\"}", jsonString, key, value];
    }
    index++;
  }
  
  jsonString = [jsonString stringByAppendingString:@"]}"];
  
  [[Queue allocWithZone: nil] push: RECIVE_NOTIFICATION
                              type: FCM_PUSH_NOTIFICATION
                            detail:jsonString];
  
  [[Queue allocWithZone: nil] push: RECIVE_NOTIFICATION
                              type: FCM_PUSH_NOTIFICATION
                            detail:jsonString];
  
  // Change this to your preferred presentation option
  completionHandler(UNNotificationPresentationOptionAlert);
}

// Handle notification messages after display notification is tapped by the user.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler {
  NSDictionary *userInfo = response.notification.request.content.userInfo;
  if (userInfo[kGCMMessageIDKey]) {
    NSLog(@"Message ID: %@", userInfo[kGCMMessageIDKey]);
  }
  
  // Print full message.
  NSLog(@"%@", userInfo);
  
  NSString *jsonString = @"{ \"data\" : [";
  int index = 0;
  
  for (NSString* key in userInfo) {
    NSString *value = [NSString stringWithString:[NSString stringWithFormat:@"%@",[userInfo objectForKey:key]]];
    value = [[value componentsSeparatedByCharactersInSet:[NSCharacterSet newlineCharacterSet]] componentsJoinedByString:@" "];
    value = [value stringByReplacingOccurrencesOfString:@"\"" withString:@"\\\""];
    if (index == 0) {
      jsonString = [NSString stringWithFormat:@"%@{ \"%@\": \"%@\"}", jsonString, key, value];
    } else {
      jsonString = [NSString stringWithFormat:@"%@,{ \"%@\": \"%@\"}", jsonString, key, value];
    }
    index++;
  }
  
  jsonString = [jsonString stringByAppendingString:@"]}"];
  
  [[Queue allocWithZone: nil] push: RECIVE_NOTIFICATION
                              type: FCM_PUSH_NOTIFICATION
                            detail:jsonString];
  
  [[Queue allocWithZone: nil] push: RECIVE_NOTIFICATION
                              type: FCM_PUSH_NOTIFICATION
                            detail:jsonString];

  completionHandler();
}

// [END ios_10_message_handling]

// [START refresh_token]
- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
  NSLog(@"FCM registration token: %@", fcmToken);
  
  [[Queue allocWithZone: nil] push: REFRESH_TOKEN
                              type: FCM_PUSH_NOTIFICATION
                            detail:fcmToken];
  
  [[Queue allocWithZone: nil] push: REFRESH_TOKEN
                              type: FCM_PUSH_NOTIFICATION
                            detail:fcmToken];
  
  // Notify about received token.
  NSDictionary *dataDict = [NSDictionary dictionaryWithObject:fcmToken forKey:@"token"];
  [[NSNotificationCenter defaultCenter] postNotificationName:
   @"FCMToken" object:nil userInfo:dataDict];
  // TODO: If necessary send token to application server.
  // Note: This callback is fired at each app startup and whenever a new token is generated.
}
// [END refresh_token]

// [START ios_10_data_message]
// Receive data messages on iOS 10+ directly from FCM (bypassing APNs) when the app is in the foreground.
// To enable direct data messages, you can set [Messaging messaging].shouldEstablishDirectChannel to YES.
- (void)messaging:(FIRMessaging *)messaging didReceiveMessage:(FIRMessagingRemoteMessage *)remoteMessage {
  NSLog(@"Received data message: %@", remoteMessage.appData);
}
// [END ios_10_data_message]

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  NSLog(@"Unable to register for remote notifications: %@", error);
}

// This function is added here only for debugging purposes, and can be removed if swizzling is enabled.
// If swizzling is disabled then this function must be implemented so that the APNs device token can be paired to
// the FCM registration token.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  NSString *token = [[deviceToken description] stringByTrimmingCharactersInSet: [NSCharacterSet characterSetWithCharactersInString:@"<>"]];
  token = [token stringByReplacingOccurrencesOfString:@" " withString:@""];
  NSLog(@"token---%@", token);
  
  // With swizzling disabled you must set the APNs device token here.
  [FIRMessaging messaging].APNSToken = deviceToken;
}

@end
