import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import ArticleCard from '../components/ArticleCard';

const ArticlePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        // 1. Fetch Article
        const artRes = await api.get(`/articles/${id}`);
        setArticle(artRes.data);

        // 2. Fetch Comments
        const comRes = await api.get(`/articles/${id}/comments`);
        setComments(comRes.data);

        // 3. Check Bookmark (if user logged in)
        if (user) {
          const bookRes = await api.get('/bookmarks');
          const found = bookRes.data.find(b => b.articleId._id === id || b.articleId === id);
          setIsBookmarked(!!found);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticleData();
  }, [id, user]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const { data } = await api.post(`/articles/${id}/comments`, { content: newComment });
      setComments([...comments, data]); // Add new comment to list
      setNewComment('');
    } catch (err) {
      alert('Failed to post comment');
    }
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await api.delete(`/bookmarks/${id}`);
        setIsBookmarked(false);
      } else {
        await api.post('/bookmarks', { articleId: id });
        setIsBookmarked(true);
      }
    } catch (err) {
      alert('Error updating bookmark');
    }
  };

  if (!article) return <div>Loading article...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <h1 style={{ fontSize: '2rem' }}>{article.title}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', margin: '10px 0' }}>
        <span>{moment(article.publishedAt).format('MMMM Do YYYY')}</span>
        {user && (
          <button onClick={toggleBookmark} style={{ cursor: 'pointer' }}>
            {isBookmarked ? '★ Saved' : '☆ Save'}
          </button>
        )}
      </div>

      {/* Image */}
      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} style={{ width: '100%', margin: '20px 0', borderRadius: '8px' }} />
      )}

      {/* Content */}
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} style={{ lineHeight: '1.6', fontSize: '1.1rem' }} />

      <hr style={{ margin: '40px 0' }} />

      {/* Comments Section */}
      <h3>Comments ({comments.length})</h3>
      {user ? (
        <form onSubmit={handleCommentSubmit} style={{ marginBottom: '30px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            style={{ width: '100%', padding: '10px', minHeight: '80px' }}
          />
          <button type="submit" style={{ marginTop: '10px', padding: '8px 16px' }}>Post Comment</button>
        </form>
      ) : (
        <p>Please login to comment.</p>
      )}

      <div>
        {comments.map((c) => (
          <div key={c._id} style={{ background: '#f9f9f9', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <strong>{c.userId?.username || 'User'}</strong>
            <p style={{ margin: '5px 0' }}>{c.content}</p>
            <small style={{ color: '#888' }}>{moment(c.createdAt).fromNow()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;