/* eslint-env jquery */
/* eslint-env browser */

const createItemElement = function(listing) {

  const $listing = $(`
  <article class="listing">
    <header class="listingTop">
    <div class = "logo-name">
    <img class = 'profileIcon' src=${listing.user.avatars}>
    <div>${listing.user.name}</div>
    </div>
    <div>${listing.user.handle}</div>
    </header>
<<<<<<< HEAD

    <p>${escape(listing.content.text)}</p>

=======
    <p>${escape(listing.content.text)}</p>
>>>>>>> item-feature
    <footer class = "tweetBottom">
    <div>${timeago.format(listing.created_at)}</div>
    <div class = 'icons'>
    <i id = 'flagContainer' class="fa-solid fa-flag"></i>
    <i id = 'retweetContainer' class="fa-solid fa-retweet"></i>
    <i id = 'heartContainer' class="fa-solid fa-heart"></i>
    </div>
    </footer>
  </article>`);
  return $listing;

};

const renderTweets = function(tweets) {

  let allTweet;
  tweets.reverse();
  for (const objs of tweets) {
    allTweet = $(".tweetBody").append(createItemElement(objs));
  }

  return allTweet;
};


const loadItems =  function() {
  $.ajax('/items', { method: 'GET' })
    .then(function(tweets) {
      return renderTweets(tweets);
    });
};

loadItems();

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
