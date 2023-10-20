import Prismic from 'prismic-javascript'

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
          return api.query('')
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
  getRepeatable (type) {
    // let orderings = '[my.xxx.date desc]'
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api.query(
            Prismic.Predicates.at('document.type', type),
            { pageSize: 100 }
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
  getSingleRepeatable (type, uid) {
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api.getByUID(type, uid)
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
  getSingleton (type) {
    return new Promise((resolve, reject) => {
      Prismic.getApi(process.env.prismicRoot)
        .then((api) => {
          return api.getSingle(type)
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
