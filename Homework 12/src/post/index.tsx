import React from "react";
import useFetch from "./useFetch"; // Импортируем наш кастомный хук

const PostsComponent = () => {
    const { data: posts, loading, error, refetch } = useFetch(
        "https://jsonplaceholder.typicode.com/posts"
    );

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
        <div>
            <h1>Посты</h1>
            <button onClick={refetch} className="btn btn-outline-primary mb-3 mt-2">Перезагрузить данные</button>
            <ul>
                {posts.map((post) => (
                    <div key={post.id}>
                        <li><h3>{post.title}</h3></li>
                        {post.body}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default PostsComponent;