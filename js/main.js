// Set the default receiver URL to the API server base URL.
axios.defaults.baseURL = 'http://127.0.0.1:9000/';

var searchBar = {
    data: function() {
        return {
            courses: [],
            campuses: []
        };
    },
    beforeCreate: function() {
        var searchBar = this;
        
        axios.request({
            url: '/graphql',
            method: 'post',
            data: {
                'query': '{courses{id, name}}'
            }
        })
        .then(function(response) {
            searchBar.courses = response.data.data.courses;
        });

        axios.request({
            url: '/graphql',
            method: 'post',
            data: {
                'query': '{campuses{id, name}}'
            }
        })
        .then(function(response) {
            searchBar.campuses = response.data.data.campuses;
        });
    },
    template: `
        <form>
          <div id="search-field">
            <input type="text" id="search-box" placeholder="Type your name..." />
            <button type="submit" id="search-button"><i class="fa fa-search"></i></button>
          </div>
            <div id="categories">
              <div id="courses-dropdown" class="category-type">
                <label>Courses</label>
              <select name="courses">
                <option value="0">All Courses</option>
                <option v-for="course in courses" :value="course.id">{{ course.name }}</option>
              </select>
            </div>
            <div id="campuses-dropdown" class="category-type">
              <label>Campuses</label>
              <select name="campuses">
                <option value="0">All Campuses</option>
                <option v-for="campus in campuses" :value="campus.id">{{ campus.name }}</option>
              </select>
            </div>
          </div>
        </form>
    `
}

var app = new Vue({
    el: 'article#app',
    components: {
        'search-bar': searchBar
    }
});
