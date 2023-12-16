import api from './api/axios'

export const fetch_unitAdjustment = async (token, id, query) => {

    try {
        const response = await api.get(`unitAdjustments/all/paginated?user_id=${id}&token=${token}&size=${query?.size}&currentPage=${query?.activePage}&search=${query?.search}`);

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

export const create_unitAdjustment = async (token, id, user) => {
    try {
        const response = await api.post(`meters/?user_id=${id}&token=${token}`,
            {
                username: user.username,
                name: user.name,
                email: user.email,
                password: user.password,
                confirm_password: user.confirm_password,
                role_id: user.status,
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

export const update_unitAdjustment = async (token, id, user) => {
    try {
        const response = await api.put(`meters/${user.id}?user_id=${id}&token=${token}`,
            {
                username: user.username,
                name: user.name,
                email: user.email,
                password: user.password,
                confirm_password: user.confirm_password,
                role_id: user.role_id,
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

export const delete_unitAdjustment = async (token, id, id_to_delete) => {
    try {
        const response = await api.delete(`meters/${id_to_delete}?user_id=${id}&token=${token}`);

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

