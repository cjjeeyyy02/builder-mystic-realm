import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";
import { useDarkMode } from "@/components/DarkModeProvider";

export default function EForum() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("all");
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const nextPostIdRef = useRef(1000); // Use ref to avoid race conditions, start from 1000
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const initialPosts = [
    {
      id: 1,
      author: "Sarah Johnson",
      department: "HR Department",
      timestamp: "1 hour ago",
      content:
        "Welcome to our new E-Forum! We're excited to introduce this enhanced platform for better team communication and collaboration. Share your thoughts, ideas, and feedback here.",
      hearts: 15,
      comments: 15,
      shares: 15,
      views: 245,
      avatar: "SJ",
      category: "General",
      isHot: true,
    },
    {
      id: 2,
      author: "Mike Chen",
      department: "Engineering",
      timestamp: "2 hours ago",
      content:
        "Just finished implementing the new user authentication system. The security improvements and user experience enhancements are significant. Looking forward to your feedback!",
      hearts: 22,
      comments: 8,
      shares: 12,
      views: 189,
      avatar: "MC",
      category: "General",
      isHot: false,
    },
    {
      id: 3,
      author: "Emma Davis",
      department: "Design",
      timestamp: "3 hours ago",
      content:
        "Our latest design sprint was incredibly productive! We've made great progress on the user interface improvements and accessibility features. Can't wait to show you all what we've created.",
      hearts: 31,
      comments: 18,
      shares: 9,
      views: 342,
      avatar: "ED",
      category: "General",
      isHot: false,
    },
    {
      id: 4,
      author: "James Wilson",
      department: "Operations",
      timestamp: "4 hours ago",
      content:
        "Monthly team sync went great today! We discussed upcoming projects, resource allocation, and timeline adjustments. Everyone is aligned and motivated for the coming weeks.",
      hearts: 11,
      comments: 6,
      shares: 7,
      views: 156,
      avatar: "JW",
      category: "General",
      isHot: false,
    },
    {
      id: 5,
      author: "Lisa Anderson",
      department: "Marketing",
      timestamp: "5 hours ago",
      content:
        "Our latest campaign performance exceeded expectations! The engagement rates are up 40% and we're seeing great conversion numbers. Team effort really paid off.",
      hearts: 28,
      comments: 12,
      shares: 18,
      views: 298,
      avatar: "LA",
      category: "General",
      isHot: false,
    },
    {
      id: 6,
      author: "David Rodriguez",
      department: "Sales",
      timestamp: "6 hours ago",
      content:
        "Closed three major deals this week! The new sales process is working well and client feedback has been overwhelmingly positive. Great momentum going into next quarter.",
      hearts: 35,
      comments: 22,
      shares: 14,
      views: 445,
      avatar: "DR",
      category: "General",
      isHot: true,
    },
    {
      id: 7,
      author: "Jennifer Kim",
      department: "Finance",
      timestamp: "7 hours ago",
      content:
        "Q3 financial report is looking strong! We're ahead of budget in several key areas and the cost optimization initiatives are showing great results.",
      hearts: 19,
      comments: 9,
      shares: 11,
      views: 203,
      avatar: "JK",
      category: "General",
      isHot: false,
    },
    {
      id: 8,
      author: "Alex Thompson",
      department: "Product",
      timestamp: "8 hours ago",
      content:
        "User research insights from last week are fascinating! We've identified several opportunities for improvement and new feature development. Exciting times ahead!",
      hearts: 24,
      comments: 16,
      shares: 8,
      views: 312,
      avatar: "AT",
      category: "General",
      isHot: false,
    },
  ];

  const generateMorePosts = () => {
    const authors = [
      { name: "Rachel Green", dept: "Customer Success", avatar: "RG" },
      { name: "Tom Baker", dept: "Quality Assurance", avatar: "TB" },
      { name: "Nina Patel", dept: "Data Analytics", avatar: "NP" },
      { name: "Carlos Mendez", dept: "Security", avatar: "CM" },
      { name: "Sophie Turner", dept: "Legal", avatar: "ST" },
      { name: "Robert Chen", dept: "DevOps", avatar: "RC" },
    ];

    const contents = [
      "Great progress on our latest initiative! The team collaboration has been outstanding and we're seeing excellent results across all metrics.",
      "Just completed a comprehensive analysis of our current processes. Found several optimization opportunities that could improve efficiency by 25%.",
      "Excited to share updates from our recent client meetings. The feedback has been incredibly positive and we have some exciting partnerships ahead.",
      "Our latest sprint retrospective highlighted some key learnings. We're implementing changes that will improve our workflow and delivery speed.",
      "Team building event was a huge success! It's amazing what we can accomplish when we work together toward common goals.",
      "Monthly review shows we're consistently exceeding our targets. The hard work and dedication from everyone is really paying off.",
      "New tools integration is complete and the results are impressive. Productivity has increased and the team is adapting quickly to the improvements.",
      "Customer satisfaction scores are at an all-time high! The recent updates and improvements are making a real difference for our users.",
    ];

    const newPosts = [];
    const startId = nextPostIdRef.current;

    for (let i = 0; i < 6; i++) {
      const author = authors[i % authors.length];
      const content = contents[i % contents.length];
      const currentId = startId + i;

      newPosts.push({
        id: currentId,
        author: author.name,
        department: author.dept,
        timestamp: `${Math.floor(currentId / 100)} hours ago`,
        content: content,
        hearts: Math.floor(Math.random() * 40) + 5,
        comments: Math.floor(Math.random() * 20) + 2,
        shares: Math.floor(Math.random() * 15) + 1,
        views: Math.floor(Math.random() * 400) + 100,
        avatar: author.avatar,
        category: "General",
        isHot: Math.random() > 0.8,
      });
    }

    nextPostIdRef.current += 6; // Update ref directly
    return newPosts;
  };

  const categories = ["All"];

  useEffect(() => {
    setPosts(initialPosts);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const currentScrollY = scrollContainerRef.current.scrollTop;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      if (currentScrollY > 50) {
        setFooterCollapsed(isScrollingDown);
        setHeaderCollapsed(isScrollingUp);
      } else {
        setFooterCollapsed(false);
        setHeaderCollapsed(false);
      }

      // Load more posts when near bottom
      const container = scrollContainerRef.current;
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 200 &&
        !loading
      ) {
        loadMorePosts();
      }

      setLastScrollY(currentScrollY);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY, loading]);

  const loadMorePosts = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const newPosts = generateMorePosts();
      setPosts((prev) => {
        // Additional safety check to prevent duplicates
        const existingIds = new Set(prev.map((post) => post.id));
        const filteredNewPosts = newPosts.filter(
          (post) => !existingIds.has(post.id),
        );
        return [...prev, ...filteredNewPosts];
      });
      setLoading(false);
    }, 800);
  };

  const handleNewPost = () => {
    console.log("Opening new post dialog");
  };

  const handleHeart = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, hearts: post.hearts + 1 } : post,
      ),
    );
  };

  const handleComment = (postId: number) => {
    console.log(`Commenting on post ${postId}`);
  };

  const handleShare = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post,
      ),
    );
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-teal-500 to-teal-600",
    ];
    return colors[name.length % colors.length];
  };

  const PostCard = ({ post }: { post: any }) => (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 mb-4">
      <CardContent className="p-5">
        <div className="flex items-start space-x-4">
          <div
            className={`w-12 h-12 ${getAvatarColor(post.author)} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}
          >
            <span className="text-white text-sm font-semibold">
              {post.avatar}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h4 className="text-base font-semibold text-gray-900">
                  {post.author}
                </h4>
                {post.isHot && (
                  <span className="px-2 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-xs font-medium rounded-full border border-red-200/50">
                    🔥 HOT
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-blue-600 font-medium">
                {post.department}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{post.timestamp}</span>
            </div>
            <p className="text-gray-700 mb-5 leading-relaxed text-sm">
              {post.content}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleHeart(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-all duration-200 hover:bg-red-50 px-2 py-1 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{post.hearts}</span>
                </button>

                <button
                  onClick={() => handleComment(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-all duration-200 hover:bg-blue-50 px-2 py-1 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>

                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-all duration-200 hover:bg-green-50 px-2 py-1 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>

              <div className="text-sm text-gray-400 flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-full">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>{post.views} views</span>
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
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-50/30 to-emerald-100/20">
          {/* Header */}
          <div
            className={`bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-3 shadow-sm transition-all duration-300 ${
              headerCollapsed
                ? "transform -translate-y-full opacity-0"
                : "transform translate-y-0 opacity-100"
            }`}
          >
            <div className="max-w-6xl mx-auto">
              {/* Back to Dashboard - Top Section */}
              <div className="mb-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="ghost"
                  size="sm"
                  className={`text-xs hover:bg-white/80 transition-colors duration-200 ${
                    isDarkMode
                      ? 'text-emerald-300 hover:text-emerald-900 hover:bg-white/90'
                      : 'text-emerald-700 hover:text-emerald-900 hover:bg-white/80'
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Dashboard
                </Button>
              </div>

              {/* Main Header Section */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    E-Forum
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    Connect, collaborate, and share knowledge with your team
                  </p>
                </div>
                <Button
                  onClick={handleNewPost}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-1.5 text-sm rounded-lg shadow-sm"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Post
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            ref={scrollContainerRef}
            className={`pb-footer overflow-y-auto transition-all duration-300`}
            style={{
              height: headerCollapsed
                ? "calc(100vh - 50px)"
                : "calc(100vh - 120px)",
            }}
          >
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}

                {loading && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">
                      Loading more posts...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* Footer Navigation */}
      <FooterNavigation collapsed={footerCollapsed} />
    </>
  );
}
