import React, {useRef, forwardRef, useImperativeHandle, useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Image} from 'react-native';
import ImageView from '../Image';
import Svg, {Defs, ClipPath, Circle, Rect} from 'react-native-svg';
import ImageEditor from '@react-native-community/image-editor';
import ImageResizer from 'react-native-image-resizer';

type Src = {
  uri: string,
};

type Props = {
  src: Src,
};

const CropViewComponent = forwardRef((props: Props, ref) => {
  const [realImage, setRealImage] = useState(undefined);

  realImage === undefined &&
    Image.getSize(props.src.uri, (width, height) => {
      setRealImage({width, height});
    });

  const widthMask = Dimensions.get('screen').width;
  const heightMask = Dimensions.get('screen').width;

  const screenHeight = Dimensions.get('screen').height;

  const imageWidth = widthMask;
  const imageHeight = heightMask;

  const scrollView = useRef();

  const [detailCrop, setDetailCrop] = useState({
    x: 0,
    y: 0,
    width: widthMask,
    height: heightMask,
    zoom: 1,
  });

  useImperativeHandle(
    ref,
    () => ({
      detail: () => {
        return detailCrop;
      },
      crop: async () => {
        let widthToScale = imageWidth;
        let heightToScale = imageHeight;

        if (realImage.width < realImage.height) {
          heightToScale = (widthToScale * realImage.height) / realImage.width;
        } else {
          widthToScale = (realImage.width * heightToScale) / realImage.height;
        }

        const cropData = {
          offset: {
            x: detailCrop.x + (widthToScale - imageWidth) / 2,
            y: detailCrop.y,
          },
          size: {
            width: detailCrop.width,
            height: detailCrop.height,
          },
        };

        const image = await ImageResizer.createResizedImage(
          props.src.uri,
          widthToScale,
          heightToScale,
          'JPEG',
          100,
        );

        return ImageEditor.cropImage(image.uri, cropData);
      },
      detailCrop,
      realImage,
    }),
    [detailCrop, realImage],
  );

  const checkPosition = event => {
    const nativeTop = screenHeight / 2 - heightMask / 2;
    const currentTop = nativeTop * event.nativeEvent.zoomScale;

    const limitTop = currentTop - nativeTop;

    const nativeBottom = screenHeight / 2 - heightMask / 2 + heightMask;
    const currentBottom = nativeBottom * event.nativeEvent.zoomScale;

    const limitBottom = currentBottom - nativeBottom;

    const nativeRight =
      Dimensions.get('screen').width -
      (Dimensions.get('screen').width - widthMask) / 2;
    const currentRight = nativeRight * event.nativeEvent.zoomScale;

    const limitRight = currentRight - nativeRight;

    const x =
      event.nativeEvent.contentOffset.x < 0
        ? 0
        : event.nativeEvent.contentOffset.x > limitRight
        ? limitRight
        : event.nativeEvent.contentOffset.x;

    if (event.nativeEvent.contentOffset.y < limitTop) {
      scrollView.current.scrollTo({
        y: limitTop,
        x,
        animated: false,
      });
      setDetailCrop({
        x: x / event.nativeEvent.zoomScale,
        y: limitTop / event.nativeEvent.zoomScale,
        width: widthMask / event.nativeEvent.zoomScale,
        height: heightMask / event.nativeEvent.zoomScale,
        zoom: event.nativeEvent.zoomScale,
      });
      return;
    } else if (event.nativeEvent.contentOffset.y > limitBottom) {
      scrollView.current.scrollTo({
        y: limitBottom,
        x,
        animated: false,
      });
      setDetailCrop({
        x: x / event.nativeEvent.zoomScale,
        y: limitBottom / event.nativeEvent.zoomScale,
        width: widthMask / event.nativeEvent.zoomScale,
        height: heightMask / event.nativeEvent.zoomScale,
        zoom: event.nativeEvent.zoomScale,
      });
      return;
    }

    setDetailCrop({
      x: event.nativeEvent.contentOffset.x / event.nativeEvent.zoomScale,
      y:
        (event.nativeEvent.contentOffset.y - limitTop) /
        event.nativeEvent.zoomScale,
      width: widthMask / event.nativeEvent.zoomScale,
      height: heightMask / event.nativeEvent.zoomScale,
      zoom: event.nativeEvent.zoomScale,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollToOverflowEnabled
        decelerationRate="fast"
        ref={scrollView}
        contentContainerStyle={[styles.scrollView]}
        directionalLockEnabled={false}
        showsHorizontalScrollIndicator={false}
        maximumZoomScale={3}
        minimumZoomScale={1}
        scrollEventThrottle={16}
        onMomentumScrollEnd={checkPosition}
        onScrollEndDrag={checkPosition}>
        <ImageView
          style={{width: imageWidth, height: imageHeight}}
          src={props.src}
        />
      </ScrollView>
      <View style={styles.containerMask} pointerEvents="none">
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${Dimensions.get('screen').width} ${
            Dimensions.get('screen').height
          }`}>
          <Defs>
            <ClipPath id="clip_out" clipRule="evenodd">
              <Rect
                width={Dimensions.get('screen').width}
                height={Dimensions.get('screen').height}
              />
              <Circle
                cx={Dimensions.get('screen').width / 2}
                cy={Dimensions.get('screen').height / 2}
                r={Dimensions.get('screen').width / 2}
              />
            </ClipPath>
          </Defs>
          <Rect
            width={Dimensions.get('screen').width}
            height={Dimensions.get('screen').height}
            fill="rgba(100, 100, 100, 0.9)"
            clipPath="url(#clip_out)"
          />
        </Svg>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
  },
  scrollView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  containerMask: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 2,
  },
});

export default CropViewComponent;
