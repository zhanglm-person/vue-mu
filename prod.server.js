const express = require('express')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')
const axios = require('axios')
const path = require('path')

const app = express()

const router = express.Router()

// 因为vue-cli隐藏了webpack配置 之前通过webpack转发的接口，全部通过node服务来转发
router.get('/getDiscList', (req, res) => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => res.json(response.data))
    .catch(error => console.log(error))
})

router.get('/getCdInfo', (req, res) => {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      let ret = response.data
      if (typeof ret === 'string') {
        let reg = /^\w+\(({.+})\)$/
        let matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    })
    .catch(error => console.log(error))
})

router.get('/lyric', (req, res) => {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      let ret = response.data
      if (typeof ret === 'string') {
        let reg = /^\w+\(({.+})\)$/
        let matches = response.data.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    })
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => res.json(response.data))
    .catch(error => console.log(error))
})

router.post('/getPurlUrl', bodyParser.json(), (req, res) => {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios
    .post(url, req.body, {
      headers: {
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com',
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => res.json(response.data))
    .catch(error => console.log(error))
})

app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(fallback('dist/index.html', { root: __dirname }))

const PORT = process.env.PORT || 7729

app.listen(PORT, error => {
  if (error) {
    console.log(error)
    return
  }
  console.log(`Server running on http://127.0.0.1:${PORT}`)
})
