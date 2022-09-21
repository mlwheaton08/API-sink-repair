const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:8080"

export const fetchRequests = async () => {
  const dataFetch = await fetch(`${API}/requests`);
  const jsonData = await dataFetch.json();
  // Store the external state in application state
  applicationState.requests = jsonData;
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}));
}

export const sendRequest = async (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
  
    const mainContainer = document.querySelector("#container");
    const response = await fetch(`${API}/requests`, fetchOptions);
    const responseJson = await response.json();
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    return responseJson;
}

export const deleteRequest = async (id) => {
    const mainContainer = document.querySelector("#container");
    await fetch(`${API}/requests/${id}`, { method: "DELETE" });
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
}

export const fetchPlumbers = async () => {
    const dataFetch = await fetch(`${API}/plumbers`);
    const plumbers = await dataFetch.json();
    applicationState.plumbers = plumbers;
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}));
}

export const saveCompletion = (completion) => {
    fetch(`${API}/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    })
}

export const fetchCompletions = async () => {
    const dataFetch = await fetch(`${API}/completions`);
    const data = await dataFetch.json();
    applicationState.completions = data;
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}));
}