const sourcemap = require('../ios/sourcemap.all.json');
const fs = require('fs');
const SourceMapConsumer = require('source-map').SourceMapConsumer;
const SourceMapGenerator = require('source-map').SourceMapGenerator;

const addMappingFromConsumer = (generator, mapping) => {
  generator.addMapping({
    generated: {line: mapping.generatedLine, column: mapping.generatedColumn},
    source: mapping.source,
    original: {line: mapping.originalLine, column: mapping.originalColumn},
    name: mapping.name,
  });
};

const removeSource = async (sourcesToRemove, map) => {
  if (typeof map === 'string' || map instanceof String) {
    map = JSON.parse(map);
  }
  var consumer = await new SourceMapConsumer(map);
  var generator = new SourceMapGenerator({
    file: map.file,
    sourceRoot: map.sourceRoot,
  });
  consumer.eachMapping(mapping => {
    if (mapping.source && !mapping.source.includes(sourcesToRemove))
      addMappingFromConsumer(generator, mapping);
  });
  return generator.toJSON();
};

const run = async () => {
  const newMap = await removeSource('node_modules', sourcemap);
  fs.writeFile('ios/sourcemap.app.json', JSON.stringify(newMap), err => {
    if (err) {
      throw Error(err);
    }
    console.log('success');
  });
};

run();
