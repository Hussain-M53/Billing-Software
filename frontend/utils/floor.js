import api from './api/axios'

export const fetch_floor = async (token, id, query) => {

    try {
        const response = await api.get(`floors/all/paginated?user_id=${id}&token=${token}&size=${query?.size}&currentPage=${query?.activePage}&search=${query?.search}`);

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

export const create_floor = async (token, id, floor) => {
    try {
        const response = await api.post(`floors/?user_id=${id}&token=${token}`,
            {
                name: floor.name,
                description: floor.description,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        // Status code 201: success
        if (response.status === 201) {
            console.log(response)
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

export const update_floor = async (token, id, floor) => {
    try {
        const response = await api.put(`floors/${floor.id}?user_id=${id}&token=${token}`,
            {
                name: floor.name,
                description: floor.description,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        // Status code 200: success
        if (response.status === 200) {
            console.log(response)
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

export const delete_floor = async (token, id, id_to_delete) => {
    try {
        const response = await api.delete(`floors/${id_to_delete}?user_id=${id}&token=${token}`);

        // Status code 200: success
        if (response.status === 200) {
            console.log(response)
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
