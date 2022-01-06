import { DateTime } from "luxon";
import React from "react";

const ShowTime = ({date}) => {

    return (
        <p>{DateTime.fromJSDate(new Date(`${date}`)).toLocaleString(DateTime.DATETIME_FULL)}</p>
    )
}

export default ShowTime;