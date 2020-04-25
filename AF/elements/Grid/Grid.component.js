// @flow

import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

type PropsElement = {
  style?: any,
  columns: number,
  rows: number,
  children?: any,
  id: any,
};

export const GridElement = (props: PropsElement) => {
  return <View style={props.style}>{props.children}</View>;
};

type Coords = {
  x: number,
  y: number,
  listOfHeights: Array<number>,
};

type PropsGrid = {
  style?: any,
  columns: number,
  unitHeight: number,
  unitWidth?: number,
  children: Array<any>,
};

const GridComponent = (props: PropsGrid) => {
  const unitWidth: number =
    props.unitWidth !== undefined
      ? props.unitWidth
      : Dimensions.get('window').width / props.columns;
  const unitHeight = props.unitHeight;

  let positions = [];
  let coords: Coords = {
    x: 0,
    y: 0,
    listOfHeights: Array(props.columns).fill(0),
  };

  props.children.forEach(element => {
    for (let i = coords.x + 1; i < coords.x + element.props.columns; i++) {
      if (coords.listOfHeights[i] >= coords.y) {
        const indexOfMaxValue = coords.listOfHeights.reduce(
          (iMax, value, index, arr) => (value > arr[iMax] ? index : iMax),
          0,
        );

        coords.y = coords.listOfHeights[indexOfMaxValue];
      }
    }

    if (coords.x + element.props.columns > props.columns) {
      const indexOfMaxValue = coords.listOfHeights.reduce(
        (iMax, value, index, arr) => (value > arr[iMax] ? index : iMax),
        0,
      );

      coords.x = indexOfMaxValue;
      coords.y = coords.listOfHeights[indexOfMaxValue];
    }

    positions.push({
      key: element.props.id,
      x: coords.x * unitWidth,
      y: coords.y * unitHeight,
      width: unitWidth * element.props.columns,
      height: unitHeight * element.props.rows,
      children: element,
    });

    coords.listOfHeights[coords.x] += element.props.rows;

    const indexOfMinValue = coords.listOfHeights.reduce(
      (iMin, value, index, arr) => (value < arr[iMin] ? index : iMin),
      0,
    );

    coords.x = indexOfMinValue;
    coords.y = coords.listOfHeights[coords.x];
  });

  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[
          {height: Math.max(...coords.listOfHeights) * unitHeight},
          styles.scroll,
        ]}
      />
      {positions.map(position => (
        <View
          key={position.key}
          style={[
            styles.wrapElement,
            {
              left: position.x,
              top: position.y,
              width: position.width,
              height: position.height,
            },
          ]}>
          {position.children}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    width: '100%',
  },
  wrapElement: {
    position: 'absolute',
    padding: 10,
  },
  element: {
    position: 'relative',
  },
});

export default GridComponent;

/*
import {Grid, GridElement} from 'elements';

<Grid columns={2} unitHeight={60} style={props.style}>
    {props.data.map(category => (
      <GridElement
        key={category.id}
        id={category.id}
        columns={category.columns}
        rows={category.rows}
        style={styles.element}>
        <Press
          style={styles.element}
          onPress={() => {
            props.onPress && props.onPress(category);
          }}
          scalable>
          <MagicMove.View
            id={`category-${category.id}`}
            style={styles.category}
            duration={350}>
            <Text id={`category-${category.id}-title`} style={styles.title}>
              {category.name}
            </Text>
          </MagicMove.View>
        </Press>
      </GridElement>
    ))}
  </Grid>
*/
