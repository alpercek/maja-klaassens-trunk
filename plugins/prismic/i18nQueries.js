import Prismic from 'prismic-javascript'

const prismicLocales = {
  en: 'en-gb',
  fr: 'fr-fr',
  nl: 'nl-nl'
}

export default {
  getInfo () {
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api
        })
        .then(
          (response) => {
            resolve(response)
          },
          (response) => {
            reject(response)
          }
        )
    })
  },
  getEverything () {
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api.query('', { lang: '*' })
        })
        .then(
          (response) => {
            resolve(response.results)
          },
          (response) => {
            reject(response)
          }
        )
    })
  },
  getRepeatable (type, locale) {
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api.query(
            Prismic.Predicates.at('document.type', type),
            { lang: prismicLocales[locale] }
          )
        })
        .then(
          (response) => {
            resolve(response.results)
          },
          (response) => {
            reject(response)
          }
        )
    })
  },
  getSingleRepeatable (type, uid, locale) {
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api.getByUID(type, uid, { lang: prismicLocales[locale] })
        })
        .then(
          (response) => {
            resolve(response)
          },
          (response) => {
            reject(response)
          }
        )
    })
  },
  getSingleton (type, locale) {
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api.query(
            Prismic.Predicates.at('document.type', type),
            { lang: prismicLocales[locale] }
          )
        })
        .then(
          (response) => {
            resolve(response.results[0])
          },
          (response) => {
            reject(response)
          }
        )
    })
  },
  getByID (id) {
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api.getByID(id)
        })
        .then(
          (response) => {
            resolve(response)
          },
          (response) => {
            reject(response)
          }
        )
    })
  }
}
