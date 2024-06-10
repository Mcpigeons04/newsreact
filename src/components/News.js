// import React, { useEffect, useState } from 'react'
// import NewsItem from './NewsItem'
// import Spin from './Spin';
// import PropTypes from 'prop-types'

// const News=(props)=>{


// const [articles,setArticles]=useState([])
// const [loading,setLoading]=useState(true)
// const [page,setPage]=useState(1)
// const [totalResults,setTotalResults]=useState(0)
// // document.title=`${this.capitalize(props.category)} - VishwaSamachar`;


//    const capitalize=(string)=>{
//     return string.charAt(0).toUpperCase()+ string.slice(1);
//   }

      

    
//    const Updatenews=async()=>{
//       props.setProgress(10);
//       let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
//       setLoading(true)
//       let data= await fetch(url);
//       let parsedData=await data.json()
//       setArticles(parsedData.articles)
//       setTotalResults(parsedData.totalResults)
//       setLoading(false)
    
//         props.setProgress(100);
//   }

//   useEffect(()=>{
//     Updatenews();

//   },[])




//     const handlePrevClick= async()=>{
//         let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page -1}&pageSize=${props.pageSize}`;
//         this.setState({loading:true});
//         let data= await fetch(url);
//         let parsedData=await data.json()
//         this.setState({
//             page:this.state.page-1,
//             articles: parsedData.articles,
//             loading:false
//         })

//     }
//      const handleNextClick=async()=>{
//       if (this.state.page + 1 > Math.ceil(this.state.totalArticles / props.pageSize)) {
//         return;
//       }
//         else{
//         let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page +1}&pageSize=${props.pageSize}`;
//         this.setState({loading:true});
//         let data= await fetch(url);
//         let parsedData=await data.json()
//         this.setState({
//             page:this.state.page+1,
//             articles: parsedData.articles,
//             loading:false
//         })
//     }


//     }

//     return (
//       <div className="container my-3 ">
//        <h1 className="text-center my-3 mx-3">
//   <b><i><span style={{ color: 'red' }}>VishwaSamachar-Top headlines on {this.capitalize(props.category)}</span> </i></b></h1>

//         {this.state.loading &&<Spin/>}
//         <div className="row">
//         {!this.state.loading && this.state.articles.map((element)=>{
//             return <div className="col-md-4" key={element.url}>
//             <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
//             </div>

//         })}
        
        
//         </div>
//         <div className="container d-flex justify-content-between">
//         <button disabled={this.state.page<=1} type="button" className="btn btn-dark"  onClick={this.handlePrevClick}>&larr; Previous</button>
//         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

//         </div>
      
//       </div>
//     )
  
// }
// News.defaultProps = {
//   country: 'in',
//   pageSize: 6,
//   category:'general',
  
// }

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category:PropTypes.string,
// }
// export default News

import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spin from './Spin';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - VishwaSamachar`;
    updateNews();
    // eslint-disable-next-line
  }, [page]);

  const handlePrevClick = async () => {
    setPage(page - 1);
  };

  const handleNextClick = async () => {
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center " style={{margin: '35px 0px',marginTop:'90px'}}>
        <b>
          <i>
            <span style={{ color: 'red' }}>
              VishwaSamachar-Top headlines on {capitalize(props.category)}
            </span>
          </i>
        </b>
      </h1>

      {loading && <Spin />}
      <div className="row">
        {!loading &&
          articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={
                    element.description ? element.description.slice(0, 88) : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
