import api from './api/axios'



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

export const fetch_monthlyData = async (token, id, data) => {
    try {
        const response = await api.get(`charts/consumptionDaywise?user_id=${id}&token=${token}&startDate=${data.fromDate}&endDate=${data.toDate}&isMBTU=${true}&meter_ids=${[data.meter]}`);

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
