import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const divStyle = {
    color: 'blue',
    height: '250px',
    textAlign: 'center',
    padding: '5px 10px',
    background: '#eee',
    marginTop: '15px',
};

const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
};
const App = () => {
    const [postList, setPostList] = useState({
        list: [1, 2, 3, 4],
    });
    // tracking on which page we currently are
    const [page, setPage] = useState(1);
    // add loader refrence
    const loader = useRef(null);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    useEffect(() => {
        // here we simulate adding new posts to List
        const preNewList = postList.list.map((p) => p * page);
        const newList = postList.list.concat(preNewList);
        setPostList({
            list: newList,
        });
    }, [page]);

    // here we handle what happens when user scrolls to Load More div
    // in this case we just update page variable
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1);
        }
    };

    return (
        <div className='container' style={containerStyle}>
            <div className='post-list'>
                {postList.list.map((post, index) => {
                    return (
                        <div key={index} className='post' style={divStyle}>
                            <h2> {post} </h2>
                        </div>
                    );
                })}

                <div className='loading' ref={loader}>
                    <h2>Load More</h2>
                </div>
            </div>
        </div>
    );
};

export default App;
