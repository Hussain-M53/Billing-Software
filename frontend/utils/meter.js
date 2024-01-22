import api from './api/axios'

export const fetch_meters = async (token, id, query) => {

    try {
        const response = await api.get(`meters/all/paginated?user_id=${id}&token=${token}&size=${query?.size}&currentPage=${query?.activePage}&search=${query?.search}`);

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

export const fetch_meter = async (token, user_id, meter_id) => {

    try {
        const response = await api.get(`meters/${meter_id}?user_id=${user_id}&token=${token}`);

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

export const fetch_meterTables = async (token, id) => {
    try {
        const response = await api.get(`history-config/meter/tables/enabled?user_id=${id}&token=${token}`);

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

export const fetch_floor = async (token, id) => {

    try {
        const response = await api.get(`floors/all/full?user_id=${id}&token=${token}`);

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

export const create_meter = async (token, id, meter) => {

    try {
        const response = await api.post(`meters/?user_id=${id}&token=${token}`,
            {
                name: meter.name,
                description: meter.description,
                status: meter.status,
                history_config_id: meter.meterTable,
            },
            {
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

export const update_meter = async (token, id, meter) => {


    try {
        const response = await api.put(`meters/${meter.id}?user_id=${id}&token=${token}`,
            {
                name: meter?.name,
                description: meter?.description,
                history_config_id: meter?.history_config_id,
                status: meter?.status,

            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        // Status code 200: success
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

export const delete_meter = async (token, id, id_to_delete) => {
    try {
        const response = await api.delete(`meters/${id_to_delete}?user_id=${id}&token=${token}`);

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

