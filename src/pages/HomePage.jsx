import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ArticleCard from '../components/ArticleCard';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // Backend: router.get('/articles/feed', articleController.getFeed);
        const { data } = await api.get(`/articles/feed?page=${page}&limit=10`);
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [page]);

  if (loading) return <div style={{ padding: '20px' }}>Loading news...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Latest News</h1>
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span style={{ margin: '0 15px' }}>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;