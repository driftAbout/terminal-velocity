'use strict';

const History = require('../../lib/history.js');

describe('Stack Data Structure Module', function () {
  var stack = new History

  describe('default properties', () => {
    it('should create a new instance of a Stack', () => {
      expect(stack).toBeInstanceOf(History)
    })
    it('should have a default val of null assigned to the top property', () => {
      expect(stack.top).toBeNull()
    })
    it('should have a default val of 0 assigned to the size property', () => {
      expect(stack.size).toEqual(0)
    })
  })
  describe('#push', () => {
    it('should add a new node with the val of 1 to the top of the stack', () => {
      stack.push(1)
      expect(stack.top.path).toEqual(1)
    })
    it('should remove the bottom of the stack if the size is larger than 10', () => {
      for (let i = 0; i < 11; i++, stack.push(i));
      expect(stack.bottom.path).toEqual(2)
    })
  })
  describe('#pop', () => {
    it('should remove the top most node from the stack', () => {
      stack.push(1)
      expect(stack.top.path).toEqual(1)
      expect(stack.pop()).toEqual(1)
    })
    it('should set top and bottom to null if there is only one item in the stack', () => {
      let stack = new History();
      stack.push(1)
      expect(stack.pop()).toEqual(1)
      expect(stack.top).toBeNull();
      expect(stack.bottom).toBeNull();
    })
  })
})
