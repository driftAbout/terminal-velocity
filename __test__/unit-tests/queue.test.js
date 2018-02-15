'use strict';

const Queue = require('../../lib/queue.js');

describe('Queue Data Structure Module', () => {
  var queue = new Queue();

  describe('default properties', () => {
    it('should create a new instance of a Queue', () => {
      expect(queue).toBeInstanceOf(Queue);
    });
    it('should have a default value of null assigned to the front property', () => {
      expect(queue.front).toBeNull();
    });
    it('should have a default value of null assigned to the back property', () => {
      expect(queue.back).toBeNull();
    });
  });
  describe('#enqueue', () => {
    it('should add a new node with the value of 1 to the back of the queue', () => {
      queue.enqueue(1);
      expect(queue.back.path).toEqual(1);
    });
  });
  describe('#dequeue', () => {
    it('should remove the furthest forward most node from the queue', () => {
      queue.enqueue(1)
      expect(queue.front.path).toEqual(1);
      expect(queue.dequeue().path).toEqual(1);
    });
    it('should return undefined if there is nothing to dequeue', () => {
      let queue = new Queue();
      expect(queue.dequeue()).toEqual(undefined);
    });
  });
  describe('#requeue', () => {
    it('should return the last dequeued song back to the front of the queue', () => {
      queue.enqueue(7);
      queue.dequeue();
      queue.dequeue();
      queue.requeue();
      expect(queue.front.path).toEqual(7);
    });
    it('should return undefined if there is nothing in history', () => {
      let queue = new Queue()
      expect(queue.requeue()).toBe(undefined);
    });
  });
});
