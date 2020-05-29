const sourcemap = require('../ios/sourcemap.all.json');
const SourceMapConsumer = require('source-map').SourceMapConsumer;

const minStackTrace = JSON.parse(process.argv[2]);

const run = async () => {
  const mapConsumer = await new SourceMapConsumer(sourcemap);
  const sourceMapper = row =>
    mapConsumer.originalPositionFor({
      line: row.lineNumber,
      column: row.columnNumber,
    });

  const stackTrace = minStackTrace.map((row, index) => {
    const mapped = sourceMapper(row);
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

  console.log(stackTrace);
};

run();

/*
Example use: 

compiled stacktracer: [{"columnNumber":5,"lineNumber":185254,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"SettingsComponent","source":"    at SettingsComponent (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:185254:5)"},{"columnNumber":24,"lineNumber":18750,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"renderWithHooks","source":"    at renderWithHooks (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:18750:24)"},{"columnNumber":19,"lineNumber":20707,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"mountIndeterminateComponent","source":"    at mountIndeterminateComponent (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:20707:19)"},{"columnNumber":22,"lineNumber":21287,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"beginWork$1","source":"    at beginWork$1 (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:21287:22)"},{"columnNumber":16,"lineNumber":11851,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"Object.invokeGuardedCallbackImpl","source":"    at Object.invokeGuardedCallbackImpl (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:11851:16)"},{"columnNumber":37,"lineNumber":11947,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"invokeGuardedCallback","source":"    at invokeGuardedCallback (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:11947:37)"},{"columnNumber":13,"lineNumber":24879,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"beginWork$$1","source":"    at beginWork$$1 (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:24879:13)"},{"columnNumber":18,"lineNumber":24072,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"performUnitOfWork","source":"    at performUnitOfWork (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:24072:18)"},{"columnNumber":28,"lineNumber":24054,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"workLoopSync","source":"    at workLoopSync (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:24054:28)"},{"columnNumber":17,"lineNumber":23909,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"renderRoot","source":"    at renderRoot (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:23909:17)"}]

Doc: node resolver.ios.js '{compiledStacktracer}'

> node resolver.ios.js '[{"columnNumber":5,"lineNumber":185254,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"SettingsComponent","source":"    at SettingsComponent (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:185254:5)"},{"columnNumber":24,"lineNumber":18750,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"renderWithHooks","source":"    at renderWithHooks (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:18750:24)"},{"columnNumber":19,"lineNumber":20707,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"mountIndeterminateComponent","source":"    at mountIndeterminateComponent (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:20707:19)"},{"columnNumber":22,"lineNumber":21287,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"beginWork$1","source":"    at beginWork$1 (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:21287:22)"},{"columnNumber":16,"lineNumber":11851,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"Object.invokeGuardedCallbackImpl","source":"    at Object.invokeGuardedCallbackImpl (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:11851:16)"},{"columnNumber":37,"lineNumber":11947,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"invokeGuardedCallback","source":"    at invokeGuardedCallback (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:11947:37)"},{"columnNumber":13,"lineNumber":24879,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"beginWork$$1","source":"    at beginWork$$1 (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:24879:13)"},{"columnNumber":18,"lineNumber":24072,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"performUnitOfWork","source":"    at performUnitOfWork (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:24072:18)"},{"columnNumber":28,"lineNumber":24054,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"workLoopSync","source":"    at workLoopSync (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:24054:28)"},{"columnNumber":17,"lineNumber":23909,"fileName":"blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee","functionName":"renderRoot","source":"    at renderRoot (blob:file:///d6cd3340-75f6-4dcd-b7e7-6909ccfedbee:23909:17)"}]'
*/
