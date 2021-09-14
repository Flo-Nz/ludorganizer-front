import axios from 'axios';
import {useState, useEffect} from 'react';

export default (url) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log('Je dois aller chercher sur ', url);

    const fetchResource = () => {
        setLoading(true);
        axios({
            method: 'get', 
            url
        })
            .then((res) => {
                const {data} = res;
                setResources(data);
            })
            .catch((err) => {
                console.log(err);   
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchResource();
    }, []);

    return [
        resources,
        loading
    ];
}