const tweetInput = document.getElementById('tweetInput');
const postTweet = document.getElementById('postTweet');
const postContainer = document.getElementById('postContainer');  

postTweet.addEventListener('click', addTweet);
postContainer.addEventListener('click', handleTweetActions);

function addTweet() {
    const tweetText = tweetInput.value.trim();
    if (tweetText === '') return;

    const tweet = {
        id: Date.now(),
        text: tweetText,
        likes: 0,
    }

    saveTweet(tweet); 
    renderTweet(tweet);
    tweetInput.value = '';
}


function renderTweet(tweet) {
    const tweetE = `
    <div class="tweet" data-id="${tweet.id}">
        <p>${tweet.text}</p>
        <div class="tweet-actions">
            <span class="like">Like (${tweet.likes})</span>
            <span class="delete">Delete</span>
        </div>
    </div>
    `;
    postContainer.insertAdjacentHTML('beforeend', tweetE);
}

function saveTweet(tweet) {
    const tweets = getstoredTweets();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getstoredTweets() {
    const tweets = localStorage.getItem('tweets');
    return tweets ? JSON.parse(tweets) : [];
}

function handleTweetActions(event) {
    const target = event.target;
    const tweetE = target.closest('.tweet');
    const id =  parseInt(tweetE.dataset.id);

    if (target.classList.contains('like')) {
        updateLikes(id);
    } else if (target.classList.contains('delete')) {
        deleteTweet(id);
        tweetE.remove();
    }
}

function updateLikes(id) {
    const tweets = getstoredTweets();
    const tweetIndex = tweets.findIndex(tweet => tweet.id === id);
    tweets[tweetIndex].likes += 1;

    const likeElemet = document.querySelector(`[data-id="${id}"] .like`);
    likeElemet.textContent = `Like (${tweets[tweetIndex].likes})`;

    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function deleteTweet(id) {
    let tweets = getstoredTweets();
    tweets = tweets.filter(tweet => tweet.id !== id);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function LoadTweets() {
    const tweets = getstoredTweets();
    for (const tweet of tweets) {
        renderTweet(tweet);
    }
}
