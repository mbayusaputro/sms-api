'use strict'

const Site1 = use('App/Models/Site1')
const Env = use('Env')

class Site1Controller {

  async getData({request}){    
    const pages = request.input('page')
    const limits = request.input('limit')
    var page = 1

    var limit = 4

    if (pages != null) {
        page = pages
    }
    if (limits != null) {
        limit = limits
    }
    const site1 = await Site1.query().paginate(page,limit)
    var next = parseInt(page) + 1
    var prev = page - 1
    if (prev < 1) {
        prev = 1
    }

    if (next > site1.pages.lastPage) {
        next = site1.pages.lastPage
    }
   
    
    var waktu = [];
    var suhu = [];
    var hujan = [];
    var pasut = [];
    await site1.rows.map(item => {
        const date = new Date(item.waktu)
        waktu.push(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear())
        suhu.push(parseFloat(item.suhu))
        hujan.push(parseFloat(item.hujan))
        pasut.push(parseFloat(item.pasut))
    })
    var suhu2 = [];
    var hujan2 = [];
    var pasut2 = [];
    await site1.rows.map(item => {
        
        const date = new Date(item.waktu)
        const tgl = date
       
        suhu2.push({x:tgl, y:parseFloat(item.suhu)})
        hujan2.push({x:tgl, y:parseFloat(item.hujan)})
        pasut2.push({x : tgl,y : parseFloat(item.pasut)})
    })

    const data2 = {
        nextUrl: Env.get('APP_URL')+'/data?page=' + next,
        prevUrl: Env.get('APP_URL')+'/data?page=' + prev,
        page: site1.pages.page,
        total: site1.pages.total,
        perPage: site1.pages.perPage,
        lastPage: site1.pages.lastPage,
         suhu2, hujan2, pasut2
    }
    const data = {
      nextUrl: Env.get('APP_URL')+'/data?page=' + next,
      prevUrl: Env.get('APP_URL')+'/data?page=' + prev,
      page: site1.pages.page,
      total: site1.pages.total,
      perPage: site1.pages.perPage,
      lastPage: site1.pages.lastPage,
      waktu, suhu, hujan, pasut
    }
    // return view.render('chart',{data})
    return data
  }

  async table({response, request, view}){
    const pages = request.input('page')
    const limits = request.input('limit')
    var page = 1

    var limit = 5

    if (pages != null) {
        page = pages
    }
    if (limits != null) {
        limit = limits
    }
    const site1 = await Site1.query().paginate(page,limit)
    var next = parseInt(page) + 1
    var prev = page - 1
    if (prev < 1) {
        prev = 1
    }

    if (next > site1.pages.lastPage) {
        next = site1.pages.lastPage
    }

    
    const data = {
      nextUrl: Env.get('APP_URL')+'/table?page=' + next,
      prevUrl: Env.get('APP_URL')+'/table?page=' + prev,
      page: site1.pages.page,
      total: site1.pages.total,
      perPage: site1.pages.perPage,
      lastPage: site1.pages.lastPage,
      rows: site1.rows

    }
    
    return view.render('table',{site1 : data})
  }

  async index ({request}) {
    const site1 = await Site1.all()
    const gethujan = await Site1.query().getAvg('hujan')
    const hujan =  parseFloat(gethujan).toFixed(1)
    const getsuhu = await Site1.query().getAvg('suhu')
    const suhu = parseFloat(getsuhu).toFixed(1)
    const getpasut = await Site1.query().getAvg('pasut')
    const pasut = parseFloat(getpasut).toFixed(1)

    return {site1, hujan, suhu, pasut}
  }
}

module.exports = Site1Controller
