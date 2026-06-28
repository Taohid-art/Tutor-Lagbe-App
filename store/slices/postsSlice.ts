import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Post } from "@/lib/types"
import { mockPosts, currentUser } from "@/lib/mock-data"

interface PostsState {
  items: Post[]
}

const initialState: PostsState = {
  items: mockPosts,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<{ content: string; image?: string }>) => {
      const newPost: Post = {
        id: `p${Date.now()}`,
        author: currentUser,
        content: action.payload.content,
        image: action.payload.image,
        timestamp: new Date().toISOString(),
        likes: 0,
        liked: false,
        reposts: 0,
        comments: [],
      }
      state.items.unshift(newPost)
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.items.find((p) => p.id === action.payload)
      if (post) {
        post.liked = !post.liked
        post.likes += post.liked ? 1 : -1
      }
    },
    addComment: (state, action: PayloadAction<{ postId: string; content: string }>) => {
      const post = state.items.find((p) => p.id === action.payload.postId)
      if (post) {
        post.comments.push({
          id: `c${Date.now()}`,
          author: currentUser,
          content: action.payload.content,
          timestamp: new Date().toISOString(),
        })
      }
    },
    repost: (state, action: PayloadAction<string>) => {
      const post = state.items.find((p) => p.id === action.payload)
      if (post) post.reposts += 1
    },
  },
})

export const { addPost, toggleLike, addComment, repost } = postsSlice.actions
export default postsSlice.reducer
