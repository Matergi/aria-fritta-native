// @flow

import React from 'react';
import {SafeAreaView, StyleSheet, Image, ScrollView, View} from 'react-native';
import {Text, Press} from 'elements';
import {SharedElement} from 'react-navigation-shared-element';

import {connect} from 'react-redux';
import {AddItem, DeleteItem, DeleteAllItem} from 'StateUpdaters';
import {ChangeScreen, Logout} from 'SideEffects';

import strings from 'strings';
import screens from 'router';

import type {State, InfoUser, Item} from 'types';

import Test from 'images/test.jpg';

type Props = {
  user: InfoUser,
  items: Array<Item>,
  addItem: string => void,
  deleteItem: string => void,
  openDetail: string => void,
  deleteAllItem: () => void,
  logout: () => void,
};

const HomeScreen = ({
  user,
  items,
  addItem,
  deleteItem,
  openDetail,
  deleteAllItem,
  logout,
}: Props) => (
  <SafeAreaView style={styles.home}>
    <ScrollView>
      <Text style={styles.name}>{`${strings.get('home.hi')} ${user &&
        user.name}`}</Text>
      <View style={styles.actions}>
        <Press style={styles.action} onPress={() => addItem('test')}>
          <Text>{strings.get('home.add')}</Text>
        </Press>
        <Press style={styles.action} onPress={() => deleteAllItem()}>
          <Text>{strings.get('home.clear')}</Text>
        </Press>
        <Press style={styles.action} onPress={() => logout()}>
          <Text>{strings.get('home.logout')}</Text>
        </Press>
      </View>
      {items.map(item => (
        <Press
          key={item.key}
          style={styles.item}
          onPress={() => {
            openDetail(item.key);
          }}>
          <SharedElement id={`item-${item.key}`}>
            <Image style={styles.image} source={Test} />
          </SharedElement>
        </Press>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  home: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 20,
  },
  item: {
    width: '90%',
    marginLeft: '5%',
    marginBottom: '5%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  action: {
    width: 100,
    height: 40,
    backgroundColor: 'grey',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
  },
});

const mapStateToProps = (state: State) => ({
  user: state.user?.info,
  items: state.items,
});

const mapDispatchToProps = dispatch => ({
  addItem: (name: string) => dispatch(AddItem(name)),
  deleteItem: (key: string) => dispatch(DeleteItem(key)),
  openDetail: (id: string) =>
    dispatch(ChangeScreen(screens.detail, {detailId: id})),
  deleteAllItem: () => dispatch(DeleteAllItem()),
  logout: () => dispatch(Logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
