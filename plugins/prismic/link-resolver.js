/**
 * Prefix non-default language urls
 * @param {*} doc
 */
function prefix (doc) {
  if (doc.lang === 'nl-nl') {
    return '/nl'
  }
  return ''
}

export default function (doc) {
  if (doc.type === 'home') {
    return `${prefix(doc)}/`
  }

  if (doc.type === 'about') {
    return '/about'
  }

  if (doc.type === 'text') {
    return '/text'
  }

  if (doc.type === 'work') {
    return '/' + doc.uid
  }
  return '/'
}
