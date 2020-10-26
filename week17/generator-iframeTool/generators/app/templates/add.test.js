var assert = require('assert');
import { add, mul } from "../src/add";
// var add = require('../add').add;
// var mul = require('../add').mul;

describe('add function testing', () => {
  it('1 + 2 should be 3', function() {
    assert.equal(add(1,2), 3);
  });

  it('-5 + 2 should be -3', function() {
    assert.equal(add(-5,2), -3);
  });

  it('0 + 0 should be 0', function() {
    assert.equal(add(0,0), 0);
  });
});
describe('multiplication function testing', () => {
  it('1 * 2 should be 2', function() {
    assert.equal(mul(1,2), 2);
  });
});