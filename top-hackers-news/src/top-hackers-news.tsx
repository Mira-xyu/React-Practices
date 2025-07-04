import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import "./top-hackers-news.css";

type Article = {
  id: number;
  title: string;
  score: number;
  url?: string;
  by: string;
};

const TopNews: React.FC = () => {
  const { data, loading, error } = useFetch<number[]>(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );

  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const ids = data;
    if (!ids) return;

    const fetchArticles = async () => {
      const topTen = ids.slice(0, 10);

      const stories = await Promise.all(
        topTen.map(async (id) => {
          const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          if (!res.ok) throw new Error("An error has occured");
          return (await res.json()) as Article;
        })
      );

      setArticles(stories);
    };

    fetchArticles();
  }, [data]);

  return (
    <ol className="list">
      {articles.map((article) => (
        <li className="article" key={article.id}>
          <div className="title">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>{" "}
          </div>
          <div className="info">
            — {article.score} points by {article.by}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default TopNews;
