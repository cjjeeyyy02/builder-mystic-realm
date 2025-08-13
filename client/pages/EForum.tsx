import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EForum() {
  const navigate = useNavigate();

  const forumPosts = [
    {
      id: 1,
      author: "Sarah Jhonson",
      department: "HR Department",
      timestamp: "1 hour ago",
      content: "New Remote Policy Guidelines - HOT : Introducing our new approach for work-life balance and Transparency. Everyone who is part of decision making processes. Read below...",
      hearts: 15,
      comments: 15,
      shares: 15,
      views: 245,
      avatar: "SJ"
    },
    {
      id: 2,
      author: "Sarah Jhonson",
      department: "HR Department",
      timestamp: "1 hour ago",
      content: "New Remote Policy Guidelines - HOT : Introducing our new approach for work-life balance and Transparency. Everyone who is part of decision making processes. Read below...",
      hearts: 15,
      comments: 15,
      shares: 15,
      views: 245,
      avatar: "SJ"
    },
    {
      id: 3,
      author: "Sarah Jhonson",
      department: "HR Department",
      timestamp: "1 hour ago",
      content: "New Remote Policy Guidelines - HOT : Introducing our new approach for work-life balance and Transparency. Everyone who is part of decision making processes. Read below...",
      hearts: 15,
      comments: 15,
      shares: 15,
      views: 245,
      avatar: "SJ"
    },
    {
      id: 4,
      author: "Sarah Jhonson",
      department: "HR Department",
      timestamp: "1 hour ago",
      content: "New Remote Policy Guidelines - HOT : Introducing our new approach for work-life balance and Transparency. Everyone who is part of decision making processes. Read below...",
      hearts: 15,
      comments: 15,
      shares: 15,
      views: 245,
      avatar: "SJ"
    }
  ];

  const sidebarPosts = [
    {
      id: 5,
      author: "Sarah Jhonson",
      department: "HR Department",
      timestamp: "1 hour ago",
      content: "New Remote Policy Guidelines - HOT : Introducing our new approach for work-life balance and Transparency. Everyone who is part of decision making processes. Read below...",
      hearts: 15,
      comments: 15,
      shares: 15,
      views: 245,
      avatar: "SJ"
    },
    {
      id: 6,
      author: "Sarah Jhonson",
      department: "HR Department",
      timestamp: "1 hour ago",
      content: "New Remote Policy Guidelines - HOT : Introducing our new approach for work-life balance and Transparency. Everyone who is part of decision making processes. Read below...",
      hearts: 15,
      comments: 15,
      shares: 15,
      views: 245,
      avatar: "SJ"
    }
  ];

  const handleNewPost = () => {
    console.log("Opening new post dialog");
  };

  const handleHeart = (postId: number) => {
    console.log(`Hearting post ${postId}`);
  };

  const handleComment = (postId: number) => {
    console.log(`Commenting on post ${postId}`);
  };

  const handleShare = (postId: number) => {
    console.log(`Sharing post ${postId}`);
  };

  const PostCard = ({ post, compact = false }: { post: any; compact?: boolean }) => (
    <Card className="bg-white border border-gray-200 hover:shadow-sm transition-shadow mb-4">
      <CardContent className={compact ? "p-3" : "p-4"}>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-semibold">{post.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-sm font-semibold text-gray-900">{post.author}</h4>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs text-gray-500">{post.department}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{post.timestamp}</span>
            </div>
            <p className={`text-gray-800 mb-4 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
              {post.content}
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleHeart(post.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-xs">{post.hearts} Heart</span>
                </button>
                
                <button
                  onClick={() => handleComment(post.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-xs">{post.comments} Comments</span>
                </button>
                
                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-xs">{post.shares} Share</span>
                </button>
              </div>
              
              <div className="text-xs text-gray-400">
                {post.views} Views
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">E-Forum</h1>
              <p className="text-sm text-gray-600 mt-1">Connect, share and discuss with your colleagues</p>
            </div>
            <Button 
              onClick={handleNewPost}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              + New Post
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Latest E-Forum</h3>
                </div>
                <div className="p-4">
                  {sidebarPosts.map((post) => (
                    <PostCard key={post.id} post={post} compact={true} />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Latest E-Forum</h3>
                </div>
                <div className="p-4">
                  {forumPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center space-x-8">
              {/* Activity Feed */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/dashboard')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Activity Feed</span>
              </div>

              {/* Chat */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/chat')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Chat</span>
              </div>

              {/* Files */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/files')}
              >
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Files</span>
              </div>

              {/* Meetings */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Meetings</span>
              </div>

              {/* Reminders */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/reminders')}
              >
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1015 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Reminders</span>
              </div>

              {/* E - Forum - Active */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-medium">E - Forum</span>
              </div>

              {/* AI2AIM STORE */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">AI2AIM STORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
