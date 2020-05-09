import React, {useState, useEffect} from 'react'

const fetchData = async (props,link,stateUpdate) => {
    fetch(link)
    .then(response => response.json())
    .then(json => {
        stateUpdate(
            {
                isLoading: false,
                rank: props.rank,
                player: json.data.names.international,
                igt: getTime(props.igt),
                platform: props.platform,
                date: props.date,
                link: props.link,
                loadLink: props.loadLink
            }
        )
    })
}

const getService = (link) => {
    if (link.includes('twitch')) {
        return "Twitch"
    }
    if (link.includes('youtu.be') || link.includes('youtube.com')) {
        return "Youtube"
    }
    return "Watch"
}

const getTime = (time) => {
    const mins = (time - (time % 60))/60
    const secs = time - mins*60
    return mins + "m " + secs + "sec"
}

const Leader = (props) => {
    const [ state,setState ] = useState({
        isLoading: true,
        rank: null,
        player: null,
        igt: null,
        platform: null,
        date: null,
        link: null,
        loadLink: props.loadLink
    })

    useEffect(()=>{
        fetchData(props,props.loadLink,setState)
    },[props])

    if (state.isLoading === false) {
        return (
            <tr key={props.key} className="petrov_sd_tr-leader">
                <th className="petrov_sd_th-leader">{state.rank}</th>
                <th className="petrov_sd_th-leader">{state.player}</th>
                <th className="petrov_sd_th-leader">{state.igt}</th>
                <th className="petrov_sd_th-leader">{state.platform}</th>
                <th className="petrov_sd_th-leader">{state.date}</th>
                <th className="petrov_sd_th-leader">
                    <a href={state.link} target="_blank" rel='noopener noreferrer'>
                        {getService(state.link)}
                    </a>
                </th>
            </tr>
        )
    } else {
        return(
            <tr>
                <th>Fetching...</th>
                <th>Fetching...</th>
                <th>Fetching...</th>
                <th>Fetching...</th>
                <th>Fetching...</th>
                <th>Fetching...</th>
            </tr>
        )
    }
}

export default Leader