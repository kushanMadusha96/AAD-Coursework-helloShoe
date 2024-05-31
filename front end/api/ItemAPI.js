export const saveItem = async (newItem) => {
    try {
        const response = await fetch(`http://localhost:8080/helloShoe/api/inv/save`, {
            method: 'POST', body: JSON.stringify(newItem), headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            console.log("saved");
            console.log(response.body)
        }
    } catch (error) {
        console.log(error.body)
        //allert
    }
};
export const getAllItems = async () => {
    try {
        const response = await fetch(`http://localhost:8080/helloShoe/api/inv/getAllItems`);
        const allEmployees = await response.json();
        console.log(allEmployees)
        return allEmployees;
    } catch (error) {
        // console.log(error.body)
        //allert
    }
}
export const updateItem = async (updatedItem, itemCode) => {
    console.log(itemCode)
    console.log(updatedItem)
    try {
        const response = await fetch(`http://localhost:8080/helloShoe/api/inv/updateById/${itemCode}`, {
            method: 'PATCH', body: JSON.stringify(updatedItem), headers: {
                'Content-type': 'application/json',
            },
        })
        if (response.status === 200) {
            console.log("updated")
        }

    } catch (error) {
        console.log(error.body)
        //alert
    }
}
export const deleteItem = async (itemCode) => {
    try {
        const response = await fetch(`http://localhost:8080/helloShoe/api/inv/removeById/${itemCode}`, {
            method: 'DELETE',
        });
        if (response.status === 204) {
            console.log("deleted :" + itemCode)
        }
    } catch (error) {
        console.log(error.body)
        //alert
    }
}
