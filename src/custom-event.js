export {CustomEvent};

function CustomEvent(event, params = { bubbles: false, cancelable: false, detail: undefined }) {
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}

if (window && typeof window.CustomEvent !== 'function') {
  window.CustomEvent = CustomEvent;
  CustomEvent.prototype = window.Event.prototype;
}

