import SlackDispatcher from '../dispatcher/SlackDispatcher';
import { EventEmitter } from 'events';
import SlackConstants from '../constants/SlackConstants';

let _channels = {};
let _ims = {};

let CHANGE_EVENT = Symbol();

class SlackChannelStore extends EventEmitter {
  getChannels() { return _channels; }
  getIms() { return _ims; }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}
let slackChannelStore = new SlackChannelStore();

SlackDispatcher.register((action) => {
  switch(action.actionType) {
    case SlackConstants.UPDATE_CHANNELS:
      _channels = action.channels;
      slackChannelStore.emitChange();
      break;
    case SlackConstants.UPDATE_IMS:
      _ims = action.ims;
      slackChannelStore.emitChange();
      break;
  }
});

export default slackChannelStore;
