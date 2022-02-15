
const form = document.getElementById('searchForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    NewsData();
})
const NewsData = async () => {
    try {
        // console.log('sssss')
        let searchInp = document.getElementById('searchInp').value;
        
        const res = await fetch(`http://localhost:3000/news?author=${searchInp}`,{
            methode:'GET',
            headers: { "Content-Type": "application/json", accept: "*/*" }
        });
        const news = await res.json();
        const data = news.data
        console.log(data)
        // const data = await res.articles;
        // console.log(res.articles);
        return data
    }
    catch (e) {
        return console.log(e)
    }

}
