import type { Post } from "../../types";
import styles from "./PostCard.module.css";
import LikeButton from "../LikeButton/LikeButton";
import CommentSection from "./CommentSection/CommentSection";

interface PostCardProps {
  post: Post;
}
function PostCard({ post }: PostCardProps) {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    if (seconds < 60) return `${seconds}초 전`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
    if (seconds > 86400) return `${Math.floor(seconds / 3600)}시간 전`;
    return `${Math.floor(seconds / 86400)}`;
  };

  const currentUserId = 1; // db.currentUser.id 팀C
  const isLiked = post.likedBy.includes(currentUserId); //팀C

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <img
          src={post.author.avatar}
          alt={post.author.username}
          className={styles.avatar}
        />
        <div className={styles.authorInfo}>
          <span className={styles.username}>{post.author.username}</span>
          <span className={styles.time}>{timeAgo(post.createdAt)}</span>
        </div>
      </div>

      <p className={styles.content}>{post.content}</p>

      {post.image && (
        <img src={post.image} alt="" className={styles.postImage} />
      )}

      <div className={styles.footer}>
        <LikeButton postId={post.id} likes={post.likes} isLiked={isLiked} />
        {/* <button className={styles.actionBtn}>❤️ {post.likes}</button> */}
        {/* <button className={styles.actionBtn}>💬 {post.commentCount}</button> */}
      </div>
      <CommentSection postId={post.id} />
    </article>
  );
}

export default PostCard;
