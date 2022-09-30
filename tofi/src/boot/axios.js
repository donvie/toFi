import axios from 'axios'

export default async({ Vue }) => {
    Vue.prototype.$axios = axios
    Vue.prototype.$appLink = "http://store-1.us-east-1.elasticbeanstalk.com"
}