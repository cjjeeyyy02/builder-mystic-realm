import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EForum() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const forumPosts = [
    {
      id: 1,
      author: "Sarah Johnson",
      department: "HR Department",
      timestamp: "1 hour ago",
      content: "New Remote Policy Guidelines - HOT : Introducing our new approach for work-life balance and Transparency. Everyone who is part of decision making processes. Read below...",
      hearts: 15,
      comments: 15,
      shares: 15,
      views: 245,
      avatar: "SJ",
      category: "Policy",
      isHot: true
    },
    {
      id: 2,
      author: "Mike Chen",
      department: "Engineering",
      timestamp: "2 hours ago",
      content: "Exciting news about our upcoming tech stack updates and the new development workflow. This will streamline our processes and improve collaboration across teams.",
      hearts: 22,
      comments: 8,
      shares: 12,
      views: 189,
      avatar: "MC",
      category: "Tech",
      isHot: false
    },
    {
      id: 3,
      author: "Emma Davis",
      department: "Design",
      timestamp: "3 hours ago",
      content: "Check out the new design system guidelines we've been working on. These updates will help maintain consistency across all our products and improve user experience.",
      hearts: 31,
      comments: 18,
      shares: 9,
      views: 342,
      avatar: "ED",
      category: "Design",
      isHot: false
    },
    {
      id: 4,
      author: "James Wilson",
      department: "Operations",
      timestamp: "4 hours ago",
      content: "Operations update: New facility management protocols and security measures have been implemented. Please review the updated guidelines in your employee handbook.",
      hearts: 11,
      comments: 6,
      shares: 7,
      views: 156,
      avatar: "JW",
      category: "Operations",
      isHot: false
    }
  ];

  const categories = ["All", "Policy", "Tech", "Design", "Operations", "Announcements"];

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

  const PostCard = ({ post }: { post: any }) => (
    <Card className="backdrop-blur-sm bg-white/90 border border-gray-200/50 hover:shadow-lg hover:border-indigo-200/50 transition-all duration-300 mb-6 group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white text-sm font-bold">{post.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h4 className="text-base font-semibold text-gray-900">{post.author}</h4>
                {post.isHot && (
                  <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-medium rounded-full">
                    🔥 HOT
                  </span>
                )}
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-indigo-600 font-medium">{post.department}</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{post.timestamp}</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm">
              {post.content}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => handleHeart(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group-hover:scale-105 transform duration-200"
                >
                  <div className="p-1.5 rounded-full hover:bg-red-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{post.hearts}</span>
                </button>
                
                <button
                  onClick={() => handleComment(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group-hover:scale-105 transform duration-200"
                >
                  <div className="p-1.5 rounded-full hover:bg-blue-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                
                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors group-hover:scale-105 transform duration-200"
                >
                  <div className="p-1.5 rounded-full hover:bg-green-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>
              
              <div className="text-sm text-gray-400 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <div className="backdrop-blur-sm bg-white/80 border-b border-gray-200/50 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Community Forum
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Connect, collaborate, and share knowledge with your team</p>
              </div>
              <Button 
                onClick={handleNewPost}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Post
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category.toLowerCase())}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === category.toLowerCase()
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/70 text-gray-600 hover:bg-white hover:text-indigo-600 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {forumPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="backdrop-blur-sm bg-white/80 border-t border-gray-200/50 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-center space-x-12">
              {/* Activity Feed */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                onClick={() => navigate('/dashboard')}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-indigo-100 group-hover:to-purple-100 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-indigo-600 font-medium transition-colors duration-300">Activity</span>
              </div>

              {/* Chat */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                onClick={() => navigate('/chat')}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-cyan-100 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-blue-600 font-medium transition-colors duration-300">Chat</span>
              </div>

              {/* Files */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                onClick={() => navigate('/files')}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 group-hover:from-yellow-200 group-hover:to-orange-200 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-yellow-600 group-hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-orange-600 font-medium transition-colors duration-300">Files</span>
              </div>

              {/* Meetings */}
              <div className="flex flex-col items-center space-y-2 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-purple-600 group-hover:text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-pink-600 font-medium transition-colors duration-300">Meetings</span>
              </div>

              {/* Reminders */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                onClick={() => navigate('/reminders')}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 group-hover:from-orange-200 group-hover:to-red-200 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-orange-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1015 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-red-600 font-medium transition-colors duration-300">Reminders</span>
              </div>

              {/* E - Forum - Active */}
              <div className="flex flex-col items-center space-y-2 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <span className="text-sm text-indigo-600 font-medium">Forum</span>
              </div>

              {/* AI2AIM STORE */}
              <div
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                onClick={() => navigate('/ai2aim-store')}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 group-hover:from-red-200 group-hover:to-pink-200 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-red-600 group-hover:text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-pink-600 font-medium transition-colors duration-300">AI2AIM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
