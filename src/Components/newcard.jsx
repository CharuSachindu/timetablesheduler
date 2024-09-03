import React from "react";

export default function Newcard (title) {
    return (
        <div className="flex rounded outline-4">
            <div>
                {title}
            </div>
        </div>
    )
}