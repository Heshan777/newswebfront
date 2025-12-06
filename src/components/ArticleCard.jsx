import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ArticleCard = ({ article }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }} 
        />
      )}
      <h2 style={{ fontSize: '1.25rem', margin: '10px 0' }}>
        <Link to={`/articles/${article._id}`} style={{ textDecoration: 'none', color: '#333' }}>
          {article.title}
        </Link>
      </h2>
      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
        <span>{moment(article.publishedAt).fromNow()}</span> • 
        <span> {article.views} views</span>
      </div>
      <p style={{ color: '#444' }}>{article.summary}</p>
      <Link to={`/articles/${article._id}`} style={{ color: 'blue', textDecoration: 'none', fontSize: '0.9rem' }}>
        Read more &rarr;
      </Link>
    </div>
  );
};

export default ArticleCard;