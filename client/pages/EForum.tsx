import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";

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
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 mb-4">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-semibold">{post.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h4 className="text-base font-semibold text-gray-900">{post.author}</h4>
                {post.isHot && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    🔥 HOT
                  </span>
                )}
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-blue-600 font-medium">{post.department}</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{post.timestamp}</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm">
              {post.content}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleHeart(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">{post.hearts}</span>
                </button>
                
                <button
                  onClick={() => handleComment(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">{post.comments}</span>
                </button>
                
                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-sm">{post.shares}</span>
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
    <>
      <Layout>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Community Forum
                  </h1>
                  <p className="text-gray-600 mt-2">Connect, collaborate, and share knowledge with your team</p>
                </div>
                <Button 
                  onClick={handleNewPost}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === category.toLowerCase()
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 pb-16">
            <div className="max-w-4xl mx-auto">
              {forumPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </Layout>

      {/* Footer Navigation */}
      <FooterNavigation />
    </>
  );
}
