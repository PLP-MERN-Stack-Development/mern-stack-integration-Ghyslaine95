import React, { createContext, useContext, useReducer } from 'react'
import { postService, categoryService } from '../services/api'

const BlogContext = createContext()

const initialState = {
  posts: [],
  categories: [],
  loading: false,
  error: null,
  currentPost: null
}

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false }
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'SET_CURRENT_POST':
      return { ...state, currentPost: action.payload, loading: false }
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
        currentPost: action.payload
      }
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: [...(state.currentPost?.comments || []), action.payload]
        }
      }
    default:
      return state
  }
}

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState)

  const loadPosts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await postService.getPosts()
      if (response.success) {
        dispatch({ type: 'SET_POSTS', payload: response.data })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const loadPost = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await postService.getPost(id)
      if (response.success) {
        dispatch({ type: 'SET_CURRENT_POST', payload: response.data })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const createPost = async (postData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await postService.createPost(postData)
      if (response.success) {
        dispatch({ type: 'ADD_POST', payload: response.data })
        return response.data
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const updatePost = async (id, postData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await postService.updatePost(id, postData)
      if (response.success) {
        dispatch({ type: 'UPDATE_POST', payload: response.data })
        return response.data
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const deletePost = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await postService.deletePost(id)
      if (response.success) {
        dispatch({ type: 'DELETE_POST', payload: id })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const addComment = async (postId, commentData) => {
    try {
      const response = await postService.addComment(postId, commentData)
      if (response.success) {
        dispatch({ type: 'ADD_COMMENT', payload: response.data })
        return response.data
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const loadCategories = async () => {
    try {
      const response = await categoryService.getCategories()
      if (response.success) {
        dispatch({ type: 'SET_CATEGORIES', payload: response.data })
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const value = {
    ...state,
    loadPosts,
    loadPost,
    createPost,
    updatePost,
    deletePost,
    addComment,
    loadCategories
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}