export default 
  name: 'Links'
  data: () ->
    buttons: [
        {
            "name": "github",
            "link": 'https://github.com/sumeshi',
            "msg": 'ゴミ箱'
        },
        {
            "name": "dockerhub",
            "link": 'https://hub.docker.com/r/sumeshi/',
            "msg": '自然言語処理環境インスコ済みjupyterとか'
        },
        {
            "name": "travis ci",
            "link": 'https://travis-ci.org/sumeshi',
            "msg": 'gitbookのautomated buildに'
        }
    ]