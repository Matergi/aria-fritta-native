//
//  BridgeFcm.m
//  AriaFrittaNative
//
//  Created by Giacomo Materozzi on 16/03/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "BridgeFcm.h"
#import "Queue.h"
@import Firebase;
#import <UserNotifications/UserNotifications.h>

@implementation BridgeFcm

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(requestPermission)
{
  NSLog(@"request permission of notification");
  // Register for remote notifications. This shows a permission dialog on first run, to
  // show the dialog at a more appropriate time move this registration accordingly.
  // [START register_for_notifications]
  if ([UNUserNotificationCenter class] != nil) {
    // iOS 10 or later
    // For iOS 10 display notification (sent via APNS)
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
    UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
    [[UNUserNotificationCenter currentNotificationCenter]
     requestAuthorizationWithOptions:authOptions
     completionHandler:^(BOOL granted, NSError * _Nullable error) {
       // ...
     }];
  } else {
    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
    UIUserNotificationType allNotificationTypes =
    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  }
}

RCT_EXPORT_METHOD(enable)
{
  NSLog(@"enable queue fcm");
  [[Queue allocWithZone: nil] enable: FCM_PUSH_NOTIFICATION];
}


@end
