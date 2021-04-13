new Vue({
   el: "#root",
   data: {
       query: "",
       isSearching: false,
       onFocus () {
           return {
               onfocus: this.isSearching
           }
       },
       queryResults: "",
       active: "movies",
       discoverFilms: "",
       topRatedFilms: "",
       trendingFilmsToday: "",
       discoverTV: "",
       topRatedTV: "",
       trendingTVToday: ""
   },
    methods: {
        search(refs) {
           if (!this.query) {
             this.isSearching = !this.isSearching;

             setTimeout(() => {
                 refs.searchbar.focus();
                },50);
           }
       },
        getSearchedFilms() {
           let uri = "https://api.themoviedb.org/3/search/multi?api_key=5809053c05dc9a515b67e3ed5d1ef360&query=" + this.query;

           if (this.query) {
               axios
                   .get(uri)
                   .then(response => {
                       this.queryResults = response.data.results;

                       console.log(this.queryResults);
                   });
           }
           else if (this.query === "") {
               this.queryResults = [];
           }
       },
        getTitle(result) {
           if (result.title) {
               return result.title;
           }
           else {
               return result.name;
           }
        },
        getType(type) {
           if (type === "tv") {
               return "TV Series";
           }
           else {
               return type;
           }
        },
        getLanguage(language) {
           if (language === "en") {
               return "gb";
           }
           else {
               return language;
           }
       },
        getRate(vote) {
            vote = parseInt(Math.round(vote/2));

            return vote;
        },
        getMovies() {
            let uri = 'https://api.themoviedb.org/3/discover/movie?api_key=5809053c05dc9a515b67e3ed5d1ef360';

            axios
                .get(uri)
                .then(response => {
                    this.discoverFilms = response.data.results;
                })

            uri = 'https://api.themoviedb.org/3/movie/top_rated?api_key=5809053c05dc9a515b67e3ed5d1ef360';

            axios
                .get(uri)
                .then(response => {
                    this.topRatedFilms = response.data.results;
                })

            uri = 'https://api.themoviedb.org/3/trending/movie/day?api_key=5809053c05dc9a515b67e3ed5d1ef360';

            axios
                .get(uri)
                .then(response => {
                    this.trendingFilmsToday = response.data.results;
                })
        },
        getTV() {
            let uri = 'https://api.themoviedb.org/3/discover/tv?api_key=5809053c05dc9a515b67e3ed5d1ef360';

            axios
                .get(uri)
                .then(response => {
                    this.discoverTV = response.data.results;
                })

            uri = 'https://api.themoviedb.org/3/tv/top_rated?api_key=5809053c05dc9a515b67e3ed5d1ef360';

            axios
                .get(uri)
                .then(response => {
                    this.topRatedTV = response.data.results;
                })

            uri = 'https://api.themoviedb.org/3/trending/tv/day?api_key=5809053c05dc9a515b67e3ed5d1ef360';

            axios
                .get(uri)
                .then(response => {
                    this.trendingTVToday = response.data.results;
                })
        }
    },
    created() {
       this.getMovies();
       this.getTV();
    }
});