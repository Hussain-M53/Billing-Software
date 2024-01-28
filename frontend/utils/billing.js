import api from './api/axios'

export const fetch_billings = async (token, id, query) => {

    try {
        const response = await api.get(`billings/all/paginated?user_id=${id}&token=${token}&size=${query?.size}&currentPage=${query?.activePage}&search=${query?.search}`);

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

export const fetch_billing = async (token, id, bill_id) => {

    try {
        const response = await api.get(`billings/${bill_id}?user_id=${id}&token=${token}`);

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

export const fetch_billingsByMonth = async (token, id, billing_id) => {

    try {
        const response = await api.get(`billings/${billing_id}?user_id=${id}&token=${token}`);

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

export const fetch_billingsByCustomer = async (token, id, billing_id, customer_id) => {

    try {
        const response = await api.get(`billings/billingWithHistory/${billing_id}?CID_web=${customer_id}&user_id=${id}&token=${token}`);

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

export const previewData = async (token, id, fromDate, toDate, bill_id) => {
    try {
        const response = await api.get(`billings/previewData?user_id=${id}&token=${token}&fromDate=${fromDate}&toDate=${toDate}&id=${bill_id}`, {
            fromDate,
            toDate
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

export const fetch_bill_template = async (token, id) => {
    try {
        const response = await api.get(`billings/getNewBillingMonthDetails?user_id=${id}&token=${token}&fromDate=${fromDate}&toDate=${toDate}`, {
            fromDate,
            toDate
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

export const fetch_billingDetails_template = async (token, id) => {
    try {
        const response = await api.get(`billings/getNewBillingDetails?user_id=${id}&token=${token}`);

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

export const exportPdf = async (token, id, customer_id, start_date, end_date) => {
    try {
        const response = await api.get(`meters/consumption-details/export-pdf?user_id=${id}&token=${token}&start_date=${start_date}&end_date=${end_date}&customer_id=${customer_id}`);

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

export const create_billing = async (token, id, data) => {
    try {
        const response = await api.post(`billings/?user_id=${id}&token=${token}`, {
            DocDate: data.DocDate,
            DocNo: data.DocNo,
            IssueDate: data.IssueDate,
            DueDate: data.DueDate,
            fromDate: data.fromDate,
            toDate: data.toDate,
            RatePerTonHour: data.RatePerTonHour,
            previewData: data.previewData,
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

export const update_billing = async (token, id, bill_id, data) => {

    try {
        const response = await api.put(`billings/${bill_id}?user_id=${id}&token=${token}`, {
            DocDate: data.DocDate,
            DocNo: data.DocNo,
            IssueDate: data.IssueDate,
            DueDate: data.DueDate,
            fromDate: data.fromDate,
            toDate: data.toDate,
            RatePerTonHour: data.RatePerTonHour,
            previewData: data.previewData,
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

export const delete_billing = async (token, id, bill_id) => {

    try {
        const response = await api.delete(`billings/${bill_id}?user_id=${id}&token=${token}`);

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

export const generate_pdf = async (token, id, bill_id, customer_id) => {

    try {
        const response = await api.get(`billings/export/bill?user_id=${id}&token=${token}&billing_id=${bill_id}&customer_id=${customer_id}`);

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