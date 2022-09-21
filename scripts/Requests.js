import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js";

// const displayAsComplete = () => {
//     const completions = getCompletions();
//     const requests = getRequests();
//     for (const request of requests) {
//         if (completions.find(completion => request.id === parseInt(completion.requestId))) {
//             console.log(request.description);
//         }
//     }
//     mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
// }

const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers();
    const completions = getCompletions();

    // checking if request has been completed. If completed, dropdown box does not render
    if (completions.find(completion => request.id === parseInt(completion.requestId))) {
        let requestComplete = `
            <li class="request complete">
                <span class="description">${request.description}</span>
                <span class="middleItem"><b>Complete</b></span>
                <button class="request_delete" id="request--${request.id}">Delete</button>
            </li>
            `
        return requestComplete;

    } else {
        let requestOpen = `
            <li class="request open noBullet">
                <span class="description">${request.description}</span>
                <select class="plumbers middleItem" id="plumbers">
                    <option value="">Choose</option>
                    ${
                        plumbers.map(
                            plumber => {
                                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                            }
                        ).join("")
                    }
                </select>
                <button class="request_delete" id="request--${request.id}">Delete</button>
            </li>
            `
        return requestOpen;
    }
}

export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul id="requestsList">
            <li class="requestListHeaders noBullet">
                <span id="listHeader1"><b>Description</b></span>
                <span id="listHeader2"><b>Completed By</b></span>
            </li>
            ${requests.map(convertRequestToListElement).join("")}
		</ul>
    `
    return html;
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", (e) => {
    if (e.target.id.startsWith("request--")) {
        const [,requestId] = e.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// SELECTING PLUMBER FROM DROPDOWN AND DISPLAYING AS COMPLETE
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers" && event.target.value !== "") {
            const [requestId, plumberId] = event.target.value.split("--");
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: 'date goes here'
            }
            saveCompletion(completion);
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        }
    }
)