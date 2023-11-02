
const HEADERS = {
    'X-API-Key': process.env.REACT_APP_SPRING_API_KEY,
    'Content-Type': 'application/json'
};

const getVerifiedSuccessResponse = (apiResponse) => {
    if (!apiResponse['Success']) {
        console.log("ERROR: " + apiResponse['ErrorMessage']);
        return [];
    }
    return apiResponse;
}

const fetchPlayers = async (sortItem, order) => {
    sortItem = sortItem === undefined?'points':sortItem;
    order = order === undefined?'DESC':order;

    const url = new URL(`${process.env.REACT_APP_BACKEND_API_URL}/players`);
    url.search = new URLSearchParams({
        'SortBy': sortItem,
        'Order': order
    });
    const apiResponse = await fetch(url, {
        method: 'GET',
        headers: HEADERS
    })
    .then(res => res.json())
    .catch(e => {
        console.log(e);
    });
    return getVerifiedSuccessResponse(apiResponse)['Players'];
}

const deletePlayer = async(playerId) => {
    if (playerId === undefined) {
        console.log("Cannot delete empty player id");
        return;
    }

    const url = `${process.env.REACT_APP_BACKEND_API_URL}/player/${playerId}`;
    
    const apiResponse = await fetch(url, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(res => res.json())
    .catch(e => {
        console.log(e);
    });
    return getVerifiedSuccessResponse(apiResponse)['Players'];
}

const updatePlayerPoint = async(playerId, point) => {
    if (playerId === undefined) {
        console.log("Cannot delete empty player id");
        return;
    }

    const body = point>0?{'IncrementPoint': true}:{'DecrementPoint': true};

    const url = `${process.env.REACT_APP_BACKEND_API_URL}/player/${playerId}`;
    
    const apiResponse = await fetch(url, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .catch(e => {
        console.log(e);
    });
    return getVerifiedSuccessResponse(apiResponse)['Players'];
}

const incrementPlayerPoint = async(playerId) => updatePlayerPoint(playerId, 1);
const decrementPlayerPoint = async(playerId) => updatePlayerPoint(playerId, -1);


export {fetchPlayers, deletePlayer, incrementPlayerPoint, decrementPlayerPoint};
