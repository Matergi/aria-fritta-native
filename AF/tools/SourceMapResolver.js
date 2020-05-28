// @flow

import SourceMap from 'source-map';
import StackTrace from 'stacktrace-js';
import {Platform} from 'react-native';

class SourceMapResolver {
  static instance: SourceMapResolver;
  sourceMapper: SourceMap.SourceMapConsumer;

  constructor() {
    if (!SourceMapResolver.instance) {
      SourceMapResolver.instance = this;
    }

    this.createSourceMapper();
    return SourceMapResolver.instance;
  }

  // it is possible that this block the ui thread
  createSourceMapper = async () => {
    const sourceMap = require('../../sourcemap/sourcemap.json');

    const mapConsumer = new SourceMap.SourceMapConsumer(sourceMap);

    this.sourceMapper = row => {
      return mapConsumer.originalPositionFor({
        line: row.lineNumber,
        column: row.columnNumber,
      });
    };

    // load mapper in cache, this operation is slow
    this.sourceMapper({lineNumber: 0, columnNumber: 0});
  };

  stackTrace = async (crash: any) => {
    if (!this.sourceMapper) {
      await this.createSourceMapper();
    }

    if (!this.sourceMapper) {
      return ['no sourceMap'];
    }

    let minStackTrace;

    if (Platform.OS === 'ios') {
      minStackTrace = await StackTrace.fromError(crash);
    } else {
      minStackTrace = await StackTrace.fromError(crash, {offline: true});
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

    return stackTrace;
  };
}

const instance = new SourceMapResolver();
Object.freeze(instance);

export default instance;
