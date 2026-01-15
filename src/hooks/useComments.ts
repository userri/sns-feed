import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, fetchComments } from "../api/posts";


export function useComments(postId: number) {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId)
    });
}

export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, content }: {postId: number; content: string}) =>
            createComment(postId, content),

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['comments', variables.postId]
            });

            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    })
}

