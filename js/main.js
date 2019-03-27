// Set the default receiver URL to the API server base URL.
axios.defaults.baseURL = 'http://127.0.0.1:9000/';

var searchBar = {
    prop: ['name_query', 'course_id', 'campus_id'],
    data: function() {
        return {
            nameQuery: '',
            courseID: this.course_id || 0,
            campusID: this.campus_id || 0,
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
    methods: {
        handleNameQuery: function(e) {
            this.$emit('input', this.nameQuery);
        },
        handleCourseID: function(e) {
            this.courseID = e.target.value;
        },
        handleCampusID: function(e) {
            this.campusID = e.target.value;
        }
    },
    template: `
        <form>
          <div id="search-field">
            <input type="text" id="search-box" placeholder="Type your name..." @input="handleNameQuery" v-model="nameQuery" />
            <button type="submit" id="search-button"><i class="fa fa-search"></i></button>
          </div>
            <div id="categories">
              <div id="courses-dropdown" class="category-type">
                <label>Courses</label>
              <select name="courses" @input="handleCourseID" v-model="courseID">
                <option :value="0">All Courses</option>
                <option v-for="course in courses" :value="course.id">{{ course.name }}</option>
              </select>
            </div>
            <div id="campuses-dropdown" class="category-type">
              <label>Campuses</label>
              <select name="campuses" @input="handleCampusID" v-model="campusID">
                <option :value="0">All Campuses</option>
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
