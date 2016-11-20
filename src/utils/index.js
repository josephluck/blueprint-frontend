const getScrollParent = function (node) {
  if (node === null) {
    return null
  }
  if (node.scrollHeight > node.clientHeight) {
    return node
  } else {
    return getScrollParent(node.parentNode)
  }
}

module.exports = {
  debounce: require('debounce'),
  getScrollParent,
  throttle: require('throttleit')
}
