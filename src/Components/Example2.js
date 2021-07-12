import axios from 'axios';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './Example2.css';

const Example2 = () => {
    const [users, setUsers] = useState([]);
    const [hasMoreUsers, setHasMoreUsers] = useState(true);

    const loadUsers = (page) => {
        axios.get(`https://reqres.in/api/users?per_page=3&page=${page}`)
        .then(res => {
            const combineUsers = users.concat(res.data.data);
            setUsers(combineUsers);
            if(res.data.total === combineUsers.length){
                setHasMoreUsers(false);
            } else {
                setHasMoreUsers(true);
            }
        })
        .catch(err => console.log("Error------",err));
    }

return(
    <div style={{ height: '200px', overflow: 'auto' }}>
        <h2>React Infinit Scrolling</h2>
    <InfiniteScroll
    threshold={0}
    pageStart={0}
    loadMore={loadUsers}
    hasMore={hasMoreUsers}
    useWindow={false}
    loader={<div className="loader">Loading ...</div>}
    >
        {users && users.length > 0 && users.map(ele => (
                <div className="content-wrapper" key={ele.id}>
                    <div className="image-wrapper">
                <img className="image" src={ele.avatar} alt="photo" />
                    </div>
                <div>
                    <div><strong>Name : </strong>{ele.first_name}</div>
                    <div><strong>Email : </strong>{ele.email}</div>
                </div>
            </div>
        ))}
    </InfiniteScroll>
    {!hasMoreUsers && <div>No more data</div>}
        </div>
)
}

export default Example2;
