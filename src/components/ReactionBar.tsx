"use client";

import { useState } from "react";
import { REACTION_TYPES, type Reaction, type ReactionType } from "@/lib/types";

// The only interactive piece of the listing page. Toggles are local-only until
// the reaction API exists.
export default function ReactionBar({ reactions }: { reactions: Reaction[] }) {
  const [active, setActive] = useState<Set<ReactionType>>(new Set());

  const toggle = (type: ReactionType) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  return (
    <div className="reactions" role="group" aria-label="Reactions">
      {REACTION_TYPES.map(({ type, glyph, label }) => {
        const count = reactions.find((r) => r.type === type)?.count ?? 0;
        const isActive = active.has(type);
        return (
          <button
            key={type}
            type="button"
            className="reaction"
            onClick={() => toggle(type)}
            aria-pressed={isActive}
          >
            {glyph} {count + (isActive ? 1 : 0)} {label}
          </button>
        );
      })}
    </div>
  );
}
