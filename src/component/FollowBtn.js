import React from "react";

const FollowBtn = ({ handleAction, status }) => {

    return (
        <div className="follow_control">
            {status &&
                <button onClick={handleAction()}>follow</button>
            }
            {!status &&
                <button onClick={handleAction()}>unfollow</button>
            }
        </div>
    )
}

export default FollowBtn;