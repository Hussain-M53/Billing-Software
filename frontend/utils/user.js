import api from './api/axios'

export const authenticate_user = async (user) => {
    try {
        const response = await api.post('users/login', {
            username: user.username,
            password: user.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Status code 200: success
        if (response.status === 200) {
            return {
                status: response.status,
                message: response.data,
            }
        }
    } catch (error) {
        if (error.response) {
            // Status code 422: validation error
            if (error.response.status === 422) {
                const errorMsg = error.response.data.errors.map(err => err.msg).join(', ');
                console.log(errorMsg);
                return {
                    status: error.response.status,
                    message: errorMsg
                }
            }

            // Status code 403: incorrect credentials
            if (error.response.status === 403) {
                console.log(error.response.data.msg);
                return {
                    status: error.response.status,
                    message: error.response.data.msg
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

export const fetch_user = async (token, id, query) => {
    try {
        const response = await api.get(`users/?user_id=${id}&token=${token}&size=${query?.size}&currentPage=${query?.activePage}&search=${query?.search}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        // Status code 200: success
        if (response.status === 200) {
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

export const fetch_roles = async (token, id) => {
    try {
        const response = await api.get(`roles/all/full?user_id=${id}&token=${token}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        // Status code 200: success
        if (response.status === 200) {
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

export const create_user = async (token, id, user) => {
    try {
        const response = await api.post(`users/?user_id=${id}&token=${token}`,
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

export const update_user = async (token, id, user) => {
    try {
        const response = await api.put(`users/${user.id}?user_id=${id}&token=${token}`,
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

export const delete_user = async (token, id, id_to_delete) => {
    try {
        const response = await api.delete(`users/${id_to_delete}?user_id=${id}&token=${token}`);

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


