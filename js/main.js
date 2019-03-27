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
      <section id="search">
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
      </section>
    `
}

var searchPaginator = {
    data: function() {
        return {
            currPageNumber: 1,
            numPages: 2
        }
    },
    computed: {
        shouldEnablePreviousBtn: function() {
            return this.currPageNumber > 1;
        },
        shouldEnableNextBtn: function() {
            return this.currPageNumber < this.numPages;
        },
        shouldDisplayBtn: function() {
            return this.numPages > 1;
        }
    },
    methods: {
        incrementCurrPageNumber: function() {
            this.currPageNumber = Math.max(++this.currPageNumber, this.numPages);
        },
        decrementCurrPageNumber: function() {
            this.currPageNumber = Math.min(--this.currPageNumber, 1);
        }
    },
    template: `
        <section id="paginator" v-if="numPages > 0">
          <button id="previous-btn" :disabled="!shouldEnablePreviousBtn" v-if="shouldDisplayBtn" v-on:click="decrementCurrPageNumber">
            <i class="fas fa-caret-left"></i> Previous
          </button>
          <span id="paginator-btn-separator"></span>
          <button id="next-btn" :disabled="!shouldEnableNextBtn" v-if="shouldDisplayBtn" v-on:click="incrementCurrPageNumber">
            <i class="fas fa-caret-right"></i> Next
          </button>
        </section>
    `
}

var app = new Vue({
    el: 'article#app',
    components: {
        'search-bar': searchBar,
        'search-paginator': searchPaginator
    }
});
