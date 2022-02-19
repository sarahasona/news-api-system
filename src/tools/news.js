//npm i request
const request = require('request');
const newsData = (author, callback) => {
    const url = 'https://newsapi.org/v2/everything?q=tesla&from=2022-01-19&sortBy=publishedAt&apiKey=4f6735a4e3ed4137832a5f03b4d8d21f';
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(`Error in url can't reach this page`, undefined)
        }
        else if (response.body.message) {
            callback(`Error :: ${response.body.message}`, undefined)
        }
        else if (response.body.articles) {
            if (response.body.articles.length === 0) {
                return callback('No data found', undefined)
            }
            else {
                if (!author) {
                    callback(undefined, response.body.articles)
                }
                else {
                    const articles = response.body.articles;
                    
                    let authorArticles = articles.filter((art) => {
                        // console.log(art.author)
                        if (art.author) {
                            let artAuthor = art.author
                            let result = artAuthor.includes(author)
                            return result
                        }
                        else {
                            return false
                        }
                    })
                    // authorArticles.forEach((ele)=>{
                    //     console.log(`new array articles is 
                    //     author       :${ele.author} 
                    //     title        :${ele.title} 
                    //     description  :${ele.description}`)
                    // })
                    console.log(`authorArticles   ${authorArticles}`)
                    return callback(undefined, authorArticles)
                }
            }
        }

    })
}
module.exports = newsData;