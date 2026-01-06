async function getUserData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        if (!response.ok) {
            console.log("User not found!");
        }
        const data = await response.json();

        console.log("User data: ", data);
    } catch (error) {
        console.log("Error fetching data!");
    }
}

getUserData();