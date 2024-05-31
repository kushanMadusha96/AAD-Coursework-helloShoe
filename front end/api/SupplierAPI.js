export const saveSupplier = async (newSupplier) => {
    console.log(newSupplier)
    try {
        const response = await fetch(`http://localhost:8080/helloShoe/api/supplier/save`, {
            method: 'POST', body: JSON.stringify(newSupplier), headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
          return 201
        }
    } catch (error) {
        return 500;
        //allert
    }
};
export const getAllSuppliers = async () => {
    try {
        const response = await fetch(`http://localhost:8080/helloShoe/api/supplier/getAll`);
        const allSuppliers = await response.json();
        console.log(allSuppliers)
        return allSuppliers;
    } catch (error) {
        // console.log(error.body)
        //allert
    }
}

export const updateSupplier = async (updatedSupplier, supplierCode) => {
    console.log(supplierCode)
    try {
        const response = await fetch(`http://localhost:8080/helloShoe/api/supplier/updateById/${supplierCode}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedSupplier),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
           return 200;
        }
    } catch (error) {
        console.log(error);
        //alert
    }
}

export const deleteSupplier = async (supplierCode) => {
    console.log(supplierCode)
    try {
        const response = await fetch(`http://localhost:8080/helloShoe/api/supplier/removeById/${supplierCode}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Add if required by the server
            },
        });
        if (response.status === 204) {
            return 204
        }
    } catch (error) {
        console.log(error);
        //alert
    }
}
