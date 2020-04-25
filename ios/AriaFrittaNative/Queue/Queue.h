//
//  Queue.h
//  AriaFrittaNative
//
//  Created by Giacomo Materozzi on 16/03/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

#pragma QUEUE

typedef enum {
  REFRESH_TOKEN,
  RECIVE_NOTIFICATION,
  GENERIC
} EVENT;

typedef NS_ENUM(NSUInteger, NSCellType) {
  FCM_PUSH_NOTIFICATION = 1,
  APN_PUSH_NOTIFICATION = 2
} TYPE;

@interface Queue : RCTEventEmitter <RCTBridgeModule>

- (void) push: (EVENT) event type: (NSUInteger *) type detail: (NSString *) detail;
- (void) enable: (NSUInteger *) type;

@end

#pragma Event

@interface Event : NSObject

- (id) init: (NSString *) mEvent type: (NSUInteger *) mType detail: (NSString *) mDetail;

@end
