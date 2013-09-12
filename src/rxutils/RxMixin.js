var RxMixin = {

  componentWillMount: function() {
    if (!this.getSubjects) return;
    var subjects = this.subjects = this.getSubjects();
    var eventHandlers = {};
    Object.keys(subjects).forEach(function(key) {
      eventHandlers[key] = subjects[key].onNext.bind(subjects[key]);
    });
    this.handlers = eventHandlers;
  },

  componentDidMount: function() {
    if (!this.getStreams) return;
    var streams = this.getStreams();
    var subscriptions = {};
    Object.keys(streams).forEach(function(key) {
      subscriptions[key] = streams[key].subscribe(function(value) {
        var newPartialState = {};
        newPartialState[key] = value;
        this.setState(newPartialState);
      }.bind(this));
    }, this);
    this._subscriptions = subscriptions;
  },

  componentWillUnmount: function() {
    var subscriptions = this._subscriptions;
    if (!subscriptions) return;
    this._subscriptions = null;
    Object.keys(subscriptions).forEach(function(key) {
      subscriptions[key].dispose();
    });
  }

};

module.exports = RxMixin;