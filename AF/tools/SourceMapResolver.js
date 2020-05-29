// @flow

import RNFS from 'react-native-fs';
import SourceMap from 'source-map';
import StackTrace from 'stacktrace-js';
import {Platform} from 'react-native';

type Coords = {
  lineNumber: number,
  columnNumber: number,
};

type StackResolver = Promise<{
  originalStackTrace: Array<any>,
  compiledStackTrace: Array<any>,
}>;

class SourceMapResolver {
  static instance: SourceMapResolver;
  sourceMapper: Coords => SourceMap.MappedPosition;

  constructor() {
    /*
    you must use get() function for use this singleton.
    initialize this class all times is very expensive when crashed.
    */
  }

  static get = () => {
    if (!SourceMapResolver.instance) {
      SourceMapResolver.instance = new SourceMapResolver();
    }
    return SourceMapResolver.instance;
  };

  createSourceMapper = async () => {
    const SoureMapBundlePath =
      Platform.OS === 'ios'
        ? `${RNFS.MainBundlePath}/sourcemap.app.json`
        : 'sourcemap.app.json';

    const fileExists =
      Platform.OS === 'ios'
        ? await RNFS.exists(SoureMapBundlePath)
        : await RNFS.existsAssets(SoureMapBundlePath);

    if (!fileExists) {
      throw new Error(
        __DEV__
          ? 'Unable to read source maps in DEV mode'
          : `Unable to read source maps, possibly invalid sourceMapBundle file, please check that it exists here: ${SoureMapBundlePath}`,
      );
    }

    const mapContents =
      Platform.OS === 'ios'
        ? await RNFS.readFile(SoureMapBundlePath, 'utf8')
        : await RNFS.readFileAssets(SoureMapBundlePath, 'utf8');
    const sourceMaps = JSON.parse(mapContents);
    const mapConsumer = new SourceMap.SourceMapConsumer(sourceMaps);

    this.sourceMapper = row =>
      mapConsumer.originalPositionFor({
        line: row.lineNumber,
        column: row.columnNumber,
      });

    // load mapper in cache
    this.sourceMapper({lineNumber: 1, columnNumber: 1});
  };

  stackTrace = async (crash: any): StackResolver => {
    if (!this.sourceMapper) {
      await this.createSourceMapper();
    }

    let minStackTrace;

    if (Platform.OS === 'ios') {
      minStackTrace = await StackTrace.fromError(crash);
    } else {
      minStackTrace = await StackTrace.fromError(crash, {offline: true});
    }

    if (!this.sourceMapper) {
      return {
        originalStackTrace: ['no loaded'],
        compiledStackTrace: minStackTrace,
      };
    }

    const stackTrace = minStackTrace.map((row, index) => {
      const mapped = this.sourceMapper(row);
      const source = mapped.source || '';
      const fileName = source;
      const functionName = mapped.name || 'unknown';
      return {
        fileName,
        functionName,
        lineNumber: mapped.line,
        columnNumber: mapped.column,
        position: `${functionName}@${fileName}:${mapped.line}:${mapped.column}`,
      };
    });

    return {originalStackTrace: stackTrace, compiledStackTrace: minStackTrace};
  };
}

const instance = new SourceMapResolver.get();

export default instance;
