import { LfgPost } from "@/hooks/useLfg";

export default function LfgCard({ post }: { post: LfgPost }) {
  return (
    <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">
          {post.riot_id}
        </h3>
        <span className="text-xs text-neutral-400">
          {new Date(post.created_at).toLocaleTimeString()}
        </span>
      </div>

      <p className="text-sm text-neutral-300 mt-2">
        {post.message || "Looking for teammates"}
      </p>

      <div className="flex gap-2 mt-3">
        <span className="text-xs px-2 py-1 rounded bg-neutral-800">
          {post.rank}
        </span>
        <span className="text-xs px-2 py-1 rounded bg-neutral-800">
          {post.role}
        </span>
      </div>
    </div>
  );
}
