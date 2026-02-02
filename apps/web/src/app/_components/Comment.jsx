"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DOMPurify from "dompurify";
import TextArea from "@/components/TextArea";

// Helper function to format relative time
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
};

// Helper to get initials from name
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const CommentItem = ({ comment, depth = 0, onReplySubmit, currentUserId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    comment.likes?.includes(currentUserId) || false,
  );
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    const previousLiked = isLiked;
    const previousCount = likeCount;

    // Optimistic update
    setIsLiked(!isLiked);
    setLikeCount(likeCount > 1 ? likeCount - 1 : likeCount + 1);

    try {
      const response = await fetch("/api/comments/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: comment.id,
        }),
      });

      const res = await response.json();
      if (!response.ok) {
        // Revert on error
        setIsLiked(previousLiked);
        setLikeCount(previousCount);
        console.error("Failed to toggle like");
      } else {
        // Use the already parsed response
        setLikeCount(res.likes);
        setIsLiked(res.isLiked);
      }
    } catch (error) {
      // Revert on error
      setIsLiked(previousLiked);
      setLikeCount(previousCount);
      console.error("Error toggling like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onReplySubmit(replyContent, comment.id);
      setReplyContent("");
      setShowReplyForm(false);
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${depth > 0 ? "ml-8 mt-4" : "mt-6"}`}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          {comment.user?.image ? (
            <Image
              src={comment.user.image}
              alt={comment.user.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center w-10 h-10 text-sm font-semibold rounded-full bg-primary text-primary-foreground">
              {getInitials(comment.user?.name)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="p-4 rounded-lg border shadow-sm transition-shadow bg-card border-border hover:shadow-md">
            {/* Header */}
            <div className="flex gap-2 items-center mb-2">
              <span className="font-semibold text-foreground">
                {comment.user?.name || "Anonymous"}
              </span>
              {comment.user?.role && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground">
                  {comment.user.role}
                </span>
              )}
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {formatRelativeTime(comment.createdAt)}
              </span>
            </div>

            {/* Comment Text */}
            <p
              className="mb-3 leading-relaxed text-foreground"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(comment.content),
              }}
            />

            {/* Actions */}
            <div className="flex gap-4 items-center text-sm">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  isLiked
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>{likeCount}</span>
              </button>

              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
              >
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
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                <span>Reply</span>
              </button>
            </div>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-3 ml-0">
              <form onSubmit={handleReplySubmit} className="flex gap-3">
                <div className="flex justify-center items-center w-8 h-8 text-xs font-semibold rounded-full bg-muted">
                  {currentUserId ? "U" : "?"}
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="px-3 py-2 w-full rounded-md border resize-none border-input focus:outline-none focus:ring-2 focus:ring-ring"
                    rows="3"
                    placeholder="Write a reply..."
                    disabled={isSubmitting}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      disabled={!replyContent.trim() || isSubmitting}
                      className="px-4 py-2 text-sm font-medium rounded-md transition-opacity bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Posting..." : "Post Reply"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReplyForm(false)}
                      className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-muted text-muted-foreground hover:bg-border"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  onReplySubmit={onReplySubmit}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Comment = () => {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const path = usePathname();

  // Fetch comments when page changes or sort changes
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/comments?pageUrl=${encodeURIComponent(path)}&sortBy=${sortBy}`,
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        } else {
          console.error("No comments yet");
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [path, sortBy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    if (status !== "authenticated") {
      setError("Please sign in to comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageUrl: path,
          content: newComment.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([data.comment, ...comments]);
        setNewComment("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (content, parentId) => {
    if (status !== "authenticated") {
      setError("Please sign in to reply");
      throw new Error("Not authenticated");
    }

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageUrl: path,
        content: content.trim(),
        parentId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error || "Failed to post reply");
      throw new Error("Failed to post reply");
    }

    // Refresh comments to show new reply
    const refreshResponse = await fetch(
      `/api/comments?pageUrl=${encodeURIComponent(path)}&sortBy=${sortBy}`,
    );
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      setComments(data.comments || []);
    }
  };

  return (
    <div className="pt-8 mt-12 border-t border-border">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Comments ({comments.length})
        </h2>
        <div className="flex gap-2 items-center">
          <label className="text-sm text-muted-foreground">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background hover:cursor-pointer hover:border-2 hover:border-primary"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-3">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center w-10 h-10 text-sm font-semibold rounded-full bg-muted">
              {session?.user ? getInitials(session.user.name) : "?"}
            </div>
          )}
          <div className="flex-1">
            <TextArea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="px-4 py-3 w-full rounded-lg border resize-none border-input focus:outline-none focus:ring-2 focus:ring-ring bg-background placeholder:text-muted-foreground"
              rows="4"
              placeholder={
                status === "authenticated"
                  ? "Share your thoughts, ask questions, or provide feedback..."
                  : "Sign in to comment..."
              }
              disabled={status !== "authenticated" || isSubmitting}
              required={true}
              error={error ? "true" : "false"}
              errorMessage={error}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-muted-foreground">
                {status === "authenticated"
                  ? "Be respectful and constructive in your comments"
                  : "Please sign in to comment"}
              </p>
              <button
                type="submit"
                disabled={status !== "authenticated" || isSubmitting}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-1">
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading comments...</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplySubmit={handleReplySubmit}
              currentUserId={session?.user?.id}
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 rounded-full bg-muted">
              <svg
                className="w-8 h-8 text-muted-foreground"
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
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
