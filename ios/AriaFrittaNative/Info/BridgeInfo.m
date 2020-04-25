//
//  BridgeInfo.m
//  AriaFrittaNative
//
//  Created by Giacomo Materozzi on 16/03/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "BridgeInfo.h"

@implementation BridgeInfo

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getCountry, resolver: (RCTPromiseResolveBlock)resolve
     rejecter:(RCTPromiseRejectBlock)reject)
{
  NSLocale *currentLocale = [NSLocale currentLocale];  // get the current locale.
  NSString *countryCode = [currentLocale objectForKey:NSLocaleCountryCode];
  
  resolve(countryCode);
}
@end
