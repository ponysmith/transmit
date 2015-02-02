/**
 * Basic Transmit pub/sub object
 */ 
var transmit = function() {

    var _topics = {};

    var _public = {

        /**
         * Utility method to get all current subscriptions
         */
        getSubscriptions: function() {
            return _topics;
        },

        /**
         * Subscribe to a topic
         * @param (str) topic: The name of the topic to subscribe to
         * @param (function) callback: The callback to bind to the subscription
         * @param (object) options: Additional options for the subscription
         * @return (obj): Returns an object with a unsub() method for unsubscribing the event
         */
        subscribe: function(topic, callback, options) {
            options = options || {};
            // Create the topic if it doesn't already exist
            if(!_topics.hasOwnProperty(topic)) _topics[topic] = [];
            // Set the index for the new event
            var index = _topics[topic].length;
            // Create the subscription
            var subscription = { callback: callback }
            subscription.once = (options.once) ? true : false;
            subscription.unsubscribe = function() { (_topics[topic].length > 1) ? _topics[topic].splice(index,1) : delete _topics[topic]; }
            // Add the event to the topic queue
            _topics[topic].push(subscription);
            // Return the unsubscribe method for manual unsubscribe
            return { unsubscribe: subscription.unsubscribe }
        },

        /**
         * Publish a topic and fire the associated callbacks
         * @param (str) topic: Name of the topic to publish
         * @param (mixed) args: Arguments to be passed into the callback function
         */
        publish: function(topic, args) {
            // If there are no subscriptions for the event, bail!
            if(!_topics.hasOwnProperty(topic)) return;
            // Loop though and fire all subscribed callbacks
            _topics[topic].forEach(function(subscription) {
                if(typeof subscription.callback === 'function') subscription.callback(args);
                if(subscription.once) subscription.unsubscribe();
            });
        },  

        /** 
         * Remove a topic and all associated subscriptions
         * @param (str) topic: Name of the topic to remove
         */
        remove: function(topic) {
            if(!_topics.hasOwnProperty(topic)) return;
            delete _topics[topic];
        },

        /**
         * Remove all topics and subscriptions
         */
        destroy: function() {
            _topics = {};
        },

    }

    return _public;

}