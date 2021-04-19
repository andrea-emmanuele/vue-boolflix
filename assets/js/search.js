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
       trendingTVToday: "",
       lastSlider: "",
       left: 0,
       step: 0
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
            vote = Math.ceil(vote/2);

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
        },
        changeView(active) {
            this.active = active;
            this.lastSlider = "";
            this.left = 0;
            this.step = 0;

            let sliders = document.querySelectorAll(".slider");
            let controllersSx = document.querySelectorAll(".control-sx");
            let controllersDx = document.querySelectorAll(".control-dx");

            sliders.forEach(slider => {
                slider.style.left = 0;
                slider.id = "";
            });

            controllersSx.forEach(controller => {
                controller.style.display = "none";
            });

            controllersDx.forEach(controller => {
                controller.style.display = "flex";
            });
        },
        scrollBack(id, event) {
            let ctrlSx = event.target;
            let ctrlDx = event.target.nextElementSibling;
            let slider = event.target.parentElement.firstElementChild;

            this.checkSlider(id, slider);

            if (this.step > 0) {
                this.left += 100;
                this.step--;
                slider.style.left = `${this.left}%`;
            }

            if (this.step < 3)
                ctrlDx.style.display = "flex";

            if (this.step === 0)
                ctrlSx.style.display = "none";

            slider.id = `${this.left} ${this.step}`;
            console.log(slider.id);
        },
        scrollForward(id, event) {
            let ctrlSx = event.target.previousElementSibling;
            let ctrlDx = event.target;
            let slider = event.target.parentElement.firstElementChild;

            this.checkSlider(id, slider);

            if (this.step < 3) {
                this.step++;
                this.left += -100;
                slider.style.left = `${this.left}%`;
            }

            if (this.step === 3)
                ctrlDx.style.display = "none";

            if (this.step > 0)
                ctrlSx.style.display = "flex";

            slider.id = `${this.left} ${this.step}`;
        },
        checkSlider(id, slider) {
            if (!this.lastSlider) {
                this.lastSlider = id;
            }
            else if (this.lastSlider !== id) {
                this.lastSlider = id;

                if (!slider.id) {
                    this.left = 0;
                    this.step = 0;
                }
                else {
                    let steps = slider.id.split(" ");
                    this.left = parseInt(steps[0]);
                    this.step = parseInt(steps[1]);
                }
            }
        }
    },
    created() {
       this.getMovies();
       this.getTV();
    }
});