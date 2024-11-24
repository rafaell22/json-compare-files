import path from 'path';
import file from '@rafaell22/file-handling';
import deepEqual from 'deep-equal';

const filesDirectory = path.resolve('./data/');

(async () => {
  let files;
  try {
    files = await file.read.all(filesDirectory);
  } catch(errorReadingData) {
    console.log(`Error reading files at ${filesDirectory}`);
    console.log(errorReadingData);
    return;
  }

  let file1;
  let file2;
  try {
    file1 = await file.read.json(files[0]);
    file2 = await file.read.json(files[10]);
  } catch(errorReadingJsonFiles) {
    console.log(`Error reading json files ${files[0]} and ${files[1]}`);
    console.log(errorReadingJsonFiles);
    return;
  }

  console.log(deepEqual(file1, file2, {
    strict: true,
  }));
})()

function compareJsonFiles(files, jsonData) {
  const data = [];

  console.log(`Reading file ${files[0]}...`);
  return readFileAsync(`${filesDirectory}${files[0]}`)
    .then((resultGetData) => {
      data[0] = JSON.parse(resultGetData);

      console.log(`Reading file ${files[1]}...`);
      return readFileAsync(`${filesDirectory}${files[1]}`)
    })
    .then((resultGetData) => {
      data[1] = JSON.parse(resultGetData);

      return deepEqual(data[0], data[1], {
        strict: true
      });
    });
}
