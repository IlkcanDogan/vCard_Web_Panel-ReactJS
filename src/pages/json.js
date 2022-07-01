import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { API_URL } from '../core/constant';
import axios from 'axios';

function Json() {
    let history = useHistory();
    let { profileCode } = useParams();

    const [reqWait, setReqWait] = useState(true);

    useEffect(() => {
        if (profileCode && profileCode.length === 8) {

            axios.get(API_URL + '/card.php?profile_code=' + profileCode).then((resp) => {
                if (resp.data.status === 'success') {
                    document.write(JSON.stringify(resp.data))
                }
                else {
                    history.push('/');
                }
            }).catch((error) => {
                console.log(error.message);
                history.push('/');
            }).finally(() => {
                setReqWait(false)
            })
        }
        else {
            history.push('/');
        }
        
    }, [])

    return (
        <div></div>
    )
}

export default Json;