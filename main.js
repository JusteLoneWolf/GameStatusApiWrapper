const {request} = require('./utils')

/**
 * Get the list of hot games
 * @exemple getHotGames().then((data) => console.log(data))
 * @returns {Promise<Gamelist>}
 */
async function getHotGames() {
  return new Promise((resolve, reject) => {
    request("https://gamestatus.info/back/api/gameinfo/game/").then(data => {
      if(data){
        let hotGames =[]
        for ( const game of data.hot_games ) {
          let reformData ={
            id:game.id,
            slug: game.slug,
            url:"https://gamestatus.info/"+game.slug+"?lg=en",
            title:game.title,
            isAAA: game.is_AAA,
            protections: game.protections,
            protections: JSON.parse(game.protections),
            hackedGroups:JSON.parse(game.hacked_groups),
            crackDate: game.crack_date,
            images:{
              short:game.short_image,
              full:game.full_image,
            },
            teaser:game.teaser_link,
            score:{
              metacritic:game.mata_score,
              user:game.user_score,
            },
            readableStatus: game.readable_status,
            isOfflineAct:game.is_offline_act
          }
          hotGames.push(reformData)
        }
        resolve(hotGames)
      }
    })
  })

}
/**
 * Get the list of unreleased games
 * @exemple getUnreleasedGames().then((data) => console.log(data))
 * @returns {Promise<Gamelist>}
 */
async function getUnreleasedGames() {
  return new Promise((resolve, reject) => {
    request("https://gamestatus.info/back/api/gameinfo/game/").then(data => {
      if(data){
        let hotGames =[]
        for ( const game of data.unreleased_game ) {
          let reformData ={
            id:game.id,
            slug: game.slug,
            url:"https://gamestatus.info/"+game.slug+"?lg=en",
            title:game.title,
            isAAA: game.is_AAA,
            protections: game.protections,
            protections: JSON.parse(game.protections),
            hackedGroups:JSON.parse(game.hacked_groups),
            crackDate: game.crack_date,
            images:{
              short:game.short_image,
              full:game.full_image,
            },
            teaser:game.teaser_link,
            score:{
              metacritic:game.mata_score,
              user:game.user_score,
            },
            readableStatus: game.readable_status,
            isOfflineAct:game.is_offline_act
          }
          hotGames.push(reformData)
        }
        resolve(hotGames)
      }
    })
  })

}
/**
 * Get a game
 * @exemple getGame("far cry 6").then((data) => console.log(data))
 * @returns {Promise<Game>}
 */
async function getGame(name) {
  name = name.split(' ').join('-')
  console.log(name)
  return new Promise((resolve, reject) => {
    request("https://gamestatus.info/back/api/gameinfo/game/"+name+"/").then(game => {
      console.log(game.protections);
      if(game){
        resolve({
          id:game.id,
          url:"https://gamestatus.info/"+game.slug+"?lg=en",
          slug: game.slug,
          title:game.title,
          description:game.description_en,
          isAAA: game.is_AAA,
          protections: JSON.parse(game.protections),
          hackedGroups:JSON.parse(game.hacked_groups),
          releaseDate: game.release_date,
          crackDate: game.crack_date,
          images:{
            short:game.short_image,
            full:game.full_image,
          },
          teaser:game.teaser_link,
          score:{
            metacritic:game.mata_score,
            user:game.user_score,
          },
          readableStatus: game.readable_status,
          specs:{
            cpu: game.specs_info.cpu_info,
            ram: game.specs_info.ram_info,
            os: game.specs_info.os_info,
            gpu: game.specs_info.gpu_info
          }
        })
      }
    })
  })
}
/**
 * Get the list of last cracked games
 * @exemple getLastGameCrack().then((data) => console.log(data))
 * @returns {Promise<Gamelist>}
 */
async function getLastGameCrack() {
  return new Promise((resolve, reject) => {
    request("https://gamestatus.info/back/api/gameinfo/game/lastcrackedgames/").then(data => {

      if(data){
        let ListGameCrack =[]
        for ( const game of data.list_crack_games ) {
          let reformData ={
            id:game.id,
            url:"https://gamestatus.info/"+game.slug+"?lg=en",
            slug: game.slug,
            title:game.title,
            isAAA: game.is_AAA,
            protections: game.protections,
            protections: JSON.parse(game.protections),
            hackedGroups:JSON.parse(game.hacked_groups),
            crackDate: game.crack_date,
            images:{
              short:game.short_image,
              full:game.full_image,
            },
            teaser:game.teaser_link,
            score:{
              metacritic:game.mata_score,
              user:game.user_score,
            },
            readableStatus: game.readable_status,
            isOfflineAct:game.is_offline_act
          }
          ListGameCrack.push(reformData)
        }
        resolve(ListGameCrack)
      }
    })
  })
}
/**
 * Get the list of released games
 *@exemple getReleasedGames().then((data) => console.log(data))
 * @returns {Promise<Gamelist>}
 */
async function getReleasedGames() {
  return new Promise((resolve, reject) => {
    request("https://gamestatus.info/back/api/gameinfo/game/releasedgame/").then(data => {

      if(data){
        let ListGameRelease ={ }
        for(const season of Object.keys(data)){
          Object.assign(ListGameRelease,{[season]:[]})
          if(data[season]){
            for ( const game of data[season] ) {
              let reformData ={
                id:game.id,
                url:"https://gamestatus.info/"+game.slug+"?lg=en",
                slug: game.slug,
                title:game.title,
                isAAA: game.is_AAA,
                images:{
                  short:game.short_image,
                  full:game.full_image,
                },
                readableStatus: game.readable_status,
              }
              ListGameRelease[season].push(reformData)
            }
          }


        }

        resolve(ListGameRelease)
      }
    })
  })
}
/**
 * Get upcoming game releases
 * @exemple getCalendar().then((data) => console.log(data))
 * @returns {Promise<Gamelist>}
 */
async function getCalendar() {
  return new Promise((resolve, reject) => {
    request("https://gamestatus.info/back/api/gameinfo/game/gamecalendar/").then(data => {

      if(data){
        let calendar = {}

        let months = Object.keys(data.response_game_calendar)
        months.splice(Object.keys(data.response_game_calendar).indexOf('translated_month'),1)
        console.log(months);
        for(const month of months){
          Object.assign(calendar,{[month]:[]})
          for(const game of data.response_game_calendar[month]){
            let reformData ={
              id:game.id,
              slug: game.slug,
              url:"https://gamestatus.info/"+game.slug+"?lg=en",
              title:game.title,
              isAAA: game.is_AAA,
              protections: game.protections,
              protections: JSON.parse(game.protections),
              hackedGroups:JSON.parse(game.hacked_groups),
              images:{
                short:game.short_image,
                full:game.full_image,
              },
              teaser:game.teaser_link,
              readableStatus: game.readable_status,
              isOfflineAct:game.is_offline_act
            }
            console.log(reformData);
            calendar[month].push(reformData)
          }
        }
        resolve(calendar)

      }
    })

  })
}

module.exports = {
  getCalendar,
  getUnreleasedGames,
  getHotGames,
  getGame,
  getLastGameCrack,
  getReleasedGames
}


const gs = require('gamestatusapiwrapper')
gs.getCalendar().then(data =>{
  console.log(data);
})
