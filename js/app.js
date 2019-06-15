var state = {
  current: 0,
  questions: [
    {
      currentChoice: 0,
      text: "Who will you be watching the movie with?",
      choices: [
        {
          title: "My beloved Family",
          genre: 10751,
        },{
          title: "My love",
          genre: 10749,
        },{
          title: "My Besties",
          genre: 35,
        },{
          title: "Just mee",
          genre: 18,        
        },{
          title: "My Baby Pet",
          genre: 16,         
        }
      ],
    },
    {
      text: "Are you looking for the real deal or make believe?",
      choices: [
        {
          title: "Let's keep it real",
          genre: 10402,
        },{
          title: "Take me away from here",
          genre: 14,
        }
      ],
    },
    {
      text: "Do you like to be spooked?",
      choices: [
        {
          title: "I just want to be scared pantless",
          genre: 12,
        },{
          title: "I like thrills but not gore",
          genre: 18,
        },{
          title: "No, happy things for me, please, life is scary enough as it is",
          genre: 35,
        }
      ],
    },
    {
      text: "How do you feel about comedy?",
      choices: [
        {
          title: "If it's not funny, it's not worth watching",
          genre: 35,
        },{
          title: "Relationship centered movies are better",
          genre: 10749,
        },{
          title: "I prefer something more serious",
          genre: 18,
        },{
          title: "I avoid comedy",
          genre: 12,
        }
      ],
    },
     {
      text: "From the quotes below, which do you like the most?",
      choices: [
        {
          title: "",
          genre: 10749,
        },{
          title: "",
          genre: 10751,
        },{
          title: "",
          genre: 12,
        },{
          title: "",
          genre: 36,
        }
      ],
    },   
  ],
};

var categories = {
  genres: [
    {
      id: 28,
      name: "Action",
      score: 0,
    },{
      id: 12,
      name: "Adventure",
      score: 0,
    },{
      id: 16,
      name: "Animation",
      score: 0,
    },{
      id: 35,
      name: "Comedy",
      score: 0,
    },{
      id: 80,
      name: "Crime",
      score: 0,
    },{
      id: 99,
      name: "Documentary",
      score: 0,
    },{
      id: 18,
      name: "Drama",
      score: 0,
    },{
      id: 10751,
      name: "Family",
      score: 0,      
    },{
      id: 14,
      name: "Fantasy",
      score: 0,  
    },{
      id: 36,
      name: "History",
      score: 0,  
    },{
      id: 27,
      name: "Horror",
      score: 0,  
    },{
      id: 10402,
      name: "Music",
      score: 0,  
    },{
      id: 9648,
      name: "Mystery",
      score: 0,  
    },{
      id: 10749,
      name: "Romance",
      score: 0,  
    },{
      id: 878,
      name: "Science Fiction",
      score: 0, 
    },{
      id: 10770,
      name: "TV Movie",
      score: 0, 
    },{
      id: 53,
      name: "Thriller",
      score: 0, 
    },{
      id: 10752,
      name: "War",
      score: 0, 
    },{
      id: 37,
      name: "Western",
      score: 0, 
    }
  ],
};

function displayQuizQuestions(){
  $('.question').text(state.questions[state.current].text);
  $('.question-image').html('<img src="' + state.questions[state.current].image + '" alt="' + state.questions[state.current].imagealt + '">');
  $(".question-progress-img").attr("src", state.questions[state.current].progress);
  for (var i = 0; i < state.questions[state.current].choices.length; i++) {
    $(".choices").append('<li id="'+ state.questions[state.current].choices[i].genre +'">'+ state.questions[state.current].choices[i].title +'</li>');
  }
  state.current++;
}

function calculateGenreScores(){    
    $('.choices').on('click','li',function(){
      if($('.chosen').length===0){
        var genre = $(this).attr('id');
        $(this).addClass('chosen');
        for (var i = 0; i < categories.genres.length; i++) {
          if(categories.genres[i].id==genre){
            categories.genres[i].score++;
          }
        }
      }
    });
}

var genresToMatch = [];

function checkGenreScores(){
  for (var i = 0; i < categories.genres.length; i++){
    if (genresToMatch.indexOf(categories.genres[i].id) == -1 && genresToMatch.length < 2) {
      if (categories.genres[i].score >= 1) {
      genresToMatch.push(categories.genres[i].id);
      }
    }
  }
}

function emptyGenreScores(){
  genresToMatch.length = 0;
  for (var i = 0; i < categories.genres[i].score; i++){
        categories.genres[i].score = 0;
  }
}

function searchByGenre(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/movie/550?api_key=640a86b1b40357c8fb5959a3796f2af4" + genresToMatch.join("%2C%20") + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=41c96271c1abb0093a43f5f46968c3fc",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  $.ajax(settings).done(function (response) {
    displayMusicalsResults(response.results);
  });

}

function displayMusicalsResults(results){
  for (var i = 0; i < results.length; i++){
        $('.results-view').append( 
        '<a href="https://www.themoviedb.org/movie/' + results[i].id + '" class="result-link">' + 
        '<div class="result-item" style="background-image: url(\'https://image.tmdb.org/t/p/w342'  + results[i].poster_path + '\')"><p>LEARN MORE</p></div></a>' );
  }
}

userGenre = [];

function userGenreSearchList(){
    $('.genre-buttons').on('click','button',function(){
      userGenre = [];
      userGenre[0] = $(this).attr('id');
      searchByUserGenre();
    });
  
}

function searchByUserGenre(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/movie/550?api_key=640a86b1b40357c8fb5959a3796f2af4" + userGenre[0] + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=640a86b1b40357c8fb5959a3796f2af4",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  $.ajax(settings).done(function (response) {
    displayUserGenreSearchResults(response.results);
  });

}

function displayUserGenreSearchResults(results){
    $('.additional-results-items').html('');
     for (var i = 0; i < results.length; i++){
          $('.additional-results-items').append( 
          '<a href="https://www.themoviedb.org/movie/' + results[i].id + '" class="result-link">' + 
          '<div class="result-item" style="background-image: url(\'https://image.tmdb.org/t/p/w342'  + results[i].poster_path + '\')"><p>LEARN MORE</p></div></a>' );
    }
  } 

$(document).ready(function() {
    $('.question-display, .question-progress, .question-image, .results, .additional-results, .finish').hide();

    $('.start').click(function(event) { 
      event.preventDefault();
      $('.home-text-display, .header-img, .home-image').hide();
      $('.question-display, .question-progress, .question-image, .next').show();
      displayQuizQuestions();
      calculateGenreScores();
    });

    $('.next').click(function(event){
      if ((state.current) != state.questions.length) {
        $('.choices').html('');
        displayQuizQuestions();
        checkGenreScores();
      } else {
        $('.next').hide();
        $('.finish').show();
        searchByGenre();
      }
    });


    $('.finish').click(function(event){
      $('.question-display, .question-progress, .question-image').hide();
      $('.header-img, .results').show();
        });

    $('.restart').click(function(event){
      state.current = 0;
      userGenre.length = 0;
      emptyGenreScores();
      $('.results-view').html('');
      $('.additional-results-items').html('');
      $('.choices').html('');
      $('.results, .additional-results, .finish').hide();
      $('.home-text-display, .header-img, .home-image, .next').show();
    });

    $('.search').click(function(event) {
      $('.results').hide();
      $('.additional-results').show();
    });

    $('.genre').click(function(event){
      userGenreSearchList();
    });

});






