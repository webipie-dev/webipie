const express = require('express');
const router = express.Router();
const Store = require('../models/store');

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
passportJWT.unless = require('express-unless');

const AWS = require('aws-sdk');
const {uuid} = require('uuidv4');
const keys = require('../configuration/index');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  // region: 'us-west-2',
  region: 'eu-west-3',
  signatureVersion: 'v4',
})

router.get('', passportJWT, async (req, res) => {
  const {store, fileType}  = req.query;

  const ext = fileType.split('/')[1];
  const key = `${store}/${uuid()}.${ext}`

  s3.getSignedUrl('putObject', {
    Bucket: 'webipie-images',
    ContentType: fileType,
    Key: key
  }, (err, url) => res.send({key, url}))

})

module.exports = router;
