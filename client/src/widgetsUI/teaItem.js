import React from 'react';
import { Link } from 'react-router-dom';

const TeaItem = (item => {
  return (
    <Link to={`/tea/${item._id}`} className='tea_item'>
      <div className="tea_header">
        <h3>{item.title}</h3>
        <p>Type: {item.type} </p>
        <p> Taste: {item.taste} </p>
        <p> Created by: {item.creator} </p>
      </div>
    </Link>
  );
});

export default TeaItem;
