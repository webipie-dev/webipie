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
  region: 'us-west-2',
  signatureVersion: 'v4',
})

router.get('', passportJWT, async (req, res) => {
  const {store}  = req.query;

  const key = `${store}/${uuid()}.png`

  s3.getSignedUrl('putObject', {
    Bucket: 'my-blog1-bucket-1',
    ContentType: 'image/png',
    Key: key
  }, (err, url) => res.send({key, url}))

})

module.exports = router;
