//
//  Queue.m
//  AriaFrittaNative
//
//  Created by Giacomo Materozzi on 16/03/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "Queue.h"

#pragma Event
@implementation Event {
@public NSString *event, *detail;
@public NSUInteger *type;
}

- (id) init: (NSString *) mEvent type: (NSUInteger *) mType detail:(NSString *) mDetail {
  if (self = [super init]) {
    event = mEvent;
    detail = mDetail;
    type = mType;
  }
  return self;
}

@end

#pragma QUEUE
@implementation Queue

NSMutableArray <Event *> *queue = nil;
NSMutableArray <NSNumber *> *eventEnabled = nil;

bool jsReady = false;
static Queue *sharedInstance = nil;

+ (id) allocWithZone:(NSZone *) zone {
  if (sharedInstance == nil) {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      sharedInstance = [super allocWithZone:zone];
    });
  }
  return sharedInstance;
}

- (NSArray<NSString *> *) supportedEvents {
  return @[@"onRefreshToken", @"onReciveNotification"];
}

- (void) enable: (NSUInteger *) type {
  if (eventEnabled == nil) {
    eventEnabled = [NSMutableArray array];
  }
  
  [eventEnabled addObject:[NSNumber numberWithInt: type]];
  jsReady = true;
  [self pop];
}

- (void) push: (EVENT) event type: (NSUInteger *) type detail:(NSString * ) detail {
  @synchronized(self) {
    if (queue == nil) {
      queue = [NSMutableArray array];
    }
    
    NSString *eventName = @"default";
    
    if (event == REFRESH_TOKEN) {
      eventName = @"onRefreshToken";
    } else if (event == RECIVE_NOTIFICATION) {
      eventName = @"onReciveNotification";
    }
    
    Event *eventObject = [[Event alloc] init: eventName type:type detail: detail];
    [queue addObject:eventObject];
    [self pop];
  }
}

- (void) pop {
  @synchronized(self) {
    if (jsReady && self.bridge && queue != nil) {
      NSMutableArray *toDelete = [NSMutableArray array];
      for (Event *e in queue) {
        if ([eventEnabled containsObject: [NSNumber numberWithInt:e->type]]) {
          NSLog(@"%@", [@"call.. " stringByAppendingString: e->event]);
          [self sendEventWithName:e->event body: e->detail];
          // non ho potuto fare il remove direttamente qua perchè all'avvio dell'app in alcune casistiche crashava
          [toDelete addObject:e];
        } else {
          NSLog(@"%@ non avviato perchè il tipo: %lu non è stato abilitato", e->event, e->type);
        }
      }
      [queue removeObjectsInArray:toDelete];
    }
  }
}

RCT_EXPORT_MODULE();

@end
