import api from './api/axios'

export const fetch_customer = async (token, id, customer_id) => {

    try {
        const response = await api.get(`customers/${customer_id}?user_id=${id}&token=${token}`);

        // Status code 200: success
        if (response.status === 200) {
            console.log(response.data)
            return {
                status: response.status,
                message: response.data,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 403: incorrect credentials
            if (error.response.status === 403 || error.response.status === 401) {
                console.log(error.response.status, error.response.data.message)
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            }

            // Other errors
            return {
                status: error.response.status,
                message: error.response.data.msg || 'An error occurred',
            }
        }
        // Network or other errors
        return {
            status: 500,
            message: 'Network Error or Server not responding'
        };
    }
}

export const fetch_customers = async (token, id, query) => {

    try {
        const response = await api.get(`customers/all/paginated?user_id=${id}&token=${token}&size=${query?.size}&currentPage=${query?.activePage}&search=${query?.search}`);

        // Status code 200: success
        if (response.status === 200) {
            console.log(response.data)
            return {
                status: response.status,
                message: response.data,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 403: incorrect credentials
            if (error.response.status === 403 || error.response.status === 401) {
                console.log(error.response.status, error.response.data.message)
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            }

            // Other errors
            return {
                status: error.response.status,
                message: error.response.data.msg || 'An error occurred',
            }
        }
        // Network or other errors
        return {
            status: 500,
            message: 'Network Error or Server not responding'
        };
    }
}

export const fetch_meter = async (token, id) => {
    try {
        const response = await api.get(`meters/tagging-meters/free?user_id=${id}&token=${token}`);

        if (response.status === 200) {
            console.log(response.data)
            return {
                status: response.status,
                message: response.data,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 403: incorrect credentials
            if (error.response.status === 403 || error.response.status === 401) {
                console.log(error.response.status, error.response.data.message)
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            }

            // Other errors
            return {
                status: error.response.status,
                message: error.response.data.msg || 'An error occurred',
            }
        }
        // Network or other errors
        return {
            status: 500,
            message: 'Network Error or Server not responding'
        };
    }
}

export const create_customer = async (token, id, customer) => {
    console.log(customer);
    try {
        const response = await api.post(`customers/?user_id=${id}&token=${token}`, {
            CName: customer.CName,
            Code: customer.Code,
            Email: customer.Email,
            contact_person  : customer.contact_person,
            address : customer.address,
            meterId : customer.meter.id,
            mobile : customer.mobile,
            status : customer.status,

        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // Status code 200: success
        if (response.status === 201) {
            console.log(response.data)
            return {
                status: response.status,
                message: response.data,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 403: incorrect credentials
            if (error.response.status === 403 || error.response.status === 401) {
                console.log(error.response.status, error.response.data.message)
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            }

            // Other errors
            return {
                status: error.response.status,
                message: error.response.data.msg || 'An error occurred',
            }
        }
        // Network or other errors
        return {
            status: 500,
            message: 'Network Error or Server not responding'
        };
    }
}

export const update_customer = async (token, id, customer) => {
    console.log(query)
    try {
        const response = await api.put(`customers/${customer.id}?user_id=${id}&token=${token}`, {
            name: query.name,
            description: query.description,
            permissions: query.permissions,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // Status code 201: success
        if (response.status === 201) {
            console.log(response.data)
            return {
                status: response.status,
                message: response.data,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 403: incorrect credentials
            if (error.response.status === 403 || error.response.status === 401) {
                console.log(error.response.status, error.response.data.message)
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            }

            // Other errors
            return {
                status: error.response.status,
                message: error.response.data.msg || 'An error occurred',
            }
        }
        // Network or other errors
        return {
            status: 500,
            message: 'Network Error or Server not responding'
        };
    }
}

export const delete_customer = async (token, id, id_to_delete) => {

    try {
        const response = await api.delete(`customers/${id_to_delete}?user_id=${id}&token=${token}`);
        // Status code 200: success
        if (response.status === 200) {
            console.log(response.data)
            return {
                status: response.status,
                message: response.data,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 403: incorrect credentials
            if (error.response.status === 403 || error.response.status === 401 || error.response.status === 409) {
                console.log(error.response.status, error.response.data.message)
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            }

            // Other errors
            return {
                status: error.response.status,
                message: error.response.data.msg || 'An error occurred',
            }
        }
        // Network or other errors
        return {
            status: 500,
            message: 'Network Error or Server not responding'
        };
    }
}


