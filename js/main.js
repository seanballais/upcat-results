// Set the default receiver URL to the API server base URL.
axios.defaults.baseURL = 'http://127.0.0.1:9000/';

var app = new Vue({
    el: 'article#app',
    data: {
        courses: [],
        campuses: []
    },
    created: function() {
        var vm = this;
        
        axios.request({
            url: '/graphql',
            method: 'post',
            data: {
                'query': '{courses{id, name}}'
            }
        })
        .then(function(response) {
            vm.courses = response.data.data.courses;
        });

        axios.request({
            url: '/graphql',
            method: 'post',
            data: {
                'query': '{campuses{id, name}}'
            }
        })
        .then(function(response) {
            vm.campuses = response.data.data.campuses;
        });
    }
});
