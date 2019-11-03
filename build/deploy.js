const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');

const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI4FjuHosYWv3G4M6AkDW1',
  accessKeySecret: 'FHK7ZWIVeA4Ou681eJWviKaH5zqqsH',
  bucket: 'test-qttc',
});

const put = async (file) => {
  try {
    //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
    const result = await client.put(file, path.join(__dirname, '../dist', file));
    console.log(`${result.name} uploaded`);
  } catch (e) {
    console.error(`${file} error: ${e}`);
  }
};

const list = [];

const files = fs.readdirSync(path.join(__dirname, '../dist'));

const listDir = (files) => {
  for (let i = 0; i < files.length; i++) {
    if (['ads.txt', '.DS_Store'].includes(files[i])) {
      continue;
    }

    const fullPath =  path.join(__dirname, `../dist/${files[i]}`);

    if (fs.lstatSync(fullPath).isDirectory()) {
      const subFiles = fs.readdirSync(fullPath);

      for (let j = 0; j < subFiles.length; j++) {
        if (subFiles[j] !== '.DS_Store') {
          subFiles[j] = `${files[i]}/${subFiles[j]}`;
        }
      }

      listDir(subFiles);
    } else {
      list.push(files[i]);
    }
  }
};

listDir(files);

list.forEach(async (file) => {
  await put(file);
});
