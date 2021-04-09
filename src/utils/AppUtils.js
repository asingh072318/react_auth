import moment from 'moment'

export function hideLoginModal () {
  $('#login-signup-modal').modal('toggle')
}

export function setCookie (name, value, days) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toGMTString()
  }
  document.cookie = name + '=' + value + ';' + expires + '; path=/'
}

export function getCookie (name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  return (parts.length === 2) ? parts.pop().split(';').shift() : ''
}

export function deleteCookie (name) {
  setCookie(name, '', -1)
}

export function sortArrayOfObjectsByKey (inputArray, Key) {
  return inputArray.sort(
    (obj1, obj2) => parseFloat(obj1[Key]) - parseFloat(obj2[Key])
  )
}

export function prepareOptionsForReactSelect (object, defaultValue, defaultLabel) {
  console.log('object from prepareOptionsForReactSelect', object)
  let defaultOption = []
  if (defaultValue && defaultLabel) {
    defaultOption = [{'value': defaultValue, 'label': defaultLabel}]
  }
  let options = []
  console.log('prepareOptionsForReactSelect ', options)
  for (let key in object) {
    options.push({'value': key, 'label': object[key]})
  }
  console.log('prepareOptionsForReactSelect ', options)
  sortArrayOfObjectsByValue(options, 'label')

  return defaultOption.concat(options)
}

export function prepareIntegerOptionsForReactSelect (start, end, defaultValue, defaultLabel, roomNo = 1, childNo = 1) {
  let options = []
  let defaultOption = [{'value': defaultValue, 'label': defaultLabel, 'roomNo': roomNo, childNo: childNo}]
  for (let i = start; i <= end; i++) {
    options.push({'value': i, 'label': i, 'roomNo': roomNo, childNo: childNo})
  }
  return defaultOption.concat(options)
}

export function prepareButtonsForButtonGroup (list) {
  let buttons = []
  for (let i = 0; i < list.length; i++) {
    buttons.push({'name': list[i].fare})
  }
  return buttons
}

export function getCurrentScreenSize () {
  var xs = 768, sm = 991, md = 1199
  var size = document.documentElement.clientWidth
  return (size < xs) ? 'xs' : (size <= sm) ? 'sm' : (size <= md) ? 'md' : 'lg'
}

export function getCurrentScreenWidth () {
  var size = document.documentElement.clientWidth
  return size
}

export function getAccessToken () {
  return getCookie('access_token')
}
export function removeAccessToken () {
  deleteCookie('access_token')
}

// this is the method to show the Login modal if user is not logged in
export function loginCheck () {
  if (getCookie('42c325-70k32') == '' || getCookie('42c325-70k32') == null) {
    $('#login-signup-modal').modal('show')
    // this should be removed and replaced with state varibale---->this.props.userActions.setLoginModalState("open");
    return false
  }
  // writen while fixing errors in PaymentThroughWalletButton
  else {
    return true
  }
}
export function convertDateToReadableFormat (date, inputformat, outputformat) {
  let readableDate = moment(date, inputformat).format(outputformat)
  // console.log("date ", moment(date, inputformat));
  // console.log("readableDate ", readableDate);
  return readableDate
}

export function getDifferenceInHours (date1, date2, inputformat) {
  let start = moment(date1, inputformat)
  let end = moment(date2, inputformat)
  let diffInHours = moment.duration(end.diff(start)).asHours()
  return diffInHours
}

export function getDifferenceInDays (date1, date2, inputformat) {
  let start = moment(date1, inputformat)
  let end = moment(date2, inputformat)
  let diffInDays = end.diff(start, 'days')
  console.log('diffInDays', diffInDays)
  return diffInDays
}

function compare (a, b) {
  if (a.label.toLowerCase() < b.label.toLowerCase()) {
    return -1
  } else if (a.label.toLowerCase() > b.label.toLowerCase()) {
    return 1
  } else {
    return 0
  }
}
export function sortArrayOfObjectsByValue (inputArray, key) {
  return inputArray.sort(compare)
}

export function getMediumLoaderIconSource () {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTRweCcgaGVpZ2h0PSc1NHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9InVpbC1kZWZhdWx0Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDBiMmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwYjJmZicgdHJhbnNmb3JtPSdyb3RhdGUoMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjA4MzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDBiMmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMTY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMGIyZmYnIHRyYW5zZm9ybT0ncm90YXRlKDkwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4yNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwYjJmZicgdHJhbnNmb3JtPSdyb3RhdGUoMTIwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4zMzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDBiMmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjQxNjY2NjY2NjY2NjY2NjdzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMGIyZmYnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwYjJmZicgdHJhbnNmb3JtPSdyb3RhdGUoMjEwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC41ODMzMzMzMzMzMzMzMzM0cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDBiMmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMGIyZmYnIHRyYW5zZm9ybT0ncm90YXRlKDI3MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNzVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMGIyZmYnIHRyYW5zZm9ybT0ncm90YXRlKDMwMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuODMzMzMzMzMzMzMzMzMzNHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwYjJmZicgdHJhbnNmb3JtPSdyb3RhdGUoMzMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC45MTY2NjY2NjY2NjY2NjY2cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PC9zdmc+'
}

export function getSmallLoaderIconSource () {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjRweCcgaGVpZ2h0PScyNHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9InVpbC1kZWZhdWx0Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDBiMmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwYjJmZicgdHJhbnNmb3JtPSdyb3RhdGUoMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjA4MzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDBiMmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMTY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMGIyZmYnIHRyYW5zZm9ybT0ncm90YXRlKDkwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4yNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwYjJmZicgdHJhbnNmb3JtPSdyb3RhdGUoMTIwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4zMzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDBiMmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjQxNjY2NjY2NjY2NjY2NjdzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMGIyZmYnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwYjJmZicgdHJhbnNmb3JtPSdyb3RhdGUoMjEwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC41ODMzMzMzMzMzMzMzMzM0cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDBiMmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMGIyZmYnIHRyYW5zZm9ybT0ncm90YXRlKDI3MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNzVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMGIyZmYnIHRyYW5zZm9ybT0ncm90YXRlKDMwMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuODMzMzMzMzMzMzMzMzMzNHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwYjJmZicgdHJhbnNmb3JtPSdyb3RhdGUoMzMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC45MTY2NjY2NjY2NjY2NjY2cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PC9zdmc+'
}

export function getSuccessIconSource () {
  return 'data:image/png;base64,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'
}

export function getAmenityNameById (amenitiesList, amenityId) {
  let filteredList = amenitiesList.filter(amenity => amenity.id == amenityId)
  return filteredList.length > 0 ? filteredList[0].name : -1
}

/**
 * [firstKeyOfObject will return first key of given object]
 * @param  {object}
 * @return {string}
 */
export function firstKeyOfObject (object) {
  for (let first in object) {
    return first
  }
}

export function makeAmenitiesObject (amenitiesList) {
  let amenitiesObject = {}
  amenitiesList.forEach(function (amenity) {
    amenitiesObject[amenity.id] = amenity
  })
  console.log('makeAmenitiesObject function return inside AppUtils.js', amenitiesObject)
  return amenitiesObject
}

export default {
  setCookie,
  getCookie,
  deleteCookie,
  sortArrayOfObjectsByKey,
  sortArrayOfObjectsByValue,
  prepareOptionsForReactSelect,
  prepareIntegerOptionsForReactSelect,
  prepareButtonsForButtonGroup,
  getCurrentScreenSize,
  getCurrentScreenWidth,
  getMediumLoaderIconSource,
  getSmallLoaderIconSource,
  getSuccessIconSource,
  getAccessToken,
  removeAccessToken,
  convertDateToReadableFormat,
  getDifferenceInHours,
  getDifferenceInDays,
  loginCheck,
  hideLoginModal
}
