"use client";

import { useState } from 'react'
import { Heart, MessageCircle, Share2, ThumbsUp, Send } from 'lucide-react'
import Image from 'next/image'

type Comment = {
  id: number
  author: string
  content: string
}

type Post = {
  id: number
  author: {
    name: string
    avatar: string
    title: string
  }
  content: string
  image?: string
  likes: number
  comments: Comment[]
  shares: number
  timestamp: string
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Jane Doe',
        avatar: '/placeholder-avatar.jpg',
        title: 'Senior Software Engineer'
      },
      content: 'Just finished a great project using React and Node.js. Excited to share my learnings! #webdevelopment #reactjs #nodejs',
      image: '/placeholder-project.jpg',
      likes: 15,
      comments: [
        { id: 1, author: 'John Smith', content: 'Great work! Can you share more details?' },
        { id: 2, author: 'Alice Johnson', content: 'Impressive! How long did it take you to complete?' }
      ],
      shares: 2,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: {
        name: 'John Smith',
        avatar: '/placeholder-avatar-2.jpg',
        title: 'Data Scientist'
      },
      content: 'Looking for recommendations on the best resources to learn machine learning. Any suggestions? #machinelearning #ai #datascience',
      likes: 8,
      comments: [
        { id: 3, author: 'Emily Brown', content: 'I highly recommend the course on Coursera by Andrew Ng.' },
        { id: 4, author: 'Michael Wilson', content: 'Check out Fast.ai, they have great practical courses.' }
      ],
      shares: 1,
      timestamp: '5 hours ago'
    },
  ])

  const [newPost, setNewPost] = useState('')
  const [newComment, setNewComment] = useState('')
  const [commentingOn, setCommentingOn] = useState<number | null>(null)

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: {
          name: 'Current User',
          avatar: '/placeholder-avatar-3.jpg',
          title: 'Software Developer'
        },
        content: newPost,
        likes: 0,
        comments: [],
        shares: 0,
        timestamp: 'Just now'
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const handleCommentSubmit = (postId: number) => {
    if (newComment.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              { id: post.comments.length + 1, author: 'Current User', content: newComment }
            ]
          }
        }
        return post
      }))
      setNewComment('')
      setCommentingOn(null)
    }
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <form onSubmit={handlePostSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded-lg mb-6">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <Image className="h-12 w-12 rounded-full mr-4" src={post.author.avatar} alt={post.author.name} width={48} height={48} />
              <div>
                <h2 className="font-semibold text-lg">{post.author.name}</h2>
                <p className="text-gray-500 text-sm">{post.author.title}</p>
                <p className="text-gray-400 text-xs">{post.timestamp}</p>
              </div>
            </div>
            <p className="text-gray-800 leading-snug mb-4">{post.content}</p>
            {post.image && (
              <Image src={post.image} alt="Post content" className="rounded-lg w-full object-cover mb-4" width={400} height={400} />
            )}
            <div className="flex items-center justify-between text-gray-500 text-sm">
              <button onClick={() => handleLike(post.id)} className="flex items-center hover:text-blue-600">
                <ThumbsUp className="h-5 w-5 mr-1" />
                {post.likes} Likes
              </button>
              <button onClick={() => setCommentingOn(post.id)} className="flex items-center hover:text-blue-600">
                <MessageCircle className="h-5 w-5 mr-1" />
                {post.comments.length} Comments
              </button>
              <button className="flex items-center hover:text-blue-600">
                <Share2 className="h-5 w-5 mr-1" />
                {post.shares} Shares
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-b-lg">
            {post.comments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
            {commentingOn === post.id && (
              <div className="mt-2 flex">
                <input
                  type="text"
                  className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500  focus:ring-offset-2"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}