

const backendUrl = `http://localhost:1000`



const summaryAPI = {

   register: {
    url: `${backendUrl}/api/v1/register`,
   },

    login: {
    url: `${backendUrl}/api/v1/login`,
   },

   forget: {
    url: `${backendUrl}/api/v1/forget_password`,
   },

   reset: {
    url: `${backendUrl}/api/v1/reset_password`,
   },
}

export { summaryAPI} 