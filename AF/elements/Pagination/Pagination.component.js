// @flow

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  UIManager,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import Press from '../Press';
import Text from '../Text';
import Lottie from '../Lottie';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import strings from 'strings';
import {connect} from 'react-redux';
import type {State} from 'types';
import {screenBottomSpace} from 'dimensions';
import Next from 'images/pagination/next.svg';
import Back from 'images/pagination/back.svg';
import dismissKeyboard from 'react-native-dismiss-keyboard';

type Props = {
  children: any,
  onNext: number => boolean,
  onFinish: () => void,
  hideNextActionsInIndexs?: Array<any>,
  styleButtonNext: any,
  styleButtonBack: any,
  styleTextNext: any,
  styleTextBack: any,
  loading: Array<string>,
  activeColor?: string,
  shadow?: any,
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Pagination = (props: Props) => {
  const [indexPage, setIndexPage] = useState(0);

  const widthNext = indexPage === 0 ? '80%' : '35%';
  const leftNext = (Dimensions.get('window').width / 100) * 10;
  const displayPrevious = indexPage > 0 ? undefined : 'none';
  const leftPrevious =
    displayPrevious === undefined
      ? (Dimensions.get('window').width / 100) * 10
      : 0;

  const displayNext =
    props.hideNextActionsInIndexs &&
    props.hideNextActionsInIndexs.includes(indexPage)
      ? 'none'
      : undefined;

  const widthPrevious =
    displayNext !== undefined ? '80%' : indexPage === 0 ? '0%' : '35%';

  return (
    <View style={styles.conatiner}>
      <View
        style={[
          styles.pagination,
          {
            left: -Dimensions.get('window').width * indexPage,
            width: Dimensions.get('window').width * props.children.length,
          },
        ]}>
        {props.children.map(child => (
          <ScrollView
            key={child.props.id}
            style={styles.childPagination}
            showsVerticalScrollIndicator={false}>
            {child}
            <View style={{height: screenBottomSpace}} />
          </ScrollView>
        ))}
      </View>
      <View style={styles.wrapperActions}>
        <Press
          style={[
            styles.action,
            props.styleButtonBack,
            {
              width: widthPrevious,
              marginLeft: leftPrevious,
              display: displayPrevious,
            },
            props.shadow && props.shadow,
          ]}
          onPress={() => {
            LayoutAnimation.configureNext({
              duration: 700,
              create: {
                type: 'spring',
                springDamping: 0.4,
                property: 'opacity',
              },
              update: {type: 'spring', springDamping: 0.9},
              delete: {
                type: 'spring',
                springDamping: 0.4,
                property: 'opacity',
              },
            });
            setIndexPage(indexPage - 1);
          }}>
          <View style={styles.iconBack}>
            <Back />
          </View>
          <Text style={[props.styleTextBack, styles.text]}>
            {strings.get('pagination.back')}
          </Text>
        </Press>
        <Press
          style={[
            styles.action,
            props.styleButtonNext,
            {
              width: widthNext,
              marginLeft: leftNext,
              display: displayNext,
            },
            props.shadow && props.shadow,
          ]}
          onPress={async () => {
            if (props.loading.includes('next')) {
              return false;
            }

            LayoutAnimation.configureNext({
              duration: 300,
              create: {
                type: 'spring',
                springDamping: 0.4,
                property: 'opacity',
              },
              update: {type: 'spring', springDamping: 0.9},
              delete: {
                type: 'spring',
                springDamping: 0.4,
                property: 'opacity',
              },
            });
            if (indexPage === props.children.length - 1) {
              props.onFinish && props.onFinish();
              dismissKeyboard();
            } else if (props.onNext && (await props.onNext(indexPage))) {
              setIndexPage(indexPage + 1);
              dismissKeyboard();
            } else if (!props.onNext) {
              setIndexPage(indexPage + 1);
              dismissKeyboard();
            }
          }}>
          {props.loading.includes('next') ? (
            <Lottie type="loading" />
          ) : (
            <>
              <Text style={[props.styleTextNext, styles.text]}>
                {indexPage === props.children.length - 1
                  ? strings.get('pagination.end')
                  : strings.get('pagination.next')}
              </Text>
              <View style={styles.iconNext}>
                <Next />
              </View>
            </>
          )}
        </Press>
      </View>
      <View style={styles.indexs}>
        <View style={styles.indexsWrap}>
          {props.children.map((child, index) => (
            <View
              key={child.props.id}
              style={[
                styles.point,
                index <= indexPage && {
                  backgroundColor: props.activeColor ?? '#000000',
                  borderColor: props.activeColor ?? '#000000',
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  action: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  iconNext: {
    width: '10%',
    marginLeft: '-5%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconBack: {
    width: '10%',
    marginRight: '-5%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  pagination: {
    position: 'relative',
    flexDirection: 'row',
    height: '100%',
    paddingBottom: (Platform.OS === 'ios' ? getBottomSpace() : 40) + 60,
  },
  childPagination: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  wrapperActions: {
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: Platform.OS === 'ios' ? getBottomSpace() : 40,
    flexDirection: 'row',
  },
  text: {
    width: '90%',
    textAlign: 'center',
  },
  indexs: {
    position: 'absolute',
    width: '100%',
    bottom: Platform.OS === 'ios' ? getBottomSpace() - 30 : 10,
  },
  indexsWrap: {
    position: 'relative',
    width: '100%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  point: {
    width: 10,
    height: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A09AC7',
  },
});

const mapStateToProps = (state: State) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Pagination);
