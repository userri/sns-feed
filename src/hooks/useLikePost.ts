import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../api/posts";
import type { Post } from "../types";
export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      // 이전 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      // 현재 캐시 데이터 저장 (롤백용)
      const previousData = queryClient.getQueryData(["posts"]);
      // 낙관적 업데이트
      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: Post) => {
              if (post.id === postId) {
                const isLiked = post.likedBy.includes(1); // currentUser.id = 1
                return {
                  ...post,
                  likes: isLiked ? post.likes - 1 : post.likes + 1,
                  likedBy: isLiked
                    ? post.likedBy.filter((id) => id !== 1)
                    : [...post.likedBy, 1],
                };
              }
              return post;
            }),
          })),
        };
      });
      // 롤백용 데이터 반환
      return { previousData };
    },
    onError: (err, postId, context) => {
      // 에러 시 롤백
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },
    onSettled: () => {
      // 성공/실패 관계없이 리패칭
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
