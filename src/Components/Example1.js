import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import './Example1.css'

const Example1 = () => {
    const [photos, setPhotos] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
  
    const loadFunc = (page) => {
  
      (page === 3) ?  setHasMoreItems(false) : setHasMoreItems(true);
  
      console.log("Loading more content... Page--No---",page);
  
      axios.get(`http://jsonplaceholder.typicode.com/photos?_start=${photos.length}&_limit=3`)
      .then(res => {
        const updatedList = photos.concat(res.data);
         setPhotos(updatedList);
        })
      .catch(err => console.log("Error fetching data",err));
    }
  
    return (
      <div className="app">
        <h2>React Inifinite Scroll</h2>
        {console.log("Photos",photos)}
        <div className="scrollerWrapper">
          <InfiniteScroll
            threshold={0}
            pageStart={0}
            loadMore={loadFunc}
            hasMore={hasMoreItems}
            loader={<div className="loader">Loading ...</div>}
            useWindow={false}
          >
            {
              photos && photos.length > 0 && photos.map(ele => (
                <div key={ele.id}>
                  <p>{ele.title}</p>
                  <img src={ele.url} alt="photos" />
                </div>
              ))
            }
          </InfiniteScroll>
          {!hasMoreItems && <div>No more data</div>}
        </div>
      </div>
    );
}

export default Example1;
