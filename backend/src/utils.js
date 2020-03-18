const { verify } = require('jsonwebtoken')

const APP_SECRET = process.env.APP_SECRET;
const sanitizeHtml = require('sanitize-html');
const crypto = require('crypto');
const cuid = require('cuid');
const ipRegex = require('ip-regex');
const isValidEmail = require('is-valid-email');
const bcrypt = require('bcryptjs');

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
});

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET)
    return verifiedToken && verifiedToken.userId
  }
}

exports = Id

function md5(text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

function isValidIp(ip) {
  return ipRegex({ exact: true }).test(ip)
}

const validator = Object.freeze({
  isValidEmail:isValidEmail
})

function sanitize(text) {
  // TODO: allow more coding embeds
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it']
  })
}


function makeSource({ ip, browser, referrer } = {}) {
  if (!ip) {
    throw new Error('Source must contain an IP.')
  }
  if (!isValidIp(ip)) {
    throw new RangeError('Source must contain a valid IP.')
  }
  return Object.freeze({
    getIp: () => ip,
    getBrowser: () => browser,
    getReferrer: () => referrer
  })
}

function isValidAuthor(author) {
  if (!author.id || !Id.isValidId(author.id) || !author.email || !author.firstname || !author.lastname)
    return false;

  return true;
}

function makeHash(text) {
  return md5(text);
}

async function makePasswordHash(password){
  return await bcrypt(password,10);
}

module.exports = {
  getUserId,
  APP_SECRET,
  sanitize,
  md5,
  Id,
  makeHash,
  isValidAuthor,
  makeSource,
  validator,
  makePasswordHash
}
