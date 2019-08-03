import fetchJsonp from 'fetch-jsonp'
import CONFIG from './config'
function getBookData(keyword, page) {
    let promise = new Promise((resolve, reject) => {
        let  limit = CONFIG.limit, title = encodeURIComponent(keyword);
        fetchJsonp(`http://sas.qq.com/cgi-bin/db/data?t=%5B%22ke_coding_book%22%5D&q=%7Bke_coding_book(_page:${page},_limit:${limit},title:%22%25${title}%25%22)%7Bid,title,rating%7Bmax,numRaters,average,min%7D,subtitle,author,pubdate,tags%7Bcount,name,title%7D,origin_title,image,binding,translator,catalog,pages,images%7Bsmall,large,medium%7D,alt,publisher,isbn10,isbn13,url,alt_title,author_intro,summary,price,ebook_price,ebook_url,series%7Bid,title%7D%7D%7D`)
            .then(
                (response) => {
                    resolve(response.json());        
                }
            ).catch(function (ex) {
                console.error('parsing failed', ex);
                reject(ex)
            })
    })
    return promise;
}

function getMusicData(keyword, page){
    let promise = new Promise((resolve, reject) => {
        let  limit = CONFIG.limit, title = encodeURIComponent(keyword);
        fetchJsonp(`http://sas.qq.com/cgi-bin/db/data?t=%5B%22ke_coding_music%22%5D&q=%7Bke_coding_music(_page:${page},_limit:${limit},title:%22%25${title}%25%22)%7Bid,title,alt,rating%7Bmax,average,numRaters,min%7D,author%7Bname%7D,alt_title,image,tags%7Bcount,name%7D,mobile_link,attrs%7Bpublisher,singer,version,pubdate,title,media,tracks,discs%7D%7D%7D`)
            .then(
                (response) => {
                    resolve(response.json());        
                }
            ).catch(function (ex) {
                console.error('parsing failed', ex);
                reject(ex)
            })
    })
    return promise;
}
function getMovieData(keyword, page){
    let promise = new Promise((resolve, reject) => {
        let  limit = CONFIG.limit, title = encodeURIComponent(keyword);
        fetchJsonp(`http://sas.qq.com/cgi-bin/db/data?t=%5B%22ke_coding_movie%22%5D&q=%7Bke_coding_movie(_page:${page},_limit:${limit},title:%22%25${title}%25%22)%7Bid,title,rating%7Bmax,average,stars,min,details%7Bscore_1,score_2,score_3,score_4,score_5%7D%7D,genres,casts%7Balt,avatars%7Bsmall,large,medium%7D,name,name_en,id%7D,durations,mainland_pubdate,pubdates,has_video,collect_count,original_title,subtype,directors%7Balt,avatars%7Bsmall,large,medium%7D,name,id%7D,year,images%7Bsmall,large,medium%7D,alt%7D%7D`)
            .then(
                (response) => {
                    resolve(response.json());        
                }
            ).catch(function (ex) {
                console.error('parsing failed', ex);
                reject(ex)
            })
    })
    return promise;
}

function getData(category, keyword, page){
    page = page || 1
    switch(category){
        case 'book':
            return getBookData(keyword, page);
        case 'music':
            return getMusicData(keyword, page);
        case 'movie':
            return getMovieData(keyword, page)
    }
}
const service = {
    getData
}

export default service