transmit
=========

Transmit is a small Javascript Pub/Sub utility for broadcasting and responding to custom events.  


Dependencies
-------------
transmit.js has no dependencies

Usage
-------------
Begin by instantiating a Transmit object:

    var Transmit = new transmit;
  
Subscribe to a topic by using the `subscribe` method.  The subscribe method takes three arguments:
  1. **topic** (string) (required) - The name of the topic to subscribe to.
  2. **callback** (function) (required) - The callback function to execute when the topic is triggered
  3. **options** (object) (optional) - Options object

    Transmit.subscribe('mytopic', function(arg1, arg2) {
      console.log('Arg 1: ' + arg1);
      console.log('Arg 2: ' + arg2);
    });

To trigger the subscriptions, use the `publish` method.  The publish method takes two arguments:
  1. **topic** (string) (required) - The name of the subscription queue to trigger
  2. **args** (mixed) (optional) - Arguments to be passed to the callback function

    Transmit.publish('mytopic');


Additional docs
-----------------
For additional documentation about options and other methods for the Transmit object, visit:

http://ponysmith.github.io/transmit
