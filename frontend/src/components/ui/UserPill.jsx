import { useContext } from "react"
import { AuthContext } from "../../contexts/auth/AuthContext"
import Button from "./Button"

export default function UserPill({ name, avatar, textColor, onClick = undefined, showLogout = false }) {
    const auth = useContext(AuthContext)
    return (
        <div className="flex flex-row gap-8 items-center">
        <button className={`flex items-center gap-2 ${textColor || "text-slate-700 dark:text-white"} ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
            <img
                className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                src={avatar}
                alt={name}
            />
            <span className={`text-xs font-bold ${textColor || "text-slate-700 dark:text-white"}`}>
                {name}
            </span>
        </button>
        {showLogout && <Button variant="accent-orange" onClick={() => auth.logout()}>
              Logout
            </Button>}
        </div>
    )
}