import React from "react";

export default function AvatarStack({ users }) {
  return (
    <div className="flex -space-x-3">
      {users.map((u) => (
        <img
          key={u.alt}
          className="w-10 h-10 rounded-full border-2 border-navy-deep object-cover"
          alt={u.alt}
          src={u.src}
        />
      ))}
    </div>
  );
}