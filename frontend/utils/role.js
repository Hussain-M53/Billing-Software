import api from './api/axios'


//---------------------------------------------------checked------------------------------------------------------------
export const fetch_roles = async (token, id, query) => {

    try {
        const response = await api.get(`roles/all/paginated?user_id=${id}&token=${token}&size=${query?.size}&currentPage=${query?.activePage}&search=${query?.search}`);

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
            } else if (error.response.status === 422) {
                console.log(error.response.data.errors[0].msg)
                return {
                    status: error.response.status,
                    message: error.response.data.errors[0].msg
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


//---------------------------------------------------checked------------------------------------------------------------
export const fetch_role = async (token, id, id_to_fetch) => {

    try {
        const response = await api.get(`roles/${id_to_fetch}?user_id=${id}&token=${token}`);

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
            } else if (error.response.status === 422) {
                console.log(error.response.data.errors[0].msg)
                return {
                    status: error.response.status,
                    message: error.response.data.errors[0].msg
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


//---------------------------------------------------checked------------------------------------------------------------
export const create_role = async (token, id, query) => {

    try {
        const response = await api.post(`roles/?user_id=${id}`, {
            token: token,
            name: query.name,
            description: query.description,
            permissions: query.permissions,
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
            if (error.response.status === 403 || error.response.status === 401 || error.response.status === 409) {
                console.log(error.response.status, error.response.data.message)
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            } else if (error.response.status === 422) {
                console.log(error.response.data.errors[0].msg)
                return {
                    status: error.response.status,
                    message: error.response.data.errors[0].msg
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


//---------------------------------------------------checked------------------------------------------------------------
export const update_role = async (token, id, query) => {
    console.log(query)
    try {
        const response = await api.put(`roles/${query.id}?user_id=${id}`, {
            token: token,
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
            return {
                status: response.status,
                message: response.data,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 403: incorrect credentials
            if (error.response.status === 403 || error.response.status === 401 || error.response.status === 409) {
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            } else if (error.response.status === 422) {
                console.log(error.response.data.errors)
                return {
                    status: error.response.status,
                    message: error.response.data.errors
                }
            }

            // Other errors
            return {
                status: error.response.status,
                message: error.response.data.errors || 'An error occurred',
            }
        }
        // Network or other errors
        return {
            status: 500,
            message: 'Network Error or Server not responding'
        };
    }
}


//---------------------------------------------------checked------------------------------------------------------------
export const delete_role = async (token, id, id_to_delete) => {

    try {
        const response = await api.delete(`roles/${id_to_delete}?user_id=${id}&token=${token}`);
        // Status code 200: success
        if (response.status === 200) {
            return {
                status: response.status,
                message: response.data.message,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 403: incorrect credentials
            if (error.response.status === 403 || error.response.status === 401 || error.response.status === 409) {
                return {
                    status: error.response.status,
                    message: error.response.data.message
                }
            } else if (error.response.status === 422) {
                console.log(error.response.data.errors)
                return {
                    status: error.response.status,
                    message: error.response.data.errors
                }
            }

            // Other errors
            return {
                status: error.response.status,
                message: error.response.data.errors || 'An error occurred',
            }
        }
        // Network or other errors
        return {
            status: 500,
            message: 'Network Error or Server not responding'
        };
    }
}
